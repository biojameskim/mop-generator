<script lang="ts">
  export let title: string;
</script>

<div class="mop-section">
  <div class="section-header">
    <h3>{title}</h3>
  </div>
  <div class="section-content">
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