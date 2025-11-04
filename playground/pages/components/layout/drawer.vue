<template>
    <div class="min-h-screen bg-base-100">
        <div class="container mx-auto px-4 py-8">
            <div class="text-sm breadcrumbs mb-6">
                <ul>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/components">Components</NuxtLink></li>
                    <li><NuxtLink to="/components/layout">Layout</NuxtLink></li>
                    <li>Drawer</li>
                </ul>
            </div>

            <div class="mb-12">
                <h1 class="text-5xl font-bold mb-4">Drawer</h1>
                <p class="text-xl text-base-content/70 max-w-3xl">
                    A responsive sidebar layout component that slides in from the side. Perfect for
                    navigation menus, settings panels, and content drawers. Supports both default
                    and sidebar modes with full customization.
                </p>
            </div>

            <!-- Basic Example -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Basic Example</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            Simple drawer with toggle button. Click the button to open/close the
                            drawer.
                        </p>
                        <div class="drawer">
                            <input id="basic-drawer" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <label for="basic-drawer" class="btn btn-primary"
                                    >Open Drawer</label
                                >
                            </div>
                            <div class="drawer-side">
                                <label
                                    for="basic-drawer"
                                    aria-label="close sidebar"
                                    class="drawer-overlay"
                                ></label>
                                <ul class="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
                                    <li><a>Dashboard</a></li>
                                    <li><a>Reports</a></li>
                                    <li><a>Settings</a></li>
                                    <li><a>Support</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Right Position -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Right Position</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            Drawer positioned on the right side using the
                            <code>drawer-end</code> class.
                        </p>
                        <div class="drawer drawer-end">
                            <input id="right-drawer" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <label for="right-drawer" class="btn btn-secondary"
                                    >Open Right Drawer</label
                                >
                            </div>
                            <div class="drawer-side">
                                <label
                                    for="right-drawer"
                                    aria-label="close sidebar"
                                    class="drawer-overlay"
                                ></label>
                                <ul class="menu p-4 w-64 min-h-full bg-base-100 text-base-content">
                                    <li><a>Profile</a></li>
                                    <li><a>Notifications</a></li>
                                    <li><a>Messages</a></li>
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- With Custom Content -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Custom Content</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            Drawer with custom content including header, body, and footer sections.
                        </p>
                        <div class="drawer">
                            <input id="custom-drawer" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <label for="custom-drawer" class="btn btn-accent"
                                    >Open Custom Drawer</label
                                >
                            </div>
                            <div class="drawer-side">
                                <label
                                    for="custom-drawer"
                                    aria-label="close sidebar"
                                    class="drawer-overlay"
                                ></label>
                                <div class="p-4 w-80 min-h-full bg-base-100 text-base-content">
                                    <!-- Header -->
                                    <div class="flex items-center justify-between mb-6">
                                        <h3 class="text-lg font-semibold">Settings</h3>
                                        <label for="custom-drawer" class="btn btn-ghost btn-sm"
                                            >✕</label
                                        >
                                    </div>

                                    <!-- Body -->
                                    <div class="space-y-4">
                                        <div class="form-control">
                                            <label class="label">
                                                <span class="label-text">Theme</span>
                                            </label>
                                            <select class="select select-bordered">
                                                <option>Light</option>
                                                <option>Dark</option>
                                                <option>Auto</option>
                                            </select>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Notifications</span>
                                                <input type="checkbox" class="toggle" checked />
                                            </label>
                                        </div>

                                        <div class="form-control">
                                            <label class="label cursor-pointer">
                                                <span class="label-text">Email Updates</span>
                                                <input type="checkbox" class="toggle" />
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Footer -->
                                    <div class="mt-8 pt-4 border-t border-base-300">
                                        <div class="flex gap-2">
                                            <button class="btn btn-primary btn-sm flex-1">
                                                Save
                                            </button>
                                            <button class="btn btn-ghost btn-sm flex-1">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Persistent Drawer -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Persistent Drawer</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            A drawer that stays open and doesn't close when clicking outside.
                            Perfect for navigation sidebars.
                        </p>
                        <div class="drawer drawer-open">
                            <input
                                id="persistent-drawer"
                                type="checkbox"
                                class="drawer-toggle"
                                checked
                            />
                            <div class="drawer-content">
                                <div class="p-4">
                                    <h3 class="text-lg font-semibold mb-2">Main Content</h3>
                                    <p class="text-base-content/70">
                                        This content area is always visible. The drawer stays open.
                                    </p>
                                </div>
                            </div>
                            <div class="drawer-side">
                                <div class="p-4 w-64 min-h-full bg-base-100 text-base-content">
                                    <h3 class="text-lg font-semibold mb-4">Navigation</h3>
                                    <ul class="menu">
                                        <li><a class="active">Dashboard</a></li>
                                        <li><a>Analytics</a></li>
                                        <li><a>Users</a></li>
                                        <li><a>Settings</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Sidebar Mode -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Sidebar Mode</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            Sidebar mode creates a collapsible navigation sidebar with a toggle
                            button. Perfect for admin dashboards and applications with complex
                            navigation.
                        </p>
                        <BpDrawer
                            mode="sidebar"
                            :items="[
                                { label: 'Dashboard', icon: 'home', href: '/' },
                                { label: 'Users', icon: 'users', href: '/users' },
                                { label: 'Analytics', icon: 'chart', href: '/analytics' },
                                { label: 'Settings', icon: 'settings', href: '/settings' },
                            ]"
                        ></BpDrawer>
                    </div>
                </div>
            </section>

            <!-- Collapsible Sidebar -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Collapsible Sidebar</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <p class="text-sm text-base-content/70 mb-4">
                            A sidebar that can be collapsed to show only icons, perfect for
                            space-constrained layouts.
                        </p>
                        <div class="drawer">
                            <input id="collapsible-sidebar" type="checkbox" class="drawer-toggle" />
                            <div class="drawer-content">
                                <div class="p-4">
                                    <div class="flex items-center gap-4 mb-4">
                                        <label for="collapsible-sidebar" class="btn btn-primary">
                                            <svg
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                ></path>
                                            </svg>
                                            Toggle Sidebar
                                        </label>
                                        <h3 class="text-lg font-semibold">Application</h3>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div class="card bg-base-100 shadow">
                                            <div class="card-body">
                                                <h4 class="card-title">Recent Activity</h4>
                                                <div class="space-y-2">
                                                    <div class="flex items-center gap-2 text-sm">
                                                        <div
                                                            class="w-2 h-2 bg-success rounded-full"
                                                        ></div>
                                                        User login successful
                                                    </div>
                                                    <div class="flex items-center gap-2 text-sm">
                                                        <div
                                                            class="w-2 h-2 bg-info rounded-full"
                                                        ></div>
                                                        New order received
                                                    </div>
                                                    <div class="flex items-center gap-2 text-sm">
                                                        <div
                                                            class="w-2 h-2 bg-warning rounded-full"
                                                        ></div>
                                                        System update available
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card bg-base-100 shadow">
                                            <div class="card-body">
                                                <h4 class="card-title">Quick Actions</h4>
                                                <div class="flex flex-wrap gap-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        New User
                                                    </button>
                                                    <button class="btn btn-sm btn-secondary">
                                                        Generate Report
                                                    </button>
                                                    <button class="btn btn-sm btn-accent">
                                                        Send Notification
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="drawer-side">
                                <div class="p-4 w-64 min-h-full bg-base-100 text-base-content">
                                    <div class="flex items-center justify-between mb-6">
                                        <h3 class="text-lg font-semibold">Navigation</h3>
                                        <label
                                            for="collapsible-sidebar"
                                            class="btn btn-ghost btn-sm"
                                        >
                                            <svg
                                                class="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                ></path>
                                            </svg>
                                        </label>
                                    </div>
                                    <ul class="menu">
                                        <li>
                                            <a class="active">
                                                <svg
                                                    class="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                                    ></path>
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                                                    ></path>
                                                </svg>
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <details>
                                                <summary>
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        ></path>
                                                    </svg>
                                                    Users
                                                </summary>
                                                <ul>
                                                    <li><a>All Users</a></li>
                                                    <li><a>Add User</a></li>
                                                    <li><a>User Roles</a></li>
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <details>
                                                <summary>
                                                    <svg
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        ></path>
                                                    </svg>
                                                    Reports
                                                </summary>
                                                <ul>
                                                    <li><a>Sales Report</a></li>
                                                    <li><a>User Report</a></li>
                                                    <li><a>Analytics</a></li>
                                                </ul>
                                            </details>
                                        </li>
                                        <li>
                                            <a>
                                                <svg
                                                    class="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                    ></path>
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Component API -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Component API</h2>
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body">
                        <h3 class="text-xl font-semibold mb-4">Props</h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Prop</th>
                                        <th>Type</th>
                                        <th>Default</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>mode</code></td>
                                        <td><code>'default' | 'sidebar'</code></td>
                                        <td><code>'default'</code></td>
                                        <td>
                                            Display mode - default for overlays, sidebar for
                                            persistent navigation
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>position</code></td>
                                        <td><code>'left' | 'right'</code></td>
                                        <td><code>'left'</code></td>
                                        <td>Position of the drawer</td>
                                    </tr>
                                    <tr>
                                        <td><code>width</code></td>
                                        <td><code>'sm' | 'md' | 'lg' | 'xl' | 'full'</code></td>
                                        <td><code>'md'</code></td>
                                        <td>Width of the drawer</td>
                                    </tr>
                                    <tr>
                                        <td><code>backdrop</code></td>
                                        <td><code>boolean</code></td>
                                        <td><code>true</code></td>
                                        <td>Show backdrop overlay</td>
                                    </tr>
                                    <tr>
                                        <td><code>persistent</code></td>
                                        <td><code>boolean</code></td>
                                        <td><code>false</code></td>
                                        <td>Prevent closing on backdrop click</td>
                                    </tr>
                                    <tr>
                                        <td><code>showCloseButton</code></td>
                                        <td><code>boolean</code></td>
                                        <td><code>true</code></td>
                                        <td>Show close button in drawer</td>
                                    </tr>
                                    <tr>
                                        <td><code>forceOpen</code></td>
                                        <td><code>boolean</code></td>
                                        <td><code>false</code></td>
                                        <td>Force drawer to stay open</td>
                                    </tr>
                                    <tr>
                                        <td><code>items</code></td>
                                        <td><code>MenuItem[]</code></td>
                                        <td><code>[]</code></td>
                                        <td>Menu items for built-in navigation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 class="text-xl font-semibold mb-4 mt-8">Slots</h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Slot</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>content</code></td>
                                        <td>Main content area (drawer content)</td>
                                    </tr>
                                    <tr>
                                        <td><code>top</code></td>
                                        <td>Top section of the drawer</td>
                                    </tr>
                                    <tr>
                                        <td><code>bottom</code></td>
                                        <td>Bottom section of the drawer</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 class="text-xl font-semibold mb-4 mt-8">Events</h3>
                        <div class="overflow-x-auto">
                            <table class="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>@open</code></td>
                                        <td>Emitted when drawer opens</td>
                                    </tr>
                                    <tr>
                                        <td><code>@close</code></td>
                                        <td>Emitted when drawer closes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Usage Examples -->
            <section class="mb-16">
                <h2 class="text-3xl font-bold mb-6">Usage Examples</h2>
                <div class="grid gap-6">
                    <!-- Basic Usage -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-2">Basic Usage</h3>
                            <div class="mockup-code">
                                <pre><code>&lt;template&gt;
  &lt;Drawer v-model="isOpen"&gt;
    &lt;template #content&gt;
      &lt;button class="btn" @click="isOpen = !isOpen"&gt;
        Toggle Drawer
      &lt;/button&gt;
    &lt;/template&gt;
  &lt;/Drawer&gt;
