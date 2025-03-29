<!-- MOPViewer is viewing the actual MOP -->


<script lang="ts">
    import type { MopModel } from '$lib/models/mop.model';
    import MopSection from './MopSection.svelte';
  
    export let mop: MopModel;
  
    function printMop() {
      window.print();
    }
  
    function formatDate(dateString: string): string {
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return dateString;
        }
    }
  </script>
  
  <div class="mop-viewer">
    <div class="mop-header">
      <h1>{mop.info.title}</h1>
      <div class="mop-actions">
        <button class="btn" on:click={printMop}>Print MOP</button>
      </div>
    </div>
  
    <!-- MOP Information Section -->
    <MopSection title="MOP Information">
      <table>
        <tbody>
            <tr>
            <td>Document Number:</td>
            <td>{mop.info.documentNumber || 'N/A'}</td>
            </tr>
            <tr>
            <td>Work Order:</td>
            <td>{mop.info.workOrderNumber || 'N/A'}</td>
            </tr>
            <tr>
            <td>Risk Level:</td>
            <td><span class="risk-level risk-{mop.info.riskLevel.toLowerCase()}">{mop.info.riskLevel}</span></td>
            </tr>
            <tr>
            <td>Created:</td>
            <td>{formatDate(mop.createdAt)}</td>
            </tr>
            <tr>
            <td>Last Updated:</td>
            <td>{formatDate(mop.updatedAt)}</td>
            </tr>
            <tr>
            <td>Author:</td>
            <td>{mop.info.author?.name || 'N/A'}</td>
            </tr>
        </tbody>
      </table>
    </MopSection>
  
    <!-- MOP Instructions Section -->
    <MopSection title="MOP Instructions">
      <ul>
        {#each mop.instructions as instruction}
          <li>{instruction}</li>
        {/each}
      </ul>
    </MopSection>
  
    <!-- Effect of MOP on Critical Facility -->
    <MopSection title="Effect of MOP on Critical Facility">
      <table>
        <thead>
          <tr>
            <th>Facility Equipment or System</th>
            <th>Affected</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {#each mop.effects as effect}
            <tr>
              <td>{effect.system}</td>
              <td>{effect.affected ? 'Yes' : 'No'}</td>
              <td>{effect.details || ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </MopSection>
  
    <!-- MOP Required Tools and Equipment -->
    <MopSection title="MOP Required Tools and Equipment">
      <ol>
        {#each mop.tools as tool}
          <li>{tool.name}</li>
        {/each}
      </ol>
    </MopSection>
  
    <!-- Safety Requirements -->
    <MopSection title="Safety Requirements">
      <ol>
        {#each mop.safetyRequirements as req}
          <li>{req.description}</li>
        {/each}
      </ol>
    </MopSection>
  
    <!-- MOP Risks & Assumptions -->
    <MopSection title="MOP Risks & Assumptions">
      <h4>Risks:</h4>
      <ol>
        {#each mop.risks as risk}
          <li>{risk.description}</li>
        {/each}
      </ol>
      
      <h4>Assumptions:</h4>
      <ol>
        {#each mop.assumptions as assumption}
          <li>{assumption.description}</li>
        {/each}
      </ol>
    </MopSection>
  
    <!-- MOP Details -->
    <MopSection title="Detailed Procedure">
      <table class="steps-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Description</th>
            <th>Initial</th>
          </tr>
        </thead>
        <tbody>
          {#each mop.steps as step}
            <tr class={step.critical ? 'critical-step' : ''}>
              <td>{step.number}</td>
              <td>
                {step.description}
                {#if step.critical}<span class="badge critical">CRITICAL</span>{/if}
                {#if step.requiresWitness}<span class="badge witness">WITNESS REQUIRED</span>{/if}
                {#if step.requiresTimestamp}<span class="badge timestamp">TIMESTAMP REQUIRED</span>{/if}
              </td>
              <td class="initial-col"></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </MopSection>
  
    <!-- Back-out Procedures -->
    <MopSection title="Back-out Procedures">
      <table class="steps-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Description</th>
            <th>Initial</th>
          </tr>
        </thead>
        <tbody>
          {#each mop.backoutSteps as step}
            <tr>
              <td>{step.number}</td>
              <td>{step.description}</td>
              <td class="initial-col"></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </MopSection>
  </div>
  
  <style>
    .mop-viewer {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    .mop-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      border-bottom: 2px solid #333;
      padding-bottom: 1rem;
    }
  
    .mop-actions {
      display: flex;
      gap: 1rem;
    }
  
    .btn {
      padding: 0.5rem 1rem;
      background-color: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
  
    .btn:hover {
      background-color: #1a252f;
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
  
    th, td {
      padding: 0.5rem;
      text-align: left;
      border: 1px solid #ddd;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    .steps-table .initial-col {
      width: 100px;
    }
  
    .critical-step {
      background-color: #fff8e1;
    }
  
    .risk-level {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-weight: bold;
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
  
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      margin-left: 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
    }
  
    .critical {
      background-color: #f8d7da;
      color: #721c24;
    }
  
    .witness {
      background-color: #cce5ff;
      color: #004085;
    }
  
    .timestamp {
      background-color: #d1ecf1;
      color: #0c5460;
    }
  
    @media print {
      .mop-actions {
        display: none;
      }
      
      .mop-viewer {
        padding: 0;
      }
      
      @page {
        size: A4;
        margin: 1cm;
      }
    }
  </style>