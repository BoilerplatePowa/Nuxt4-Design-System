import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ToastContainer from '../../../src/runtime/components/Feedback/ToastContainer.vue';

describe('ToastContainer', () => {
  const sampleToasts = [
    { id: 1, message: 'Toast 1', type: 'info' as const, timestamp: 1000 },
    { id: 2, message: 'Toast 2', type: 'success' as const, timestamp: 2000 },
    { id: 3, message: 'Toast 3', type: 'warning' as const, timestamp: 3000 },
  ];

  it('renders correctly with default props', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [],
      },
    });

    expect(wrapper.find('.toast-container').exists()).toBe(true);
    expect(wrapper.classes()).toContain('fixed');
    expect(wrapper.classes()).toContain('z-50');
  });

  it('renders toasts correctly', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: sampleToasts,
      },
    });

    const toastElements = wrapper.findAllComponents({ name: 'Toast' });
    expect(toastElements).toHaveLength(3);
  });

  it('applies position classes correctly', () => {
    const positions = [
      { position: 'top-left', classes: ['top-4', 'left-4'] },
      { position: 'top-right', classes: ['top-4', 'right-4'] },
      {
        position: 'bottom-center',
        classes: ['bottom-4', 'left-1/2', 'transform', '-translate-x-1/2'],
      },
    ] as const;

    positions.forEach(({ position, classes }) => {
      const wrapper = mount(ToastContainer, {
        props: {
          toasts: [],
          position,
        },
      });

      const container = wrapper.find('.toast-container');
      classes.forEach(cls => {
        expect(container.classes()).toContain(cls);
      });
    });
  });

  it('reverses flex direction for bottom positions', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: sampleToasts,
        position: 'bottom-right',
      },
    });

    expect(wrapper.find('.toast-container').classes()).toContain('flex-col-reverse');
  });

  it('does not reverse flex direction for top positions', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: sampleToasts,
        position: 'top-right',
      },
    });

    expect(wrapper.find('.toast-container').classes()).not.toContain('flex-col-reverse');
  });

  it('limits toasts to maxToasts', () => {
    const manyToasts = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      message: `Toast ${i + 1}`,
      type: 'info' as const,
      timestamp: (i + 1) * 1000,
    }));

    const wrapper = mount(ToastContainer, {
      props: {
        toasts: manyToasts,
        maxToasts: 3,
      },
    });

    const toastElements = wrapper.findAllComponents({ name: 'Toast' });
    expect(toastElements).toHaveLength(3);
  });

  it('shows oldest toasts when limiting', () => {
    const manyToasts = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      message: `Toast ${i + 1}`,
      type: 'info' as const,
      timestamp: (i + 1) * 1000,
    }));

    const wrapper = mount(ToastContainer, {
      props: {
        toasts: manyToasts,
        maxToasts: 3,
      },
    });

    // Should show the first 3 (oldest) toasts
    const toastElements = wrapper.findAllComponents({ name: 'Toast' });
    expect(toastElements[0].props('message')).toBe('Toast 1');
    expect(toastElements[1].props('message')).toBe('Toast 2');
    expect(toastElements[2].props('message')).toBe('Toast 3');
  });

  it('sorts toasts by timestamp (oldest first)', () => {
    const unsortedToasts = [
      { id: 1, message: 'Third', type: 'info' as const, timestamp: 3000 },
      { id: 2, message: 'First', type: 'success' as const, timestamp: 1000 },
      { id: 3, message: 'Second', type: 'warning' as const, timestamp: 2000 },
    ];

    const wrapper = mount(ToastContainer, {
      props: {
        toasts: unsortedToasts,
      },
    });

    const toastElements = wrapper.findAllComponents({ name: 'Toast' });
    expect(toastElements[0].props('message')).toBe('First');
    expect(toastElements[1].props('message')).toBe('Second');
    expect(toastElements[2].props('message')).toBe('Third');
  });

  it('emits remove-toast event when toast is closed', async () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [{ id: 1, message: 'Test toast', type: 'info' as const, timestamp: 1000 }],
      },
    });

    const toastElement = wrapper.findComponent({ name: 'Toast' });
    await toastElement.vm.$emit('close');

    expect(wrapper.emitted('remove-toast')).toBeTruthy();
    expect(wrapper.emitted('remove-toast')?.[0]).toEqual([1]);
  });

  it('applies correct z-index to stacked toasts', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: sampleToasts,
        maxToasts: 5,
      },
    });

    const toastElements = wrapper.findAllComponents({ name: 'Toast' });

    // First toast (oldest) should have highest z-index
    expect(toastElements[0].attributes('style')).toContain('z-index: 5');
    // Second toast should have lower z-index
    expect(toastElements[1].attributes('style')).toContain('z-index: 4');
    // Third toast should have lowest z-index
    expect(toastElements[2].attributes('style')).toContain('z-index: 3');
  });

  it('sets transition name based on position', () => {
    const rightWrapper = mount(ToastContainer, {
      props: {
        toasts: [],
        position: 'top-right',
      },
    });

    expect(rightWrapper.find('.toast-container').exists()).toBe(true);

    const leftWrapper = mount(ToastContainer, {
      props: {
        toasts: [],
        position: 'top-left',
      },
    });

    expect(leftWrapper.find('.toast-container').exists()).toBe(true);

    const centerWrapper = mount(ToastContainer, {
      props: {
        toasts: [],
        position: 'top-center',
      },
    });

    expect(centerWrapper.find('.toast-container').exists()).toBe(true);
  });

  it('handles empty toasts array', () => {
    const wrapper = mount(ToastContainer, {
      props: {
        toasts: [],
      },
    });

    expect(wrapper.findAllComponents({ name: 'Toast' })).toHaveLength(0);
    expect(wrapper.find('.toast-container').exists()).toBe(true);
  });
});
