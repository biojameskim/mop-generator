<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    let selectedType: string = '';
    let filteredMops = data.mops;
    
    function filterByType() {
      if (selectedType) {
        filteredMops = data.mops.filter(mop => mop.type === selectedType);
      } else {
        filteredMops = data.mops;
      }
    }
    
    function formatDate(dateString: string): string {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return dateString;
        }
        }
  </script>
  
  <svelte:head>
    <title>MOP Generator</title>
  </svelte:head>
  
  <div class="container">
    <header>
      <h1>Method of Procedure (MOP) Generator</h1>
      <p>A system for generating and managing data center operation procedures</p>
    </header>
    
    <main>
      <section class="filter-section">
        <div class="section-header">
          <h2>Available MOPs</h2>
            <div>
                <a href="/generate" class="btn">Generate New MOP</a>
                <a href="/new" class="btn">Create New MOP</a>
            </div>
        </div>
        
        <div class="filter-controls">
          <label for="type-filter">Filter by Type:</label>
          <select id="type-filter" bind:value={selectedType} on:change={filterByType}>
            <option value="">All Types</option>
            {#each data.types as type}
              <option value={type}>{type}</option>
            {/each}
          </select>
        </div>
      </section>
      
      <section class="mop-list-section">
        {#if filteredMops.length === 0}
          <p class="no-mops">No MOPs found matching the selected criteria.</p>
        {:else}
          <table class="mop-list">
            <thead>
              <tr>
                <th>MOP Title</th>
                <th>Type</th>
                <th>Risk Level</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredMops as mop}
                <tr>
                  <td>{mop.info.title}</td>
                  <td><span class="tag">{mop.type}</span></td>
                  <td>
                    <span class="risk-level risk-{mop.info.riskLevel.toLowerCase()}">
                      {mop.info.riskLevel}
                    </span>
                  </td>
                  <td>{formatDate(mop.updatedAt)}</td>
                  <td class="actions">
                    <a href="/{mop.id}" class="btn btn-sm">View</a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
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
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .filter-section {
      margin-bottom: 2rem;
    }
    
    .filter-controls {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .mop-list {
      width: 100%;
      border-collapse: collapse;
    }
    
    .mop-list th, .mop-list td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e1e1e1;
    }
    
    .mop-list th {
      background-color: #f2f2f2;
    }
    
    .btn {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #2c3e50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      border: none;
      cursor: pointer;
    }
    
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
    }
    
    .btn:hover {
      background-color: #1a252f;
    }
    
    .tag {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      background-color: #e9ecef;
      border-radius: 4px;
      font-size: 0.875rem;
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
    
    .actions {
      white-space: nowrap;
    }
    
    .no-mops {
      text-align: center;
      padding: 2rem;
      background-color: #f8f9fa;
      border-radius: 4px;
    }
  </style>