&lt;/template&gt;

&lt;script setup&gt;
const isOpen = ref(false)
&lt;/script&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <!-- With Menu Items -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-2">With Menu Items</h3>
                            <div class="mockup-code">
                                <pre><code>&lt;template&gt;
  &lt;Drawer 
    v-model="isOpen" 
    :items="menuItems"
    position="right"
    width="lg"
  &gt;
    &lt;template #content&gt;
      &lt;button class="btn" @click="isOpen = !isOpen"&gt;
        Open Menu
      &lt;/button&gt;
    &lt;/template&gt;
  &lt;/Drawer&gt;
&lt;/template&gt;

&lt;script setup&gt;
const isOpen = ref(false)
const menuItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'About', icon: 'info', href: '/about' },
  { label: 'Contact', icon: 'mail', href: '/contact' }
]
&lt;/script&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <!-- Sidebar Mode -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-2">Sidebar Mode</h3>
                            <div class="mockup-code">
                                <pre><code>&lt;template&gt;
  &lt;Drawer 
    v-model="isOpen" 
    mode="sidebar"
    :items="navItems"
    persistent
  &gt;
    &lt;template #content&gt;
      &lt;div class="p-4"&gt;
        &lt;h1&gt;Main Content&lt;/h1&gt;
        &lt;p&gt;Your page content here&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Drawer&gt;
