<script lang="ts">
    import type { MopTemplateField } from '$lib/models/template.model';
    import FormField from './FormField.svelte';
    
    export let section: string;
    export let fields: MopTemplateField[];
    export let formData: Record<string, any>;
  </script>
  
  <div class="form-section">
    <h3>{section}</h3>
    
    <div class="fields">
      {#each fields as field}
        <FormField
          {field}
          bind:value={formData[field.id]}
        />
      {/each}
    </div>
  </div>
  
  <style>
    .form-section {
      margin-bottom: 2rem;
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    
    .fields {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    @media (min-width: 768px) {
      .fields {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  </style>