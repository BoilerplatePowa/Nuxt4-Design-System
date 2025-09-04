import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Collapse from '../../../src/runtime/components/DataDisplay/Collapse.vue';

describe('Collapse', () => {
  it('renders with default props', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test Collapse',
      },
    });

    expect(wrapper.find('.collapse').exists()).toBe(true);
    expect(wrapper.find('.collapse-title').text()).toContain('Test Collapse');
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
  });

  it('renders with custom content', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test Collapse',
      },
      slots: {
        default: '<p>Custom content</p>',
      },
    });

    expect(wrapper.find('.collapse-content').html()).toContain('<p>Custom content</p>');
  });

  it('applies correct variant classes', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        variant: 'bordered',
      },
    });

    expect(wrapper.find('.collapse').classes()).toContain('border');
    expect(wrapper.find('.collapse').classes()).toContain('border-base-300');
  });

  it('handles disabled state', () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        disabled: true,
      },
    });

    expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.collapse-title').classes()).toContain('cursor-not-allowed');
  });

  it('emits toggle event when clicked', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
      },
    });

    await wrapper.find('.collapse-title').trigger('click');

    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect(wrapper.emitted('toggle')?.[0]).toEqual([true]);
  });

  it('does not emit toggle when disabled', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        disabled: true,
      },
    });

    await wrapper.find('.collapse-title').trigger('click');

    expect(wrapper.emitted('toggle')).toBeFalsy();
  });

  it('supports v-model with defineModel', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        modelValue: false,
      },
    });

    await wrapper.find('.collapse-title').trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('updates v-model when checkbox is clicked', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        modelValue: false,
      },
    });

    await wrapper.find('input[type="checkbox"]').setValue(true);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('responds to external v-model changes', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        modelValue: false,
      },
    });

    // Update the modelValue prop
    await wrapper.setProps({ modelValue: true });

    // The checkbox should reflect the new value
    expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true);
  });

  it('handles keyboard navigation', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
        modelValue: false,
      },
    });

    // Test Enter key
    await wrapper.find('.collapse-title').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);

    // Test Space key
    await wrapper.find('.collapse-title').trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([false]);
  });

  it('prevents default behavior on keyboard events', async () => {
    const wrapper = mount(Collapse, {
      props: {
        title: 'Test',
      },
    });

    const preventDefaultSpy = vi.fn();
    const event = {
      key: 'Enter',
      preventDefault: preventDefaultSpy,
    };

    await wrapper.find('.collapse-title').trigger('keydown', event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
