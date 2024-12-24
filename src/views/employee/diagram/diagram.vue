<template>
    <div class=" h-full">
      <h1>{{ $t('welcome') }}</h1>
      <p>{{ $t('employee') }}</p>
    </div>
  </template>
  
  <script lang="ts" setup>
  
  </script> 
  
  <style scoped>
  .home {
    background-color: var(--bg-color);
    color: var(--text-color);
    padding: 20px;
    border: 2px solid var(--accent-color);
    border-radius: 8px;
  }
  </style>
  