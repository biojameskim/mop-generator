<script lang="ts">
    import type { MopTemplateField } from '$lib/models/template.model';
    
    export let field: MopTemplateField;
    export let value: any = field.type === 'checkbox' ? false : '';
    
    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      
      if (field.type === 'checkbox') {
        value = (target as HTMLInputElement).checked;
      } else {
        value = target.value;
      }
    }
  </script>
  
  <div class="form-field">
    <label for={field.id}>
      {field.label}
      {#if field.required}<span class="required">*</span>{/if}
    </label>
    
    {#if field.type === 'text' || field.type === 'number'}
      <input
        type={field.type}
        id={field.id}
        value={value}
        on:input={handleInput}
        required={field.required}
      />
    {:else if field.type === 'textarea'}
      <textarea
        id={field.id}
        value={value}
        on:input={handleInput}
        required={field.required}
      ></textarea>
    {:else if field.type === 'select'}
      <select
        id={field.id}
        value={value}
        on:change={handleInput}
        required={field.required}
      >
        <option value="" disabled selected>Select an option</option>
        {#each field.options || [] as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
    {:else if field.type === 'checkbox'}
      <div class="checkbox-wrapper">
        <input
          type="checkbox"
          id={field.id}
          checked={value}
          on:change={handleInput}
        />
        <span class="checkbox-label">{field.label}</span>
      </div>
    {/if}
    
    {#if field.helpText}
      <div class="help-text">{field.helpText}</div>
    {/if}
  </div>
  
  <style>
    .form-field {
      margin-bottom: 1rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    input[type="text"],
    input[type="number"],
    textarea,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1rem;
    }
    
    textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .checkbox-wrapper {
      display: flex;
      align-items: center;
    }
    
    .checkbox-label {
      margin-left: 0.5rem;
    }
    
    .required {
      color: #e74c3c;
      margin-left: 0.25rem;
    }
    
    .help-text {
      font-size: 0.875rem;
      color: #666;
      margin-top: 0.25rem;
    }
  </style>