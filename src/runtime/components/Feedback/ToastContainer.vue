<template>
  <div :class="containerClasses">
    <TransitionGroup :name="transitionName" tag="div" class="space-y-2">
      <Toast
        v-for="(toast, index) in visibleToasts"
        :key="toast.id"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :closable="toast.closable"
        :persistent="true"
        :fixed="false"
        :style="{ zIndex: maxToasts - index }"
        @close="removeToast(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Toast from './Toast.vue';

export interface ToastItem {
  id: string | number;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  closable?: boolean;
  timestamp: number;
}

interface Props {
  toasts?: ToastItem[];
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
  maxToasts?: number;
}

const props = withDefaults(defineProps<Props>(), {
  toasts: () => [],
  position: 'top-right',
  maxToasts: 5,
});

const emit = defineEmits<{
  'remove-toast': [id: string | number];
}>();

const timers = ref<Map<string | number, ReturnType<typeof setTimeout>>>(new Map());

// Sort toasts by timestamp (oldest first) and limit to maxToasts
const visibleToasts = computed(() => {
  return [...props.toasts]
    .sort((a, b) => a.timestamp - b.timestamp) // Oldest first (will appear at top)
    .slice(0, props.maxToasts);
});

const containerClasses = computed(() => {
  const baseClasses = [
    'toast-container',
    'fixed',
    'z-50',
    'flex',
    'flex-col',
    'pointer-events-none',
  ];

  // Position classes
  switch (props.position) {
    case 'top-right':
      baseClasses.push('top-4', 'right-4');
      break;
    case 'top-left':
      baseClasses.push('top-4', 'left-4');
      break;
    case 'bottom-right':
      baseClasses.push('bottom-4', 'right-4');
      break;
    case 'bottom-left':
      baseClasses.push('bottom-4', 'left-4');
      break;
    case 'top-center':
      baseClasses.push('top-4', 'left-1/2', 'transform', '-translate-x-1/2');
      break;
    case 'bottom-center':
      baseClasses.push('bottom-4', 'left-1/2', 'transform', '-translate-x-1/2');
      break;
  }

  // Reverse order for bottom positions (newest at bottom)
  if (props.position.includes('bottom')) {
    baseClasses.push('flex-col-reverse');
  }

  return baseClasses.join(' ');
});

const transitionName = computed(() => {
  if (props.position.includes('right')) {
    return 'toast-stack-right';
  } else if (props.position.includes('left')) {
    return 'toast-stack-left';
  } else {
    return 'toast-stack-center';
  }
});

const removeToast = (id: string | number) => {
  // Clear timer if exists
  const timer = timers.value.get(id);
  if (timer) {
    clearTimeout(timer);
    timers.value.delete(id);
  }

  emit('remove-toast', id);
};

const startTimer = (toast: ToastItem) => {
  if (toast.duration && toast.duration > 0) {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);

    timers.value.set(toast.id, timer);
  }
};

// Watch for new toasts and start their timers
watch(
  () => props.toasts,
  (newToasts, oldToasts) => {
    // Find newly added toasts
    const oldIds = new Set(oldToasts?.map(t => t.id) || []);
    const newItems = newToasts.filter(t => !oldIds.has(t.id));

    // Start timers for new toasts
    newItems.forEach(toast => {
      startTimer(toast);
    });
  },
  { immediate: true, deep: true }
);

// Cleanup timers when component unmounts
import { onUnmounted } from 'vue';
onUnmounted(() => {
  timers.value.forEach(timer => clearTimeout(timer));
  timers.value.clear();
});
</script>

<style scoped>
/* Right slide animations for stacked toasts */
.toast-stack-right-enter-active {
  transition: all 0.3s ease-out;
}

.toast-stack-right-leave-active {
  transition: all 0.3s ease-in;
}

.toast-stack-right-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-stack-right-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.toast-stack-right-move {
  transition: transform 0.3s ease;
}

/* Left slide animations for stacked toasts */
.toast-stack-left-enter-active {
  transition: all 0.3s ease-out;
}

.toast-stack-left-leave-active {
  transition: all 0.3s ease-in;
}

.toast-stack-left-enter-from {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
}

.toast-stack-left-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
}

.toast-stack-left-move {
  transition: transform 0.3s ease;
}

/* Center animations for stacked toasts */
.toast-stack-center-enter-active {
  transition: all 0.3s ease-out;
}

.toast-stack-center-leave-active {
  transition: all 0.3s ease-in;
}

.toast-stack-center-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-stack-center-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.toast-stack-center-move {
  transition: transform 0.3s ease;
}

/* Ensure toasts are interactive */
.toast-container :deep(.toast-container) {
  pointer-events: auto;
}
</style>