&lt;/template&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                    <!-- Advanced Sidebar with User Profile -->
                    <div class="card bg-base-200 shadow-xl">
                        <div class="card-body">
                            <h3 class="text-lg font-semibold mb-2">
                                Advanced Sidebar with User Profile
                            </h3>
                            <div class="mockup-code">
                                <pre><code>&lt;template&gt;
  &lt;Drawer 
    v-model="isOpen" 
    mode="sidebar"
    position="left"
    width="lg"
    :items="menuItems"
    persistent
  &gt;
    &lt;template #content&gt;
      &lt;div class="p-4"&gt;
        &lt;div class="flex items-center justify-between mb-4"&gt;
          &lt;h1 class="text-2xl font-bold"&gt;Dashboard&lt;/h1&gt;
          &lt;button @click="isOpen = !isOpen" class="btn btn-ghost"&gt;
            &lt;svg class="w-5 h-5"&gt;...&lt;/svg&gt;
          &lt;/button&gt;
        &lt;/div&gt;
        &lt;!-- Main content --&gt;
      &lt;/div&gt;
    &lt;/template&gt;
    
    &lt;template #top&gt;
      &lt;div class="p-4 border-b"&gt;
        &lt;h2 class="text-lg font-semibold"&gt;Admin Panel&lt;/h2&gt;
      &lt;/div&gt;
    &lt;/template&gt;
    
    &lt;template #bottom&gt;
      &lt;div class="p-4 border-t"&gt;
        &lt;div class="flex items-center gap-3"&gt;
          &lt;div class="avatar"&gt;
            &lt;div class="w-8 rounded-full"&gt;
              &lt;img :src="user.avatar" :alt="user.name"&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div&gt;
            &lt;div class="text-sm font-medium"&gt;{{ user.name }}&lt;/div&gt;
            &lt;div class="text-xs text-base-content/70"&gt;{{ user.role }}&lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Drawer&gt;
