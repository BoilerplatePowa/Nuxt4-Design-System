import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Rating from '../../../src/runtime/components/DataInput/Rating.vue';

describe('Rating', () => {
  it('renders with default props', () => {
    const wrapper = mount(Rating);

    expect(wrapper.find('.form-control').exists()).toBe(true);
    expect(wrapper.find('.rating').exists()).toBe(true);
    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(6); // 5 + 1 for allowEmpty
  });

  it('renders with label', () => {
    const wrapper = mount(Rating, {
      props: {
        label: 'Rate this product',
      },
    });

    expect(wrapper.find('.label-text').text()).toBe('Rate this product');
  });

  it('renders correct number of rating inputs based on maxRating', () => {
    const wrapper = mount(Rating, {
      props: {
        maxRating: 10,
      },
    });

    expect(wrapper.findAll('input[type="radio"]')).toHaveLength(11); // 10 + 1 for allowEmpty
  });

  it('applies correct size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      const wrapper = mount(Rating, {
        props: { size },
      });

      if (size === 'xs') {
        expect(wrapper.find('.rating').classes()).toContain('rating-xs');
      } else if (size === 'sm') {
        expect(wrapper.find('.rating').classes()).toContain('rating-sm');
      } else if (size === 'lg') {
        expect(wrapper.find('.rating').classes()).toContain('rating-lg');
      }
      // 'md' is default, no additional class
    });
  });

  it('applies correct variant classes to star inputs', () => {
    const variants = [
      { variant: 'star', expectedClasses: ['mask-star-2', 'bg-orange-400'] },
      { variant: 'heart', expectedClasses: ['mask-heart', 'bg-red-400'] },
      { variant: 'mask', expectedClasses: ['mask-star', 'bg-primary'] },
    ] as const;

    variants.forEach(({ variant, expectedClasses }) => {
      const wrapper = mount(Rating, {
        props: { variant },
      });

      // Only check the star inputs (exclude the empty input with value 0)
      const starInputs = wrapper
        .findAll('input[type="radio"]')
        .filter(input => input.attributes('value') !== '0');
      starInputs.forEach(input => {
        expectedClasses.forEach(className => {
          expect(input.classes()).toContain(className);
        });
      });
    });
  });

  it('shows help text when provided', () => {
    const wrapper = mount(Rating, {
      props: {
        helpText: 'Please rate this product',
      },
    });

    expect(wrapper.text()).toContain('Please rate this product');
  });

  it('shows error message when provided', () => {
    const wrapper = mount(Rating, {
      props: {
        errorMessage: 'Rating is required',
      },
    });

    expect(wrapper.text()).toContain('Rating is required');
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  });

  it('disables inputs when disabled prop is true', () => {
    const wrapper = mount(Rating, {
      props: {
        disabled: true,
      },
    });

    // Only check the star inputs (exclude the empty input)
    const starInputs = wrapper
      .findAll('input[type="radio"]')
      .filter(input => input.attributes('value') !== '0');
    starInputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });

  it('disables inputs when readonly prop is true', () => {
    const wrapper = mount(Rating, {
      props: {
        readonly: true,
      },
    });

    // Only check the star inputs (exclude the empty input)
    const starInputs = wrapper
      .findAll('input[type="radio"]')
      .filter(input => input.attributes('value') !== '0');
    starInputs.forEach(input => {
      expect(input.attributes('disabled')).toBeDefined();
    });
  });

  it('includes empty rating option when allowEmpty is true', () => {
    const wrapper = mount(Rating, {
      props: {
        allowEmpty: true,
      },
    });

    const emptyInput = wrapper.find('input[value="0"]');
    expect(emptyInput.exists()).toBe(true);
    expect(emptyInput.classes()).toContain('rating-hidden');
  });

  it('excludes empty rating option when allowEmpty is false', () => {
    const wrapper = mount(Rating, {
      props: {
        allowEmpty: false,
      },
    });

    const emptyInput = wrapper.find('input[value="0"]');
    expect(emptyInput.exists()).toBe(false);
  });

  it('uses custom name attribute for star radio inputs', () => {
    const wrapper = mount(Rating, {
      props: {
        name: 'custom-rating',
      },
    });

    // Only check the star inputs (exclude the empty input which has fixed name="rating")
    const starInputs = wrapper
      .findAll('input[type="radio"]')
      .filter(input => input.attributes('value') !== '0');
    starInputs.forEach(input => {
      expect(input.attributes('name')).toBe('custom-rating');
    });
  });

  it('uses default name when no name prop is provided', () => {
    const wrapper = mount(Rating);

    // Only check the star inputs (exclude the empty input which has fixed name="rating")
    const starInputs = wrapper
      .findAll('input[type="radio"]')
      .filter(input => input.attributes('value') !== '0');
    starInputs.forEach(input => {
      expect(input.attributes('name')).toBe('rating');
    });
  });

  it('empty input always uses "rating" as name', () => {
    const wrapper = mount(Rating, {
      props: {
        name: 'custom-rating',
      },
    });

    const emptyInput = wrapper.find('input[value="0"]');
    expect(emptyInput.attributes('name')).toBe('rating');
  });

  describe('v-model behavior', () => {
    it('updates model value when rating is selected', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
        },
      });

      const rating3Input = wrapper.find('input[value="3"]');
      await rating3Input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3]);
    });

    it('emits change event when rating is selected', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
        },
      });

      const rating4Input = wrapper.find('input[value="4"]');
      await rating4Input.trigger('change');

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')?.[0]).toEqual([4]);
    });

    it('does not emit events when disabled', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          disabled: true,
        },
      });

      const rating2Input = wrapper.find('input[value="2"]');
      await rating2Input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect(wrapper.emitted('change')).toBeFalsy();
    });

    it('does not emit events when readonly', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 0,
          readonly: true,
        },
      });

      const rating5Input = wrapper.find('input[value="5"]');
      await rating5Input.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect(wrapper.emitted('change')).toBeFalsy();
    });

    it('allows setting rating to 0 when allowEmpty is true', async () => {
      const wrapper = mount(Rating, {
        props: {
          modelValue: 3,
          allowEmpty: true,
        },
      });

      const emptyInput = wrapper.find('input[value="0"]');
      await emptyInput.trigger('change');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0]);
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA attributes for error messages', () => {
      const wrapper = mount(Rating, {
        props: {
          errorMessage: 'Rating is required',
        },
      });

      const errorElement = wrapper.find('[role="alert"]');
      expect(errorElement.exists()).toBe(true);
      expect(errorElement.text()).toBe('Rating is required');
    });

    it('has proper form control structure', () => {
      const wrapper = mount(Rating, {
        props: {
          label: 'Rate this product',
        },
      });

      expect(wrapper.find('.form-control').exists()).toBe(true);
      expect(wrapper.find('.label').exists()).toBe(true);
      expect(wrapper.find('.rating').exists()).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('handles maxRating of 1', () => {
      const wrapper = mount(Rating, {
        props: {
          maxRating: 1,
        },
      });

      expect(wrapper.findAll('input[type="radio"]')).toHaveLength(2); // 1 + 1 for allowEmpty
    });

    it('handles very large maxRating', () => {
      const wrapper = mount(Rating, {
        props: {
          maxRating: 100,
        },
      });

      expect(wrapper.findAll('input[type="radio"]')).toHaveLength(101); // 100 + 1 for allowEmpty
    });

    it('handles zero maxRating gracefully', () => {
      const wrapper = mount(Rating, {
        props: {
          maxRating: 0,
        },
      });

      expect(wrapper.findAll('input[type="radio"]')).toHaveLength(1); // only the empty option
    });
  });
});
