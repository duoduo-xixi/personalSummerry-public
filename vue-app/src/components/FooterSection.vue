<template>
  <footer class="page footer">
    <div class="container footer-inner">
      <p>© <span>{{ year }}</span> <span v-editable="t => (site.name = t)">{{ site.name }}</span> · 由银河系动效驱动</p>
      <p class="footer-tag">BUILT WITH <span class="accent">◇</span> IN THE COSMOS</p>
    </div>
  </footer>
</template>

<script setup>
import { site } from "../data/site";
const year = new Date().getFullYear();
</script>
