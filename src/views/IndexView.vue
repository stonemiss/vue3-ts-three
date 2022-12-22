<template>
  <div class="htmlView">
    <div class="section">
      <div class="title">FRIST</div>
    </div>
    <div class="section">
      <div class="title">SECOND</div>
    </div>
    <div class="section">
      <div class="title">THIRD</div>
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
.title{
  font-size: 60px;
  font-weight: bolder;
}
</style>