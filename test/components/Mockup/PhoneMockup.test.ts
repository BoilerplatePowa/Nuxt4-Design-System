import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PhoneMockup from '../../../src/runtime/components/Mockup/PhoneMockup.vue';

describe('PhoneMockup', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: 'Phone content',
      },
    });

    expect(wrapper.classes()).toContain('mockup-phone');
    expect(wrapper.text()).toContain('Phone content');
  });

  it('applies color classes correctly', () => {
    const colors = ['black', 'white', 'gold', 'silver'] as const;

    colors.forEach(color => {
      const wrapper = mount(PhoneMockup, {
        props: { color },
        slots: { default: 'Content' },
      });

      expect(wrapper.classes()).toContain(`phone-${color}`);
    });
  });

  it('applies size classes correctly', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach(size => {
      const wrapper = mount(PhoneMockup, {
        props: { size },
        slots: { default: 'Content' },
      });

      if (size !== 'md') {
        expect(wrapper.classes()).toContain(`phone-${size}`);
      }
    });
  });

  it('renders camera element', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: 'Phone content',
      },
    });

    expect(wrapper.find('.camera').exists()).toBe(true);
  });

  it('renders display area', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: 'Display content',
      },
    });

    expect(wrapper.find('.display').exists()).toBe(true);
    expect(wrapper.find('.artboard').exists()).toBe(true);
  });

  it('renders slot content in display area', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: '<div class="app-content">Mobile App Interface</div>',
      },
    });

    expect(wrapper.find('.app-content').exists()).toBe(true);
    expect(wrapper.text()).toContain('Mobile App Interface');
  });

  it('has proper aspect ratio for phone dimensions', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: 'Content',
      },
    });

    const artboard = wrapper.find('.artboard');
    expect(artboard.classes()).toContain('phone-1');
  });

  it('combines size and color props correctly', () => {
    const wrapper = mount(PhoneMockup, {
      props: {
        size: 'lg',
        color: 'black',
      },
      slots: {
        default: 'Large black phone',
      },
    });

    expect(wrapper.classes()).toContain('mockup-phone');
    expect(wrapper.classes()).toContain('phone-lg');
    expect(wrapper.classes()).toContain('phone-black');
    expect(wrapper.text()).toContain('Large black phone');
  });

  it('renders complex content correctly', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: `
          <div class="phone-app">
            <header class="app-header">Header</header>
            <main class="app-main">Main Content</main>
            <footer class="app-footer">Footer</footer>
          </div>
        `,
      },
    });

    expect(wrapper.find('.phone-app').exists()).toBe(true);
    expect(wrapper.find('.app-header').exists()).toBe(true);
    expect(wrapper.find('.app-main').exists()).toBe(true);
    expect(wrapper.find('.app-footer').exists()).toBe(true);
    expect(wrapper.text()).toContain('Header');
    expect(wrapper.text()).toContain('Main Content');
    expect(wrapper.text()).toContain('Footer');
  });

  it('handles empty content gracefully', () => {
    const wrapper = mount(PhoneMockup);

    expect(wrapper.classes()).toContain('mockup-phone');
    expect(wrapper.find('.display').exists()).toBe(true);
    expect(wrapper.find('.camera').exists()).toBe(true);
  });

  it('applies custom classes when provided', () => {
    const wrapper = mount(PhoneMockup, {
      props: {
        class: 'custom-phone-class',
      },
      slots: {
        default: 'Content',
      },
    });

    expect(wrapper.classes()).toContain('mockup-phone');
    expect(wrapper.classes()).toContain('custom-phone-class');
  });

  it('maintains proper structure', () => {
    const wrapper = mount(PhoneMockup, {
      slots: {
        default: 'Test content',
      },
    });

    // Should have proper DaisyUI mockup structure
    expect(wrapper.find('.mockup-phone').exists()).toBe(true);
    expect(wrapper.find('.camera').exists()).toBe(true);
    expect(wrapper.find('.display').exists()).toBe(true);
    expect(wrapper.find('.artboard').exists()).toBe(true);

    // Content should be inside the artboard
    const artboard = wrapper.find('.artboard');
    expect(artboard.text()).toContain('Test content');
  });
});
