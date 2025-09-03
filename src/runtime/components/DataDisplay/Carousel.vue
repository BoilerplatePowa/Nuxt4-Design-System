<template>
  <div :class="wrapperClasses">
    <!-- Main Carousel Container -->
    <div :class="carouselClasses">
      <!-- Side Controls -->
      <div v-if="showArrows && controllerPosition === 'sides'" class="carousel-controls-sides">
        <div class="carousel-nav prev" @click="goToPrevious">
          <slot name="prev-arrow">
            <button class="carousel-side-btn">❮</button>
          </slot>
        </div>
        <div class="carousel-nav next" @click="goToNext">
          <slot name="next-arrow">
            <button class="carousel-side-btn">❯</button>
          </slot>
        </div>
      </div>

      <!-- DaisyUI Carousel Structure -->
      <div class="carousel w-full" :style="carouselStyle">
        <slot>
          <div
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            :id="`carousel-item-${index}`"
            :class="getItemClasses(index)"
            @click="handleItemClick(item, index, $event)"
          >
            <slot
              :name="`carousel-item-${index}`"
              :item="item"
              :index="index"
              :isActive="index === currentIndex"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.alt || `Slide ${index + 1}`"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex items-center justify-center h-full bg-base-200">
                <span class="text-base-content/70">{{ item.content || `Slide ${index + 1}` }}</span>
              </div>
            </slot>
          </div>
        </slot>
      </div>
    </div>

    <!-- Pagination Indicators (for sides) -->
    <div
      v-if="showIndicators && controllerPosition === 'sides'"
      class="carousel-pagination-external"
    >
      <!-- Numbers Pagination -->
      <div v-if="paginationType === 'numbers'" class="carousel-pagination-numbers">
        <a
          v-for="(item, index) in items"
          :key="`pagination-${index}`"
          :href="`#carousel-item-${index}`"
          :class="getPaginationClasses(index)"
          @click.prevent="goToSlide(index)"
        >
          {{ index + 1 }}
        </a>
      </div>

      <!-- Dots Pagination -->
      <div v-else-if="paginationType === 'dots'" class="carousel-pagination-dots">
        <a
          v-for="(item, index) in items"
          :key="`pagination-${index}`"
          :href="`#carousel-item-${index}`"
          :class="getDotClasses(index)"
          @click.prevent="goToSlide(index)"
        >
          <span class="sr-only">Go to slide {{ index + 1 }}</span>
        </a>
      </div>

      <!-- Line Pagination -->
      <div v-else-if="paginationType === 'line'" class="carousel-pagination-line">
        <div class="pagination-line-container">
          <div
            v-for="(item, index) in items"
            :key="`pagination-${index}`"
            :class="getLineClasses(index)"
            @click="goToSlide(index)"
          >
            <div class="pagination-line-fill" :style="getLineFillStyle(index)"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Controls with Indicators Between Arrows -->
    <div
      v-if="showArrows && controllerPosition === 'bottom'"
      class="carousel-controls carousel-controls-bottom"
    >
      <div class="carousel-nav prev" @click="goToPrevious">
        <slot name="prev-arrow">
          <button :class="getArrowButtonClasses()">❮</button>
        </slot>
      </div>

      <!-- Indicators Between Arrows -->
      <div v-if="showIndicators" class="carousel-pagination-between">
        <!-- Numbers Pagination -->
        <div v-if="paginationType === 'numbers'" class="carousel-pagination-numbers">
          <a
            v-for="(item, index) in items"
            :key="`pagination-${index}`"
            :href="`#carousel-item-${index}`"
            :class="getPaginationClasses(index)"
            @click.prevent="goToSlide(index)"
          >
            {{ index + 1 }}
          </a>
        </div>

        <!-- Dots Pagination -->
        <div v-else-if="paginationType === 'dots'" class="carousel-pagination-dots">
          <a
            v-for="(item, index) in items"
            :key="`pagination-${index}`"
            :href="`#carousel-item-${index}`"
            :class="getDotClasses(index)"
            @click.prevent="goToSlide(index)"
          >
            <span class="sr-only">Go to slide {{ index + 1 }}</span>
          </a>
        </div>

        <!-- Line Pagination -->
        <div v-else-if="paginationType === 'line'" class="carousel-pagination-line">
          <div class="pagination-line-container">
            <div
              v-for="(item, index) in items"
              :key="`pagination-${index}`"
              :class="getLineClasses(index)"
              @click="goToSlide(index)"
            >
              <div class="pagination-line-fill" :style="getLineFillStyle(index)"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-nav next" @click="goToNext">
        <slot name="next-arrow">
          <button :class="getArrowButtonClasses()">❯</button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';

