<script setup>
import { computed } from "vue";
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => {
  return route.meta.layout || "default-layout";
});
</script>
<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
