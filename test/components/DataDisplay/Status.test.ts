import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Status from '../../../src/runtime/components/DataDisplay/Status.vue';

describe('Status', () => {
  it('renders with default props', () => {
    const wrapper = mount(Status);

    expect(wrapper.classes()).toContain('status');
    expect(wrapper.classes()).toContain('status-neutral');
    expect(wrapper.attributes('aria-label')).toBe('status');
  });

  it('renders with custom variant', () => {
    const wrapper = mount(Status, {
      props: {
        variant: 'success',
      },
    });

    expect(wrapper.classes()).toContain('status-success');
  });

  it('renders with custom aria-label', () => {
    const wrapper = mount(Status, {
      props: {
        ariaLabel: 'custom-label',
      },
    });

    expect(wrapper.attributes('aria-label')).toBe('custom-label');
  });

  it('renders with all variants', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ] as const;

    variants.forEach(variant => {
      const wrapper = mount(Status, {
        props: { variant },
      });

      expect(wrapper.classes()).toContain(`status-${variant}`);
    });
  });

  it('renders with all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      const wrapper = mount(Status, {
        props: { size },
      });

      expect(wrapper.classes()).toContain(`status-${size}`);
    });
  });

  it('renders with all animations', () => {
    const animations = ['pulse', 'bounce', 'none'] as const;

    animations.forEach(animation => {
      const wrapper = mount(Status, {
        props: { animation },
      });

      expect(wrapper.classes()).toContain(`animate-${animation}`);
    });
  });

  it('combines multiple props correctly', () => {
    const wrapper = mount(Status, {
      props: {
        variant: 'success',
        size: 'lg',
        animation: 'pulse',
        ariaLabel: 'test-status',
      },
    });

    expect(wrapper.classes()).toContain('status');
    expect(wrapper.classes()).toContain('status-success');
    expect(wrapper.classes()).toContain('status-lg');
    expect(wrapper.classes()).toContain('animate-pulse');
    expect(wrapper.attributes('aria-label')).toBe('test-status');
  });

  it('renders as empty div', () => {
    const wrapper = mount(Status);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.text()).toBe('');
  });

  it('defaults to neutral variant when no variant is provided', () => {
    const wrapper = mount(Status);

    expect(wrapper.classes()).toContain('status-neutral');
  });

  it('defaults to status aria-label when no ariaLabel is provided', () => {
    const wrapper = mount(Status);

    expect(wrapper.attributes('aria-label')).toBe('status');
  });

  it('applies custom classes when provided', () => {
    const wrapper = mount(Status, {
      props: {
        class: 'custom-status-class',
      },
    });

    expect(wrapper.classes()).toContain('status');
    expect(wrapper.classes()).toContain('custom-status-class');
  });
});
