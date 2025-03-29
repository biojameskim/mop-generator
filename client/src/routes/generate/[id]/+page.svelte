<script lang="ts">
    import type { PageData } from './$types';
    import TemplateInterface from '$lib/components/TemplateInterface.svelte';
    
    export let data: PageData;
  
  </script>
  
  <svelte:head>
    <title>Generate MOP: {data.template.name} | MOP Generator</title>
  </svelte:head>
  
  <div class="container">
    <div class="back-link">
      <a href="/generate">← Back to Template Selection</a>
    </div>
    
    <TemplateInterface
      templateId={data.template.id}
    />
  </div>
  
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .back-link {
      margin: 2rem 0;
    }
    
    .back-link a {
      color: #2c3e50;
      text-decoration: none;
      font-weight: 500;
    }
    
    .back-link a:hover {
      text-decoration: underline;
    }
  </style>