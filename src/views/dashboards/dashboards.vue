<template>
    <div class="flex mt-2 flex-wrap justify-between gap-2 px-2 items-end border-b-2 pb-2">
        <div class="flex flex-wrap">
            <h1 class="text-[25px] mt-[2px] font-semibold leading-7 flex items-center text-[#3b82f6]">
                {{ $t('dashboards') }}
            </h1>
        </div>
        
    </div>
    <div class="">
        <ChartRound/>
    </div>
  </template>
  
  <script lang="ts" setup>
import ChartRound from '../../components/ChartRound.vue';

  </script> 
  
  <style scoped>
  .home {
    background-color: var(--color-60);
    color: var(--text-color);
    padding: 20px;
    border: 2px solid var(--accent-color);
    border-radius: 8px;
  }
  </style>
  