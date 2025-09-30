<template>
<footer :class="footerClasses">
    <slot>
        <div
            v-if="showBranding"
            class="footer-branding"
        >
            <div class="flex items-center gap-3">
                <img
                    v-if="logo"
                    :src="logo"
                    :alt="logoAlt"
                    class="h-8 w-auto"
                >
                <div>
                    <p
                        v-if="brandName"
                        class="font-bold text-lg"
                    >
                        {{ brandName }}
                    </p>
                    <p
                        v-if="brandDescription"
                        class="text-sm opacity-70"
                    >
                        {{ brandDescription }}
                    </p>
                </div>
            </div>
        </div>

        <div
            v-if="links && links.length > 0"
            class="footer-links"
        >
            <div
                v-for="section in links"
                :key="section.title"
                class="footer-section"
            >
                <h3
                    v-if="section.title"
                    class="footer-title"
                >
                    {{ section.title }}
                </h3>
                <nav class="flex flex-col gap-1">
                    <a
                        v-for="link in section.items"
                        :key="link.label"
                        :href="link.href"
                        :target="link.external ? '_blank' : undefined"
                        :rel="link.external ? 'noopener noreferrer' : undefined"
                        class="link link-hover"
                    >
                        {{ link.label }}
                    </a>
                </nav>
            </div>
        </div>

        <div
            v-if="social && social.length > 0"
            class="footer-social"
        >
            <div class="grid grid-flow-col gap-4">
                <a
                    v-for="item in social"
                    :key="item.name"
                    :href="item.href"
                    :aria-label="item.name"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link"
                >
                    <span
                        v-if="item.icon"
                        v-html="item.icon"
                    />
                    <span v-else>{{ item.name }}</span>
                </a>
            </div>
        </div>
    </slot>

    <div
        v-if="showCopyright"
        class="footer-center"
    >
        <aside class="text-center">
            <p class="text-sm opacity-70">
                {{ copyrightText }}
            </p>
        </aside>
    </div>
</footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FooterLink {
    label: string
    href: string
    external?: boolean
}

interface FooterSection {
    title: string
    items: FooterLink[]
}

interface SocialLink {
    name: string
    href: string
    icon?: string
}

interface Props {
    variant?: 'default' | 'center' | 'grid'
    brandName?: string
    brandDescription?: string
    logo?: string
    logoAlt?: string
    links?: FooterSection[]
    social?: SocialLink[]
    showBranding?: boolean
    showCopyright?: boolean
    copyrightText?: string
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    logoAlt: 'Brand logo',
    showBranding: true,
    showCopyright: true,
    copyrightText: `© ${new Date().getFullYear()} - All rights reserved`,
})

const footerClasses = computed(() => {
    const baseClasses = ['footer', 'p-10', 'bg-base-200', 'text-base-content']

    // Variant classes
    if (props.variant === 'center') {
        baseClasses.push('footer-center')
    }
    else if (props.variant === 'grid') {
        baseClasses.push('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-8')
    }

    return baseClasses.join(' ')
})
</script>

<style scoped lang="postcss">
/* DaisyUI handles most footer styling */
.footer-section {
  @apply space-y-2;
}

.footer-title {
  @apply font-semibold text-base-content mb-3;
}

.footer-branding {
  @apply col-span-1 md:col-span-2 lg:col-span-1;
}

.footer-links {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-auto gap-8 col-span-full lg:col-span-2;
}

.footer-social {
  @apply col-span-1;
}

.footer-center {
  @apply col-span-full border-t border-base-300 pt-6 mt-6;
}
</style>
