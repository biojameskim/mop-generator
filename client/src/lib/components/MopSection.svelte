<!-- MOPSection is viewing the actual MOP -->

<script lang="ts">
  export let title: string;
</script>

<div class="mop-section">
  <div class="section-header">
    <h3>{title}</h3>
  </div>
  <div class="section-content">
    <!-- This is really cool (like props in React... but seems to be better) I can just pass in the content from the MopViewer here. -->
    <slot></slot> 
  </div>
</div>

<style>
  .mop-section {
    margin-bottom: 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  .section-header {
    background-color: #2c3e50;
    color: white;
    padding: 0.75rem 1rem;
  }

  .section-header h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .section-content {
    padding: 1rem;
    background-color: #fff;
  }
</style>