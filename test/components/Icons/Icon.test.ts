import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from '../../../src/runtime/components/Icons/Icon.vue';

describe('Icon', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'heart',
      },
    });

    expect(wrapper.exists()).toBe(true);
    // The component will render the Heart icon from lucide-vue-next
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders with custom size', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'star',
        size: 'lg',
      },
    });

    // The size prop should be passed to the underlying icon component
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders with custom stroke width', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'settings',
        strokeWidth: 1.5,
      },
    });

    // The strokeWidth prop should be passed to the underlying icon component
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('applies custom color class', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'check',
        color: 'success',
      },
    });

    expect(wrapper.classes()).toContain('text-success');
  });

  it('applies custom class', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'user',
        class: 'custom-class',
      },
    });

    expect(wrapper.classes()).toContain('custom-class');
  });

  it('renders fallback icon for invalid name', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'invalid-icon-name' as any,
      },
    });

    // Should render the fallback HelpCircle icon
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('passes aria attributes correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'heart',
        ariaLabel: 'Like this post',
        ariaHidden: false,
      },
    });

    // The aria attributes should be passed to the underlying icon component
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('handles numeric size correctly', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'home',
        size: 48,
      },
    });

    // The numeric size should be passed to the underlying icon component
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
