<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import toolbarComponent from "./components/ToolbarComponent.vue";
  import messageComponent from "./components/MessageComponent.vue";
</script>

<template>
  <v-app>
    <toolbarComponent />

    <v-main >
      <v-container fluid >
        <router-view />

        <messageComponent />

      </v-container>
    </v-main>
  </v-app>
</template>
