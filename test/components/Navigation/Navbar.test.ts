import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '../../../src/runtime/components/Navigation/Navbar.vue'

describe('Navbar', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Navbar)

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.find('.navbar').exists()).toBe(true)
  })

  it('renders title when provided', () => {
    const wrapper = mount(Navbar, {
      props: {
        title: 'Brand Name',
      },
    })

    expect(wrapper.text()).toContain('Brand Name')
    expect(wrapper.find('.navbar-brand').exists()).toBe(true)
  })

  it('renders logo when provided', () => {
    const wrapper = mount(Navbar, {
      props: {
        logo: 'https://example.com/logo.png',
        logoAlt: 'Company Logo',
      },
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/logo.png')
    expect(img.attributes('alt')).toBe('Company Logo')
  })

  it('makes logo clickable when logoHref is provided', () => {
    const wrapper = mount(Navbar, {
      props: {
        logo: 'https://example.com/logo.png',
        logoHref: '/',
      },
    })

    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/')
  })

  it('applies variant classes correctly', () => {
    const variants = ['default', 'sticky', 'glass'] as const

    variants.forEach((variant) => {
      const wrapper = mount(Navbar, {
        props: { variant },
      })

      if (variant === 'sticky') {
        expect(wrapper.classes()).toContain('sticky')
        expect(wrapper.classes()).toContain('top-0')
      } else if (variant === 'glass') {
        expect(wrapper.classes()).toContain('glass')
      }
    })
  })

  it('applies shadow when shadow prop is true', () => {
    const wrapper = mount(Navbar, {
      props: {
        shadow: true,
      },
    })

    expect(wrapper.classes()).toContain('shadow-lg')
  })

  it('does not apply shadow when shadow prop is false', () => {
    const wrapper = mount(Navbar, {
      props: {
        shadow: false,
      },
    })

    expect(wrapper.classes()).not.toContain('shadow-lg')
  })

  it('renders brand slot when provided', () => {
    const wrapper = mount(Navbar, {
      slots: {
        brand: '<div class="custom-brand">Custom Brand</div>',
      },
    })

    expect(wrapper.find('.custom-brand').exists()).toBe(true)
    expect(wrapper.text()).toContain('Custom Brand')
  })

  it('renders menu slot when provided', () => {
    const wrapper = mount(Navbar, {
      slots: {
        menu: '<ul class="custom-menu"><li>Menu Item</li></ul>',
      },
    })

    expect(wrapper.find('.custom-menu').exists()).toBe(true)
    expect(wrapper.text()).toContain('Menu Item')
  })

  it('renders actions slot when provided', () => {
    const wrapper = mount(Navbar, {
      slots: {
        actions: '<button class="custom-action">Sign In</button>',
      },
    })

    expect(wrapper.find('.custom-action').exists()).toBe(true)
    expect(wrapper.text()).toContain('Sign In')
  })

  it('renders mobile menu when showMobileMenu is true', () => {
    const wrapper = mount(Navbar, {
      props: {
        showMobileMenu: true,
      },
    })

    expect(wrapper.find('.navbar-mobile').exists()).toBe(true)
  })

  it('does not render mobile menu when showMobileMenu is false', () => {
    const wrapper = mount(Navbar, {
      props: {
        showMobileMenu: false,
      },
    })

    expect(wrapper.find('.navbar-mobile').exists()).toBe(false)
  })

  it('combines all props and slots correctly', () => {
    const wrapper = mount(Navbar, {
      props: {
        title: 'My App',
        logo: 'https://example.com/logo.png',
        logoHref: '/',
        variant: 'sticky',
        shadow: true,
        showMobileMenu: true,
      },
      slots: {
        brand: '<span class="brand-extra">Extra Brand Content</span>',
        menu: '<nav class="main-nav">Navigation</nav>',
        actions: '<div class="nav-actions">Actions</div>',
      },
    })

    expect(wrapper.classes()).toContain('navbar')
    expect(wrapper.classes()).toContain('sticky')
    expect(wrapper.classes()).toContain('shadow-lg')
    expect(wrapper.text()).toContain('My App')
    expect(wrapper.text()).toContain('Extra Brand Content')
    expect(wrapper.text()).toContain('Navigation')
    expect(wrapper.text()).toContain('Actions')
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/logo.png')
  })

  it('handles responsive design classes', () => {
    const wrapper = mount(Navbar, {
      props: {
        showMobileMenu: true,
      },
      slots: {
        menu: '<ul class="menu-items">Menu</ul>',
      },
    })

    // Should have responsive utility classes
    expect(wrapper.find('.navbar').exists()).toBe(true)
    expect(wrapper.classes()).toContain('navbar')
  })

  it('applies glass effect correctly', () => {
    const wrapper = mount(Navbar, {
      props: {
        variant: 'glass',
      },
    })

    expect(wrapper.classes()).toContain('glass')
    expect(wrapper.classes()).toContain('backdrop-blur')
  })
})
