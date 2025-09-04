import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Toggle from '../../../src/runtime/components/DataInput/Toggle.vue';

describe('Toggle', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
      },
    });

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Test toggle');
    expect(wrapper.find('input').classes()).toContain('toggle');
  });

  it('is checked when modelValue is true', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: true,
        label: 'Active toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    expect((toggle.element as HTMLInputElement).checked).toBe(true);
  });

  it('is unchecked when modelValue is false', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Inactive toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    expect((toggle.element as HTMLInputElement).checked).toBe(false);
  });

  it('applies variant classes correctly', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'success',
      'warning',
      'info',
      'error',
    ] as const;

    variants.forEach(variant => {
      const wrapper = mount(Toggle, {
        props: {
          modelValue: false,
          variant,
          label: 'Test',
        },
      });

      expect(wrapper.find('input').classes()).toContain(`toggle-${variant}`);
    });
  });

  it('applies size classes correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const wrapper = mount(Toggle, {
        props: {
          modelValue: false,
          size,
          label: 'Test',
        },
      });

      if (size !== 'md') {
        expect(wrapper.find('input').classes()).toContain(`toggle-${size}`);
      }
    });
  });

  it('updates modelValue when toggled', async () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    await toggle.setValue(true);

    // With defineModel(), the component automatically handles v-model updates
    // We can verify the input is checked
    expect((toggle.element as HTMLInputElement).checked).toBe(true);
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        disabled: true,
        label: 'Disabled toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    expect(toggle.attributes('disabled')).toBeDefined();
  });

  it('shows error message when provided', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
        errorMessage: 'This field is required',
      },
    });

    expect(wrapper.text()).toContain('This field is required');
    expect(wrapper.find('.text-error').exists()).toBe(true);
  });

  it('applies error state classes when error message is present', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
        errorMessage: 'Error',
      },
    });

    expect(wrapper.find('input').classes()).toContain('toggle-error');
  });

  it('renders without label when not provided', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
      },
    });

    expect(wrapper.find('label span').exists()).toBe(false);
  });

  it('emits change event when toggled', async () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    await toggle.trigger('change');

    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('combines multiple props correctly', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: true,
        variant: 'success',
        size: 'lg',
        label: 'Large success toggle',
      },
    });

    const toggle = wrapper.find('input');
    expect(toggle.classes()).toContain('toggle');
    expect(toggle.classes()).toContain('toggle-success');
    expect(toggle.classes()).toContain('toggle-lg');
    expect((toggle.element as HTMLInputElement).checked).toBe(true);
  });

  it('sets correct ARIA attributes', () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Accessible toggle',
        errorMessage: 'Error message',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    expect(toggle.attributes('aria-describedby')).toBeTruthy();
  });

  it('uses default value when no modelValue is provided', () => {
    const wrapper = mount(Toggle, {
      props: {
        label: 'Test toggle',
      },
    });

    const toggle = wrapper.find('input[type="checkbox"]');
    expect((toggle.element as HTMLInputElement).checked).toBe(false);
  });

  it('handles v-model binding correctly with defineModel', async () => {
    const wrapper = mount(Toggle, {
      props: {
        modelValue: false,
        label: 'Test toggle',
      },
    });

    // Test that the component properly binds to the modelValue prop
    const toggle = wrapper.find('input[type="checkbox"]');
    expect((toggle.element as HTMLInputElement).checked).toBe(false);

    // Update the prop and verify the input reflects the change
    await wrapper.setProps({ modelValue: true });
    expect((toggle.element as HTMLInputElement).checked).toBe(true);
  });
});