interface CarouselItem {
  image?: string;
  alt?: string;
  content?: string;
  value?: string | number;
}

interface Props {
  items: CarouselItem[];
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  showIndicators?: boolean;
  showArrows?: boolean;
  controllerPosition?: 'bottom' | 'sides';
  paginationType?: 'numbers' | 'dots' | 'line' | 'default';
  variant?: 'default' | 'full-width' | 'center' | 'vertical';
  indicatorVariant?: 'default' | 'filled' | 'outline' | 'ghost' | 'link';
  arrowVariant?: 'default' | 'filled' | 'outline' | 'ghost' | 'link' | 'glass';
  itemHeight?: string;
  gap?: string;
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayInterval: 3000,
  loop: true,
  showIndicators: true,
  showArrows: true,
  controllerPosition: 'bottom',
  paginationType: 'dots',
  variant: 'default',
  indicatorVariant: 'default',
  arrowVariant: 'default',
  itemHeight: '400px',
  gap: '0',
});

// Use defineModel() for v-model support with default value
const currentIndex = defineModel<number>({ default: 0 });

const emit = defineEmits<{
  'slide-change': [index: number, item: CarouselItem];
  'item-click': [item: CarouselItem, index: number, event: Event];
}>();

let autoplayTimer: NodeJS.Timeout | null = null;

const wrapperClasses = computed(() => {
  const baseClasses = ['carousel-wrapper', 'relative'];

  // Variant classes
  if (props.variant === 'full-width') {
    baseClasses.push('w-full');
  } else if (props.variant === 'center') {
    baseClasses.push('carousel-center');
  } else if (props.variant === 'vertical') {
    baseClasses.push('carousel-vertical');
  }

  // Layout classes
  baseClasses.push('overflow-hidden', 'rounded-box');

  return baseClasses.join(' ');
});

const carouselClasses = computed(() => {
  const baseClasses = ['carousel-main-container', 'relative'];

  // Variant classes
  if (props.variant === 'full-width') {
    baseClasses.push('w-full');
  } else if (props.variant === 'center') {
    baseClasses.push('carousel-center');
  } else if (props.variant === 'vertical') {
    baseClasses.push('carousel-vertical');
  }

  // Layout classes
  baseClasses.push('overflow-hidden', 'rounded-box');

  return baseClasses.join(' ');
});

const carouselStyle = computed(() => {
  const style: Record<string, string> = {
    height: props.itemHeight,
  };

  if (props.gap && props.gap !== '0') {
    style.gap = props.gap;
  }

  return style;
});

const getItemClasses = (index: number): string => {
  const classes = ['carousel-item', 'w-full'];

  if (index === currentIndex.value) {
    classes.push('carousel-item-active');
  }

  return classes.join(' ');
};

const getArrowButtonClasses = (): string => {
  const baseClasses = ['btn', 'btn-sm', 'btn-square'];

  // Apply arrow variant
  switch (props.arrowVariant) {
    case 'filled':
      baseClasses.push('btn-primary');
      break;
    case 'outline':
      baseClasses.push('btn-outline');
      break;
    case 'ghost':
      baseClasses.push('btn-ghost');
      break;
    case 'link':
      baseClasses.push('btn-link');
      break;
    case 'glass':
      baseClasses.push('btn-glass');
      break;
    default:
      // Default styling
      break;
  }

  return baseClasses.join(' ');
};

