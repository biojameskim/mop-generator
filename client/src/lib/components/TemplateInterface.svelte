<script lang="ts">
    import { onMount } from 'svelte';
    import type { MopTemplate } from '$lib/models/template.model';
    import type { MopModel } from '$lib/models/mop.model';
    import FormSection from './FormSection.svelte';
    import MopViewer from './MopViewer.svelte';
    import * as templateService from '$lib/services/template.service';
    
    export let templateId: string;
    
    let template: MopTemplate | null = null;
    let formData: Record<string, any> = {};
    let currentStep = 0;
    let sections: string[] = [];
    let loading = true;
    let error: string | null = null;
    let previewMop: MopModel | null = null;
    let generating = false;
    
    onMount(async () => {
      try {
        template = await templateService.getTemplateById(templateId);
        
        // Initialize form data
        formData = template.formFields.reduce((data, field) => {
          data[field.id] = field.type === 'checkbox' ? false : '';
          return data;
        }, {} as Record<string, any>);
        
        // Extract unique sections from form fields (and convert back to array)
        sections = [...new Set(template.formFields.map(field => field.section))];
        
        loading = false;
      } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to load template';
        loading = false;
      }
    });
    
    async function generateMop() {
      if (!template) return;
      
      try {
        generating = true;
        const mop = await templateService.generateMop(template.id, formData);
        previewMop = mop;
        generating = false;
      } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to generate MOP';
        generating = false;
      }
    }
    
    function previousStep() {
      if (currentStep > 0) {
        currentStep--;
      }
    }
    
    function nextStep() {
      if (currentStep < sections.length) {
        currentStep++;
        
        // Generate preview when reaching the final step
        if (currentStep === sections.length) {
          generateMop();
        }
      }
    }
    
    function saveMop() {
      throw new Error("I'll implement this later");
    }
    
    $: fieldsForCurrentSection = template?.formFields.filter(
      field => field.section === sections[currentStep]
    ) || [];
    
    $: isFirstStep = currentStep === 0;
    $: isLastStep = currentStep === sections.length - 1;
    $: isPreviewStep = currentStep === sections.length;
    $: canGoNext = !isPreviewStep && (!fieldsForCurrentSection.some(
      field => field.required && (formData[field.id] === '' || formData[field.id] === undefined)
    ) || isPreviewStep);
  </script>
  
  <div class="template-interface">
    {#if loading}
      <div class="loading">Loading template...</div>
    {:else if error}
      <div class="error">{error}</div>
    {:else if template}
      <div class="temp-interface-header">
        <h2>{template.name}</h2>
        <p>{template.description}</p>
      </div>
      
      <div class="temp-interface-progress">
        {#each sections as section, index}
          <button
            class="progress-step {currentStep === index ? 'active' : ''} {currentStep > index ? 'completed' : ''}"
            on:click={() => currentStep = index}
          >
            {index + 1}. {section}
          </button>
        {/each}
        <button
          class="progress-step {isPreviewStep ? 'active' : ''}"
          on:click={() => currentStep = sections.length}
        >
          {sections.length + 1}. Preview
        </button>
      </div>
      
      <div class="temp-interface-content">
        {#if !isPreviewStep}
          <FormSection 
            section={sections[currentStep]}
            fields={fieldsForCurrentSection}
            bind:formData={formData}
          />
        {:else}
          <div class="preview-section">
            <h3>MOP Preview</h3>
            
            {#if generating}
              <div class="loading">Generating MOP preview...</div>
            {:else if previewMop}
              <div class="preview-container">
                <MopViewer mop={previewMop} />
              </div>
            {/if}
          </div>
        {/if}
      </div>
      
      <div class="temp-interface-actions">
        <button 
          class="btn btn-secondary" 
          on:click={previousStep}
          disabled={isFirstStep}
        >
          Previous
        </button>
        
        {#if !isPreviewStep}
          <button 
            class="btn btn-primary" 
            on:click={nextStep}
            disabled={!canGoNext}
          >
            Next
          </button>
        {:else}
          <button 
            class="btn btn-success" 
            on:click={saveMop}
            disabled={!previewMop}
          >
          <!-- The problem is that this doesn't work right now.. I'll have to implement this later -->
            Save MOP
          </button>
        {/if}
      </div>
    {/if}
  </div>
  
  <style>
    .template-interface {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
    
    .temp-interface-header {
      margin-bottom: 2rem;
    }
    
    .temp-interface-progress {
      display: flex;
      margin-bottom: 2rem;
      border-bottom: 1px solid #ddd;
      overflow-x: auto;
    }
    
    .progress-step {
      padding: 1rem;
      cursor: pointer;
      white-space: nowrap;
      background: none;
      border: none;
      font-size: inherit;
      font-family: inherit;
    }
    
    .progress-step.active {
      font-weight: bold;
      border-bottom: 3px solid #2c3e50;
    }
    
    .progress-step.completed {
      color: #27ae60;
    }
    
    .temp-interface-content {
      margin-bottom: 2rem;
    }
    
    .temp-interface-actions {
      display: flex;
      justify-content: space-between;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
    }
    
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background-color: #2c3e50;
      color: white;
    }
    
    .btn-secondary {
      background-color: #95a5a6;
      color: white;
    }
    
    .btn-success {
      background-color: #27ae60;
      color: white;
    }
    
    .loading {
      text-align: center;
      padding: 2rem;
    }
    
    .error {
      color: #e74c3c;
      padding: 1rem;
      border: 1px solid #e74c3c;
      border-radius: 4px;
    }
    
    .preview-container {
      margin-top: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 1rem;
    }
  </style>