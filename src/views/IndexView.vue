<template>
  <div class="htmlView">
    <div class="section">
      <h1>frist</h1>
    </div>
    <div class="section">
      <h1>second</h1>
    </div>
    <div class="section">
      <h1>third</h1>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.htmlView{
  width: 100%;
}
.section{
  position: relative;
  height: 100vh;
  width: 100%;
  color:darkorange;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 10%;
  padding-right: 10%;
}
.section:nth-child(odd){
  justify-content: end;
}
</style>