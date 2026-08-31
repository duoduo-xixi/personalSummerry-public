<template>
  <button
    class="edit-fab"
    :class="{ on: editing }"
    type="button"
    :aria-label="editing ? '离开编辑模式' : '进入编辑模式'"
    @click="toggleEdit"
  >
    <span class="fab-icon">{{ editing ? "✓" : "✎" }}</span>
    <span class="fab-label">{{ editing ? "完成" : "编辑" }}</span>
  </button>
</template>

<script setup>
import { editing, toggleEdit } from "../composables/useEditor";
</script>
