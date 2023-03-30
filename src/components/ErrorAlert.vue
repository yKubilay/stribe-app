<template>
    <div v-if="visible" class="alert-modal">
      <div class="alert-modal-content">
        <slot></slot>
        <button @click="closeAlert">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emitClose = defineEmits(['close']);
  
  function closeAlert() {
    emitClose();
  }
  </script>
  
  <style>
  .alert-modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .alert-modal-content {
    background-color: white;
  }
  </style>
  