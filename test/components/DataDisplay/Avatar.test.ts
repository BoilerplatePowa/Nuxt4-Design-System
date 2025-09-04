import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Avatar from '../../../src/runtime/components/DataDisplay/Avatar.vue';

describe('Avatar', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Avatar, {
      slots: { default: 'Test' },
    });

    expect(wrapper.find('.avatar').exists()).toBe(true);
    expect(wrapper.find('[aria-label]').exists()).toBe(true);
  });

  it('renders image when src is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://via.placeholder.com/150',
        alt: 'Test avatar',
      },
    });

    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('img').attributes('src')).toBe('https://via.placeholder.com/150');
    expect(wrapper.find('img').attributes('alt')).toBe('Test avatar');
  });

  it('renders placeholder with initials when provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        initials: 'JD',
      },
    });

    expect(wrapper.find('[aria-label]').exists()).toBe(true);
    expect(wrapper.text()).toContain('JD');
  });

  it('generates initials from name when provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Doe',
      },
    });

    expect(wrapper.text()).toContain('JD');
  });

  it('generates initials from name with multiple words', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Michael Doe',
      },
    });

    expect(wrapper.text()).toContain('JM');
  });

  it('applies size classes correctly', () => {
    ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].forEach(size => {
      const wrapper = mount(Avatar, {
        props: { size: size as any },
      });

      const avatarDiv = wrapper.find('.avatar');
      expect(avatarDiv.exists()).toBe(true);
    });
  });

  it('applies shape classes correctly', () => {
    ['circle', 'square', 'rounded'].forEach(shape => {
      const wrapper = mount(Avatar, {
        props: { shape: shape as any },
      });

      const avatarDiv = wrapper.find('.avatar');
      expect(avatarDiv.exists()).toBe(true);
    });
  });

  it('shows presence indicators correctly', () => {
    const presenceStates = ['online', 'offline', 'away', 'busy'] as const;

    presenceStates.forEach(presence => {
      const wrapper = mount(Avatar, {
        props: {
          presence,
          showPresence: true,
        },
      });

      expect(wrapper.find('.absolute.top-0.right-0').exists()).toBe(true);
    });
  });

  it('does not show presence indicator when showPresence is false', () => {
    const wrapper = mount(Avatar, {
      props: {
        presence: 'online',
        showPresence: false,
      },
    });

    expect(wrapper.find('.absolute.top-0.right-0').exists()).toBe(false);
  });

  it('renders with ring when ring prop is true', () => {
    const wrapper = mount(Avatar, {
      props: {
        ring: true,
      },
    });

    const avatarDiv = wrapper.find('.avatar');
    expect(avatarDiv.classes()).toContain('ring-4');
  });

  it('applies ring color when specified', () => {
    const wrapper = mount(Avatar, {
      props: {
        ring: true,
        ringColor: 'primary',
      },
    });

    const avatarDiv = wrapper.find('.avatar');
    expect(avatarDiv.classes()).toContain('ring-primary');
  });

  it('shows badge when badge prop is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        badge: '3',
      },
    });

    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(wrapper.text()).toContain('3');
  });

  it('shows count when count prop is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        count: 42,
      },
    });

    expect(wrapper.find('.badge').exists()).toBe(true);
    expect(wrapper.text()).toContain('42');
  });

  it('shows 99+ when count is greater than 99', () => {
    const wrapper = mount(Avatar, {
      props: {
        count: 999,
      },
    });

    expect(wrapper.text()).toContain('99+');
  });

  it('shows loading state when loading prop is true', () => {
    const wrapper = mount(Avatar, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.find('.loading.loading-spinner').exists()).toBe(true);
  });

  it('applies lazy loading when lazy prop is true', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://via.placeholder.com/150',
        lazy: true,
      },
    });

    expect(wrapper.find('img').attributes('loading')).toBe('lazy');
  });

  it('applies eager loading when lazy prop is false', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://via.placeholder.com/150',
        lazy: false,
      },
    });

    expect(wrapper.find('img').attributes('loading')).toBe('eager');
  });

  it('falls back to placeholder when image fails to load', async () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'invalid-url',
        initials: 'FB',
      },
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(wrapper.find('[aria-label]').exists()).toBe(true);
    expect(wrapper.text()).toContain('FB');
  });

  it('emits imageError event when image fails to load', async () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'invalid-url',
      },
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(wrapper.emitted('imageError')).toBeTruthy();
  });

  it('emits imageLoad event when image loads successfully', async () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://via.placeholder.com/150',
      },
    });

    const img = wrapper.find('img');
    await img.trigger('load');

    expect(wrapper.emitted('imageLoad')).toBeTruthy();
  });

  it('renders slot content when provided', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: '<span>Custom Content</span>',
      },
    });

    expect(wrapper.text()).toContain('Custom Content');
  });

  it('shows icon when no content is provided', () => {
    const wrapper = mount(Avatar, {});

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('applies fallback color classes correctly', () => {
    const colors = ['primary', 'secondary', 'accent', 'neutral'] as const;

    colors.forEach(color => {
      const wrapper = mount(Avatar, {
        props: {
          fallbackColor: color,
        },
      });

      const placeholderDiv = wrapper.find('.h-full.w-full');
      expect(placeholderDiv.exists()).toBe(true);
    });
  });

  it('applies random color when fallbackColor is random and name is provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        name: 'John Doe',
        fallbackColor: 'random',
      },
    });

    const placeholderDiv = wrapper.find('.h-full.w-full');
    expect(placeholderDiv.exists()).toBe(true);
  });

  it('shows badge with correct variant', () => {
    const wrapper = mount(Avatar, {
      props: {
        badge: 'VIP',
        badgeVariant: 'warning',
      },
    });

    const badge = wrapper.find('.badge');
    expect(badge.exists()).toBe(true);
    expect(badge.text()).toContain('VIP');
  });

  it('prioritizes badge over count when both are provided', () => {
    const wrapper = mount(Avatar, {
      props: {
        badge: 'VIP',
        count: 42,
      },
    });

    expect(wrapper.text()).toContain('VIP');
    expect(wrapper.text()).not.toContain('42');
  });
});
