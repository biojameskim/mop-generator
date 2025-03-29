<script lang="ts">
    import { onMount } from 'svelte';
    import type { MopTemplate } from '$lib/models/template.model';
    import * as templateService from '$lib/services/template.service';
    
    let templates: MopTemplate[] = [];
    let types: string[] = [];
    let selectedType: string = '';
    let loading: boolean = true;
    let error: string | null = null;
    
    onMount(async () => {
      try {
        [templates, types] = await Promise.all([
          templateService.getAllTemplates(),
          templateService.getTemplateTypes()
        ]);
        
        loading = false;
      } catch (err) {
        error = err instanceof Error ? err.message : 'Failed to load templates';
        loading = false;
      }
    });
    
    function filterByType() {
      if (selectedType) {
        templates = templates.filter(template => template.type === selectedType);
      } else {
        templateService.getAllTemplates().then(data => {
          templates = data;
        });
      }
    }
  </script>
  
  <svelte:head>
    <title>Generate MOP | MOP Generator</title>
  </svelte:head>
  
  <div class="container">
    <header>
      <h1>Generate a New MOP</h1>
      <p>Select a template to begin the MOP generation process</p>
    </header>
  
    <main>
      <section class="filter-section">
        <div class="filter-controls">
          <label for="type-filter">Filter by Type:</label>
          <select id="type-filter" bind:value={selectedType} on:change={filterByType}>
            <option value="">All Types</option>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
      </section>
  
      <section class="template-list-section">
        {#if loading}
          <p>Loading templates...</p>
        {:else if error}
          <p class="error">{error}</p>
        {:else if templates.length === 0}
          <p>No templates found.</p>
        {:else}
          <div class="template-grid">
            {#each templates as template}
              <div class="template-card">
                <div class="card-header">
                  <h3>{template.name}</h3>
                  <span class="tag">{template.type}</span>
                </div>
                <p>{template.description}</p>
                <div class="card-details">
                  <div class="detail-item">
                    <span class="detail-label">Risk Level:</span>
                    <span class="risk-level risk-{template.defaultRiskLevel.toLowerCase()}">{template.defaultRiskLevel}</span>
                  </div>
                  <div class="detail-item">
                    <span class="detail-label">Steps:</span>
                    <span>{template.sections.baseSteps.length}</span>
                  </div>
                </div>
                <div class="card-actions">
                  <a href="/generate/{template.id}" class="btn">Use Template</a>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    </main>
  </div>
  
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    header {
      margin: 2rem 0;
      border-bottom: 2px solid #333;
      padding-bottom: 1rem;
    }
    
    h1 {
      margin: 0;
      color: #2c3e50;
    }
    
    .filter-section {
      margin-bottom: 2rem;
    }
    
    .filter-controls {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .template-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .template-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .card-header h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    
    .tag {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background-color: #e9ecef;
      border-radius: 4px;
      font-size: 0.875rem;
    }
    
    .card-details {
      margin-top: auto;
      padding-top: 1rem;
    }
    
    .detail-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    
    .detail-label {
      font-weight: 500;
    }
    
    .risk-level {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: bold;
      font-size: 0.875rem;
    }
    
    .risk-low {
      background-color: #d4edda;
      color: #155724;
    }
    
    .risk-medium {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .risk-high {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .card-actions {
      margin-top: 1rem;
      display: flex;
      justify-content: flex-end;
    }
    
    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #2c3e50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .error {
      color: #e74c3c;
    }
  </style>