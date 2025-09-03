<template>
  <div :class="chatClasses">
    <div v-if="avatar && position === 'left'" class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="avatar" :alt="avatarAlt" />
      </div>
    </div>

    <div class="chat-header">
      <slot name="header">
        <span v-if="name" class="text-sm opacity-50">{{ name }}</span>
        <time v-if="timestamp" class="text-xs opacity-50 ml-1">{{ formattedTime }}</time>
      </slot>
    </div>

    <div :class="bubbleClasses">
      <slot>{{ message }}</slot>
    </div>

    <div v-if="$slots.footer" class="chat-footer opacity-50">
      <slot name="footer" />
    </div>

    <div v-if="avatar && position === 'right'" class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img :src="avatar" :alt="avatarAlt" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  message?: string;
  name?: string;
  avatar?: string;
  avatarAlt?: string;
  timestamp?: Date | string;
  position?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  position: 'left',
  variant: 'primary',
  size: 'md',
  avatarAlt: 'User avatar',
});

const chatClasses = computed(() => {
  const baseClasses = ['chat'];

  // Position classes
  if (props.position === 'left') {
    baseClasses.push('chat-start');
  } else {
    baseClasses.push('chat-end');
  }

  return baseClasses.join(' ');
});

const bubbleClasses = computed(() => {
  const baseClasses = ['chat-bubble'];

  // Variant classes
  if (props.variant === 'primary') {
    baseClasses.push('chat-bubble-primary');
  } else if (props.variant === 'secondary') {
    baseClasses.push('chat-bubble-secondary');
  } else if (props.variant === 'accent') {
    baseClasses.push('chat-bubble-accent');
  } else if (props.variant === 'info') {
    baseClasses.push('chat-bubble-info');
  } else if (props.variant === 'success') {
    baseClasses.push('chat-bubble-success');
  } else if (props.variant === 'warning') {
    baseClasses.push('chat-bubble-warning');
  } else if (props.variant === 'error') {
    baseClasses.push('chat-bubble-error');
  }

  return baseClasses.join(' ');
});

const formattedTime = computed(() => {
  if (!props.timestamp) return '';

  const date = props.timestamp instanceof Date ? props.timestamp : new Date(props.timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});
</script>

<style scoped lang="postcss">
/* DaisyUI handles most chat bubble styling */
</style>
