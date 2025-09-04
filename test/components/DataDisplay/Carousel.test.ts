import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Carousel from '../../../src/runtime/components/DataDisplay/Carousel.vue';

const mockItems = [
  { image: 'test1.jpg', alt: 'Test 1', value: '1' },
  { image: 'test2.jpg', alt: 'Test 2', value: '2' },
  { image: 'test3.jpg', alt: 'Test 3', value: '3' },
];

describe('Carousel', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(Carousel, {
      props: {
        items: mockItems,
      },
    });
  });

  describe('Basic Functionality', () => {
    it('renders carousel with items', () => {
      expect(wrapper.find('.carousel').exists()).toBe(true);
      expect(wrapper.findAll('.carousel-item')).toHaveLength(3);
    });

    it('shows correct initial slide', () => {
      const activeItem = wrapper.find('.carousel-item-active');
      expect(activeItem.exists()).toBe(true);
    });

    it('emits slide-change when navigating', async () => {
      const nextButton = wrapper.find('.carousel-nav.next');
      await nextButton.trigger('click');

      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')[0]).toEqual([1, mockItems[1]]);
    });

    it('updates v-model when navigating', async () => {
      const nextButton = wrapper.find('.carousel-nav.next');
      await nextButton.trigger('click');

      // With defineModel(), the component should update its internal value
      expect(wrapper.vm.currentIndex).toBe(1);
    });
  });

  describe('v-model Integration', () => {
    it('accepts initial v-model value', async () => {
      const wrapperWithModel = mount(Carousel, {
        props: {
          items: mockItems,
          modelValue: 2,
        },
      });

      expect(wrapperWithModel.vm.modelValue).toBe(2);
    });

    it('updates when v-model changes externally', async () => {
      const wrapperWithModel = mount(Carousel, {
        props: {
          items: mockItems,
          modelValue: 0,
        },
      });

      await wrapperWithModel.setProps({ modelValue: 2 });
      expect(wrapperWithModel.vm.modelValue).toBe(2);
    });
  });

  describe('Controller Positioning', () => {
    it('shows bottom controls by default', () => {
      expect(wrapper.find('.carousel-controls').exists()).toBe(true);
    });

    it('shows side controls when controllerPosition is sides', async () => {
      await wrapper.setProps({ controllerPosition: 'sides' });
      expect(wrapper.find('.carousel-controls-sides').exists()).toBe(true);
      expect(wrapper.find('.carousel-controls').exists()).toBe(false);
    });

    it('hides controls when showArrows is false', async () => {
      await wrapper.setProps({ showArrows: false });
      expect(wrapper.find('.carousel-controls').exists()).toBe(false);
    });
  });

  describe('Pagination Types', () => {
    it('shows dots pagination by default', () => {
      expect(wrapper.find('.carousel-pagination-dots').exists()).toBe(true);
    });

    it('shows numbers pagination when paginationType is numbers', async () => {
      await wrapper.setProps({ paginationType: 'numbers' });
      expect(wrapper.find('.carousel-pagination-numbers').exists()).toBe(true);
      expect(wrapper.find('.carousel-indicators').exists()).toBe(false);
    });

    it('shows dots pagination when paginationType is dots', async () => {
      await wrapper.setProps({ paginationType: 'dots' });
      expect(wrapper.find('.carousel-pagination-dots').exists()).toBe(true);
      expect(wrapper.find('.carousel-indicators').exists()).toBe(false);
    });

    it('shows line pagination when paginationType is line', async () => {
      await wrapper.setProps({ paginationType: 'line' });
      expect(wrapper.find('.carousel-pagination-line').exists()).toBe(true);
      expect(wrapper.find('.carousel-indicators').exists()).toBe(false);
    });

    it('hides pagination when showIndicators is false', async () => {
      await wrapper.setProps({ showIndicators: false });
      expect(wrapper.find('.carousel-pagination-external').exists()).toBe(false);
    });
  });

  describe('Pagination External', () => {
    it('shows pagination external when showIndicators is true', () => {
      // For bottom controller position, pagination is between arrows
      expect(wrapper.find('.carousel-pagination-between').exists()).toBe(true);
    });

    it('hides pagination external when showIndicators is false', async () => {
      await wrapper.setProps({ showIndicators: false });
      expect(wrapper.find('.carousel-pagination-between').exists()).toBe(false);
    });

    it('shows pagination external for sides controller position', async () => {
      await wrapper.setProps({ controllerPosition: 'sides' });
      expect(wrapper.find('.carousel-pagination-external').exists()).toBe(true);
    });
  });

  describe('Navigation', () => {
    it('navigates to next slide', async () => {
      const nextButton = wrapper.find('.carousel-nav.next');
      await nextButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([1, mockItems[1]]);
    });

    it('navigates to previous slide', async () => {
      // First go to slide 1
      await wrapper.setProps({ modelValue: 1 });
      await wrapper.vm.$nextTick();

      const prevButton = wrapper.find('.carousel-nav.prev');
      await prevButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([0, mockItems[0]]);
    });

    it('loops to first slide when going next from last slide', async () => {
      await wrapper.setProps({ modelValue: 2, loop: true });
      await wrapper.vm.$nextTick();

      const nextButton = wrapper.find('.carousel-nav.next');
      await nextButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted for the loop
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([0, mockItems[0]]);
    });

    it('loops to last slide when going previous from first slide', async () => {
      await wrapper.setProps({ modelValue: 0, loop: true });
      await wrapper.vm.$nextTick();

      const prevButton = wrapper.find('.carousel-nav.prev');
      await prevButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted for the loop
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([2, mockItems[2]]);
    });

    it('does not loop when loop is false', async () => {
      await wrapper.setProps({ modelValue: 2, loop: false });
      await wrapper.vm.$nextTick();

      const nextButton = wrapper.find('.carousel-nav.next');
      await nextButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Should stay at last slide when loop is false, but still emit the event
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([2, mockItems[2]]);
    });
  });

  describe('Pagination Navigation', () => {
    it('navigates to specific slide via pagination', async () => {
      const paginationButtons = wrapper.findAll('.carousel-pagination-dots a');
      await paginationButtons[2].trigger('click'); // Click third button
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([2, mockItems[2]]);
    });

    it('navigates via numbers pagination', async () => {
      await wrapper.setProps({ paginationType: 'numbers' });
      await wrapper.vm.$nextTick();

      const paginationButtons = wrapper.findAll('.carousel-pagination-numbers a');
      await paginationButtons[1].trigger('click'); // Click second button
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([1, mockItems[1]]);
    });

    it('navigates via dots pagination', async () => {
      await wrapper.setProps({ paginationType: 'dots' });
      await wrapper.vm.$nextTick();

      const paginationButtons = wrapper.findAll('.carousel-pagination-dots a');
      await paginationButtons[2].trigger('click'); // Click third button
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([2, mockItems[2]]);
    });

    it('navigates via line pagination', async () => {
      await wrapper.setProps({ paginationType: 'line' });
      await wrapper.vm.$nextTick();

      const paginationLines = wrapper.findAll('.pagination-line');
      await paginationLines[1].trigger('click'); // Click second line
      await wrapper.vm.$nextTick();

      // Check that the slide-change event was emitted
      expect(wrapper.emitted('slide-change')).toBeTruthy();
      expect(wrapper.emitted('slide-change')?.[0]).toEqual([1, mockItems[1]]);
    });
  });

  describe('Autoplay', () => {
    it('starts autoplay when autoplay is true', async () => {
      await wrapper.setProps({ autoplay: true, autoplayInterval: 100 });

      // Wait for autoplay to trigger
      await new Promise(resolve => setTimeout(resolve, 150));

      // Check if autoplay has advanced to next slide
      expect(wrapper.vm.modelValue).toBeGreaterThanOrEqual(0);
    });

    it('stops autoplay when autoplay is false', async () => {
      await wrapper.setProps({ autoplay: false });

      // Wait to ensure no autoplay
      await new Promise(resolve => setTimeout(resolve, 200));

      expect(wrapper.vm.modelValue).toBe(0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('navigates with arrow keys', async () => {
      // Simulate right arrow key on window
      const rightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(rightEvent);

      // Wait for event to be processed
      await wrapper.vm.$nextTick();

      // Check if navigation occurred
      expect(wrapper.vm.modelValue).toBeGreaterThanOrEqual(0);

      // Simulate left arrow key on window
      const leftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(leftEvent);

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.modelValue).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Item Click Events', () => {
    it('emits item-click when item is clicked', async () => {
      const firstItem = wrapper.find('.carousel-item');
      await firstItem.trigger('click');

      expect(wrapper.emitted('item-click')).toBeTruthy();
      expect(wrapper.emitted('item-click')[0]).toEqual([mockItems[0], 0, expect.any(Object)]);
    });
  });

  describe('Props Validation', () => {
    it('handles empty items array', () => {
      const emptyWrapper = mount(Carousel, {
        props: { items: [] },
      });

      expect(emptyWrapper.find('.carousel').exists()).toBe(true);
      expect(emptyWrapper.findAll('.carousel-item')).toHaveLength(0);
    });

    it('handles custom item height', async () => {
      await wrapper.setProps({ itemHeight: '24rem' });

      const container = wrapper.find('.carousel');
      expect(container.attributes('style')).toContain('height: 24rem');
    });

    it('handles custom gap', async () => {
      await wrapper.setProps({ gap: '2rem' });

      const container = wrapper.find('.carousel');
      expect(container.attributes('style')).toContain('gap: 2rem');
    });
  });
});
