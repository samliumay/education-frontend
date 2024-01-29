<template>
  <div class="loader" />
</template>
<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loader {
  border: 4px solid #F2F2F2;
  border-top: 4px solid #DB3B4D;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}
</style>