&lt;/template&gt;

&lt;script setup&gt;
const isOpen = ref(true)
const user = ref({
  name: 'John Doe',
  role: 'Administrator',
  avatar: '/avatar.jpg'
})

const menuItems = [
  { label: 'Dashboard', icon: 'home', href: '/' },
  { label: 'Users', icon: 'users', href: '/users' },
  { label: 'Analytics', icon: 'chart', href: '/analytics' },
  { label: 'Settings', icon: 'cog', href: '/settings' }
]
&lt;/script&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mb-16">
                <div class="card bg-base-200 shadow-xl">
                    <div class="card-body text-center">
                        <h2 class="card-title text-2xl justify-center mb-4">Explore More</h2>
                        <div class="card-actions justify-center">
                            <NuxtLink to="/components/layout" class="btn btn-primary">
                                <ArrowLeft class="w-4 h-4 mr-2" /> Back to Layout
                            </NuxtLink>
                            <NuxtLink to="/components" class="btn btn-outline">
                                <Grid class="w-4 h-4 mr-2" /> All Components
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Grid } from 'lucide-vue-next'
definePageMeta({ title: 'Drawer', description: 'Drawer layout examples' })

// Define user for template usage
const user = ref({
    name: 'John Doe',
    role: 'Administrator',
    avatar: '/avatar.jpg',
})

function setTheme(theme: string) {
    if (import.meta.client) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('@nuxt-design-system/theme', theme)
    }
}

onMounted(() => {
    if (import.meta.client) {
        const savedTheme = localStorage.getItem('@nuxt-design-system/theme') || 'light'
        setTheme(savedTheme)
    }
})
</script>
