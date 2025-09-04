import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Skeleton from '../../../src/runtime/components/Feedback/Skeleton.vue';

describe('Skeleton', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Skeleton);

    expect(wrapper.classes()).toContain('skeleton');
    expect(wrapper.classes()).toContain('skeleton-text');
  });

  it('applies variant classes correctly', () => {
    const variants = ['text', 'circular', 'rectangular', 'rounded'] as const;

    variants.forEach(variant => {
      const wrapper = mount(Skeleton, {
        props: { variant },
      });

      expect(wrapper.classes()).toContain(`skeleton-${variant}`);
    });
  });

  it('applies custom width and height', () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: '200px',
        height: '100px',
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('width: 200px');
    expect(style).toContain('height: 100px');
  });

  it('applies numeric width and height as pixels', () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: 150,
        height: 80,
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('width: 150px');
    expect(style).toContain('height: 80px');
  });

  it('disables animation when animated is false', () => {
    const wrapper = mount(Skeleton, {
      props: { animated: false },
    });

    expect(wrapper.classes()).toContain('skeleton-no-animation');
  });

  it('renders slot content', () => {
    const wrapper = mount(Skeleton, {
      slots: {
        default: '<span class="custom-skeleton">Custom content</span>',
      },
    });

    expect(wrapper.find('.custom-skeleton').exists()).toBe(true);
    expect(wrapper.text()).toContain('Custom content');
  });
});
