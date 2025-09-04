<template>
  <Teleport to="body" :disabled="!canTeleport">
    <dialog
      ref="dialogRef"
      :class="modalClasses"
      :open="model"
      @click="handleOverlayClick"
      @keydown="handleKeyDown"
    >
      <div ref="modalRef" :class="modalBoxClasses" tabindex="-1" @click.stop>
        <!-- Focus trap elements -->
        <div
          ref="firstFocusableElement"
          tabindex="0"
          @focus="focusLastElement"
          class="sr-only"
          data-focus-trap="first"
        >
          Start of modal
        </div>

        <!-- Header -->
        <header v-if="$slots.header || title" :class="headerClasses">
          <slot name="header">
            <h2 :id="titleId" :class="titleClasses">
              {{ title }}
            </h2>
          </slot>

          <Button
            v-if="closable"
            ref="closeButtonRef"
            btn-style="ghost"
            size="xs"
            circle
            aria-label="Close modal"
            @click="close"
          >
            <Icon name="x" size="sm" />
          </Button>
        </header>

        <!-- Body -->
        <div :id="descriptionId" :class="bodyClasses">
          <slot />
        </div>

        <!-- Footer -->
        <footer v-if="$slots.footer" :class="footerClasses">
          <slot name="footer" />
        </footer>

        <!-- Focus trap elements -->
        <div
          ref="lastFocusableElement"
          tabindex="0"
          @focus="focusFirstElement"
          class="sr-only"
          data-focus-trap="last"
        >
          End of modal
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, onUnmounted } from 'vue';
import Button from './Button.vue';
import Icon from '../Icons/Icon.vue';

// Simple ID generator for compatibility
let idCounter = 0;
const generateId = () => `modal-${++idCounter}`;

interface Props {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  persistent?: boolean;
  trapFocus?: boolean;
  returnFocus?: boolean;
  autoFocus?: boolean;
  zIndex?: number;
}

// Use defineModel() for v-model (Vue 3.5+ best practice)
const model = defineModel<boolean>({ default: false });

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEsc: true,
  persistent: false,
  trapFocus: true,
  returnFocus: true,
  autoFocus: true,
  zIndex: 50,
});

const emit = defineEmits<{
  close: [];
  open: [];
  escape: [];
  'before-open': [];
  'after-open': [];
  'before-close': [];
  'after-close': [];
}>();

const dialogRef = ref<HTMLDialogElement>();
const modalRef = ref<HTMLElement>();
const closeButtonRef = ref<HTMLElement>();
const firstFocusableElement = ref<HTMLElement>();
const lastFocusableElement = ref<HTMLElement>();

const titleId = generateId();
const descriptionId = generateId();
let previousActiveElement: Element | null = null;

// Check if we can safely use Teleport (for Storybook compatibility)
const canTeleport = computed(() => {
  if (typeof window === 'undefined') return false;
  return document.body !== null;
});

const modalClasses = computed(() => {
  const classes = ['modal'];

  // Handle z-index properly with Tailwind classes
  if (props.zIndex >= 50) {
    classes.push('z-50');
  } else if (props.zIndex >= 40) {
    classes.push('z-40');
  } else if (props.zIndex >= 30) {
    classes.push('z-30');
  } else if (props.zIndex >= 20) {
    classes.push('z-20');
  } else {
    classes.push('z-10');
  }

  return classes;
});

const modalBoxClasses = computed(() => {
  const baseClasses = [
    'modal-box',
    'bg-base-100',
    'text-base-content',
    'max-h-[90vh]',
    'overflow-hidden',
    'flex',
    'flex-col',
    'relative',
    'overscroll-contain',
    'focus:outline-none',
  ];

  // Size
  switch (props.size) {
    case 'sm':
      baseClasses.push('max-w-sm');
      break;
    case 'md':
      baseClasses.push('max-w-md');
      break;
    case 'lg':
      baseClasses.push('max-w-lg');
      break;
    case 'xl':
      baseClasses.push('max-w-xl');
      break;
    case 'full':
      baseClasses.push('max-w-full', 'w-full', 'h-full', 'm-4');
      break;
  }

  // Responsive improvements
  baseClasses.push('mx-4', 'md:mx-0', 'max-h-[calc(100vh-2rem)]', 'md:max-h-[90vh]');

  return baseClasses.join(' ');
});

const headerClasses = computed(() => [
  'flex',
  'items-center',
  'justify-between',
  'p-4',
  'border-b',
  'border-base-200',
]);

const titleClasses = computed(() => ['text-lg', 'font-semibold', 'text-base-content']);

const bodyClasses = computed(() => ['flex-1', 'p-4', 'overflow-y-auto']);

const footerClasses = computed(() => [
  'flex',
  'items-center',
  'justify-end',
  'gap-3',
  'p-4',
  'border-t',
  'border-base-200',
]);

// Focus management functions
const getFocusableElements = (): HTMLElement[] => {
  if (!modalRef.value) return [];

  const selectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  const elements = Array.from(
    modalRef.value.querySelectorAll(selectors.join(', '))
  ) as HTMLElement[];

  // Filter out the focus trap elements to prevent infinite loops
  return elements.filter(
    element =>
      !element.classList.contains('sr-only') &&
      element !== firstFocusableElement.value &&
      element !== lastFocusableElement.value &&
      !element.hasAttribute('data-focus-trap')
  );
};

const focusFirstElement = () => {
  if (!props.trapFocus) return;

  const elements = getFocusableElements();
  if (elements.length > 0) {
    elements[0]?.focus();
  } else if (closeButtonRef.value) {
    closeButtonRef.value.focus();
  } else if (modalRef.value) {
    modalRef.value.focus();
  }
};

const focusLastElement = () => {
  if (!props.trapFocus) return;

  const elements = getFocusableElements();
  if (elements.length > 0) {
    elements[elements.length - 1]?.focus();
  } else if (closeButtonRef.value) {
    closeButtonRef.value.focus();
  } else if (modalRef.value) {
    modalRef.value.focus();
  }
};

const open = () => {
  emit('before-open');
  previousActiveElement = document.activeElement;
  model.value = true;
  emit('open');
};

const close = () => {
  if (!props.persistent) {
    emit('before-close');
    model.value = false;
    emit('close');
  }
};

// Expose methods for external access
defineExpose({
  open,
  close,
  focus: focusFirstElement,
});

const handleOverlayClick = (event: Event) => {
  // DaisyUI modal backdrop click handling
  if (props.closeOnOverlay && event.target === dialogRef.value) {
    close();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEsc) {
    event.preventDefault();
    emit('escape');
    close();
    return;
  }

  if (event.key === 'Tab' && props.trapFocus) {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }
};

// Focus management
watch(
  () => model.value,
  isOpen => {
    if (isOpen) {
      nextTick(() => {
        if (props.autoFocus) {
          focusFirstElement();
        }
      });
      emit('after-open');
    } else {
      if (props.returnFocus && previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
      emit('after-close');
    }
  }
);

// Cleanup on component unmount
onUnmounted(() => {
  // DaisyUI handles body scroll management automatically
});
</script>
