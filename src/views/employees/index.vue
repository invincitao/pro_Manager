<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <template #before>这是前面的内容</template>
        <template #after>这是后面的内容</template>
      </PageTools>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
