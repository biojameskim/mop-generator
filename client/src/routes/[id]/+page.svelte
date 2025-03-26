<script lang="ts">
    import type { PageData } from './$types';
    import MopViewer from '$lib/components/MopViewer.svelte';
    
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>{data.mop.info.title} | MOP Generator</title>
  </svelte:head>
  
  <div class="container">
    <div class="back-link">
      <a href="/">← Back to MOP List</a>
    </div>
    
    <MopViewer mop={data.mop} />
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
      display: inline-flex;
      align-items: center;
    }
    
    .back-link a:hover {
      text-decoration: underline;
    }
  </style>