const getPaginationClasses = (index: number): string => {
  const classes = ['btn', 'btn-xs', 'btn-circle'];

  // Apply indicator variant
  switch (props.indicatorVariant) {
    case 'filled':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-base-200');
      }
      break;
    case 'outline':
      if (index === currentIndex.value) {
        classes.push('btn-primary', 'btn-outline');
      } else {
        classes.push('btn-outline');
      }
      break;
    case 'ghost':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-ghost');
      }
      break;
    case 'link':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-link');
      }
      break;
    default:
      if (index === currentIndex.value) {
        classes.push('btn-active');
      } else {
        classes.push('btn-outline');
      }
      break;
  }

  return classes.join(' ');
};

const getDotClasses = (index: number): string => {
  const classes = ['btn', 'btn-circle', 'btn-xs'];

  // Apply indicator variant
  switch (props.indicatorVariant) {
    case 'filled':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-base-200');
      }
      break;
    case 'outline':
      if (index === currentIndex.value) {
        classes.push('btn-primary', 'btn-outline');
      } else {
        classes.push('btn-outline');
      }
      break;
    case 'ghost':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-ghost');
      }
      break;
    case 'link':
      if (index === currentIndex.value) {
        classes.push('btn-primary');
      } else {
        classes.push('btn-link');
      }
      break;
    default:
      if (index === currentIndex.value) {
        classes.push('btn-active');
      } else {
        classes.push('btn-outline');
      }
      break;
  }

  return classes.join(' ');
};

const getLineClasses = (index: number): string => {
  const classes = ['pagination-line'];

  if (index === currentIndex.value) {
    classes.push('bg-primary');
  }

  return classes.join(' ');
};

const getLineFillStyle = (index: number) => {
  if (index === currentIndex.value) {
    return { width: '100%' };
  } else if (index < currentIndex.value) {
    return { width: '100%' };
  } else {
    return { width: '0%' };
  }
};

const getItemKey = (item: CarouselItem, index: number): string => {
  return item.value?.toString() || index.toString();
};

const goToSlide = (index: number) => {
  if (index < 0 || index >= props.items.length) return;

  currentIndex.value = index;
  emit('slide-change', index, props.items[index]);

  resetAutoplay();
};

const goToNext = () => {
  let nextIndex = currentIndex.value + 1;

  if (nextIndex >= props.items.length) {
    nextIndex = props.loop ? 0 : props.items.length - 1;
  }

  goToSlide(nextIndex);
};

const goToPrevious = () => {
  let prevIndex = currentIndex.value - 1;

  if (prevIndex < 0) {
    prevIndex = props.loop ? props.items.length - 1 : 0;
  }

  goToSlide(prevIndex);
};

const handleItemClick = (item: CarouselItem, index: number, event: Event) => {
  emit('item-click', item, index, event);
};

const startAutoplay = () => {
  if (!props.autoplay || props.items.length <= 1) return;

  autoplayTimer = setInterval(() => {
    goToNext();
  }, props.autoplayInterval);
};

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const resetAutoplay = () => {
  stopAutoplay();
  startAutoplay();
};

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault();
      goToPrevious();
      break;
    case 'ArrowRight':
      event.preventDefault();
      goToNext();
      break;
  }
};

onMounted(() => {
  if (props.autoplay) {
    startAutoplay();
  }

  // Add keyboard event listener
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  stopAutoplay();
  window.removeEventListener('keydown', handleKeydown);
});

// Watch for currentIndex changes to update URL hash
watch(currentIndex, newIndex => {
  // Update URL hash for DaisyUI carousel navigation
  const hash = `#carousel-item-${newIndex}`;
  if (typeof window !== 'undefined') {
    window.location.hash = hash;
  }
});
</script>
