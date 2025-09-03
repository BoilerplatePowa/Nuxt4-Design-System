<template>
  <ul :class="timelineClasses">
    <li v-for="(item, index) in items" :key="getItemKey(item, index)">
      <!-- Top hr for all items except the first -->
      <hr v-if="index > 0" />

      <!-- Timeline start content -->
      <div v-if="shouldShowStart(index)" :class="startClasses">
        <slot name="start" :item="item" :index="index">
          <!-- Complex content variant -->
          <template v-if="variant === 'complex'">
            <time v-if="item.timestamp" class="font-mono italic">{{ item.timestamp }}</time>
            <div v-if="item.title" class="text-lg font-black">{{ item.title }}</div>
            <div v-if="item.description" class="mt-2">{{ item.description }}</div>
          </template>
          <!-- Simple content variant -->
          <template v-else>
            {{ item.title }}
          </template>
        </slot>
      </div>

      <!-- Timeline middle (icon/marker) -->
      <div :class="middleClasses">
        <slot name="middle" :item="item" :index="index">
          <!-- Custom icon if provided -->
          <div v-if="item.icon" class="flex items-center justify-center">
            <component v-if="isValidComponentName(item.icon)" :is="item.icon" class="h-5 w-5" />
            <span v-else class="text-lg">{{ item.icon }}</span>
          </div>
          <!-- Default DaisyUI icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        </slot>
      </div>

      <!-- Timeline end content -->
      <div v-if="shouldShowEnd(index)" :class="endClasses">
        <slot name="end" :item="item" :index="index">
          <!-- Complex content variant -->
          <template v-if="variant === 'complex'">
            <time v-if="item.timestamp" class="font-mono italic">{{ item.timestamp }}</time>
            <div v-if="item.title" class="text-lg font-black">{{ item.title }}</div>
            <div v-if="item.description" class="mt-2">{{ item.description }}</div>
          </template>
          <!-- Simple content variant -->
          <template v-else>
            {{ item.title }}
          </template>
        </slot>
      </div>

      <!-- Bottom hr for all items except the last -->
      <hr v-if="index < items.length - 1" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface TimelineItem {
  id?: string | number;
  title?: string;
  timestamp?: string;
  description?: string;
  icon?: string | unknown; // Can be a component name, emoji, or any icon
  [key: string]: unknown;
}

interface Props {
  items: TimelineItem[];
  direction?: 'vertical' | 'horizontal';
  compact?: boolean;
  snapIcon?: boolean;
  variant?: 'simple' | 'complex';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
  compact: false,
  snapIcon: false,
  variant: 'simple',
});

const timelineClasses = computed(() => {
  const baseClasses = ['timeline'];

  // Direction
  if (props.direction === 'horizontal') {
    baseClasses.push('timeline-horizontal');
  } else {
    baseClasses.push('timeline-vertical');
  }

  // Complex variant with responsive behavior
  if (props.variant === 'complex') {
    baseClasses.push('timeline-snap-icon', 'max-md:timeline-compact');
  }

  // Compact modifier (for simple variant)
  if (props.compact && props.variant === 'simple') {
    baseClasses.push('timeline-compact');
  }

  // Snap icon modifier (for simple variant)
  if (props.snapIcon && props.variant === 'simple') {
    baseClasses.push('timeline-snap-icon');
  }

  return baseClasses.join(' ');
});

const shouldShowStart = (index: number) => {
  // In complex variant, always show content based on alternating pattern
  if (props.variant === 'complex') {
    return index % 2 === 0;
  }

  // In compact mode, all content goes to one side
  if (props.compact) return false;

  // For alternating layout, show start on even indices
  return index % 2 === 0;
};

const shouldShowEnd = (index: number) => {
  // In complex variant, always show content based on alternating pattern
  if (props.variant === 'complex') {
    return index % 2 === 1;
  }

  // In compact mode, all content goes to one side
  if (props.compact) return true;

  // For alternating layout, show end on odd indices
  return index % 2 === 1;
};

const startClasses = computed(() => {
  const baseClasses = ['timeline-start'];

  // Add box modifier for simple variant
  if (props.variant === 'simple') {
    baseClasses.push('timeline-box');
  }

  // Complex variant styling
  if (props.variant === 'complex') {
    baseClasses.push('mb-10', 'md:text-end');
  }

  // Add snap-icon modifier if enabled (simple variant only)
  if (props.snapIcon && props.variant === 'simple') {
    baseClasses.push('timeline-snap-icon');
  }

  return baseClasses.join(' ');
});

const middleClasses = computed(() => {
  const baseClasses = ['timeline-middle'];

  // Add snap-icon modifier if enabled (simple variant only)
  if (props.snapIcon && props.variant === 'simple') {
    baseClasses.push('timeline-snap-icon');
  }

  return baseClasses.join(' ');
});

const endClasses = computed(() => {
  const baseClasses = ['timeline-end'];

  // Add box modifier for simple variant
  if (props.variant === 'simple') {
    baseClasses.push('timeline-box');
  }

  // Complex variant styling
  if (props.variant === 'complex') {
    baseClasses.push('md:mb-10');
  }

  return baseClasses.join(' ');
});

const getItemKey = (item: TimelineItem, index: number) => {
  return item.id !== undefined ? item.id : index;
};

const isValidComponentName = (icon: unknown): boolean => {
  if (typeof icon !== 'string') return false;

  // Check if it's a valid component name (starts with a letter, contains only letters, numbers, hyphens, underscores)
  const componentNameRegex = /^[a-zA-Z][a-zA-Z0-9-_]*$/;
  return componentNameRegex.test(icon);
};
</script>
