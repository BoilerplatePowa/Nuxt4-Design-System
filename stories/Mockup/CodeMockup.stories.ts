import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CodeMockup from '../../src/runtime/components/Mockup/CodeMockup.vue'

const meta: Meta<typeof CodeMockup> = {
    title: 'Mockup/CodeMockup',
    component: CodeMockup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Code mockup component for displaying code blocks with terminal-like styling. Supports line prefixes, highlighting, and multiple color variants.'
            }
        }
    },
    argTypes: {
        code: {
            control: { type: 'text' },
            description: 'Code content as string or array of CodeLine objects'
        },
        variant: {
            control: { type: 'select' },
            options: ['default', 'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
            description: 'DaisyUI color variant'
        },
        language: {
            control: { type: 'text' },
            description: 'Language for syntax highlighting'
        },
        showLineNumbers: {
            control: { type: 'boolean' },
            description: 'Show line numbers as prefix'
        },
        class: {
            control: { type: 'text' },
            description: 'Custom CSS classes'
        }
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        code: 'npm i daisyui',
    },
}

export const WithPrefix: Story = {
    args: {
        code: [
            { content: 'npm i daisyui', prefix: '$' },
            { content: 'installing...', prefix: '>', color: 'warning' },
            { content: 'Done!', prefix: '>', color: 'success' }
        ],
    },
}

export const MultiLine: Story = {
    args: {
        code: [
            { content: 'npm i daisyui', prefix: '$' },
            { content: 'installing...', prefix: '>', color: 'warning' },
            { content: 'Done!', prefix: '>', color: 'success' }
        ],
    },
}

export const HighlightedLine: Story = {
    args: {
        code: [
            { content: 'npm i daisyui', prefix: '1' },
            { content: 'installing...', prefix: '2' },
            { content: 'Error!', prefix: '3', highlight: true, color: 'warning' }
        ],
    },
}

export const LongLine: Story = {
    args: {
        code: 'Magnam dolore beatae necessitatibus nemopsum itaque sit. Et porro quae qui et et dolore ratione.',
    },
}

export const WithoutPrefix: Story = {
    args: {
        code: 'without prefix',
    },
}

export const WithColor: Story = {
    args: {
        code: 'can be any color!',
        variant: 'primary',
    },
}

export const TerminalExample: Story = {
    args: {
        code: [
            { content: 'npm install @nuxt-design-system/core', prefix: '$' },
            { content: 'installing packages...', prefix: '>', color: 'info' },
            { content: 'added 1 package', prefix: '>', color: 'success' },
            { content: 'Done in 2.3s', prefix: '>', color: 'success' }
        ],
    },
}

export const ErrorExample: Story = {
    args: {
        code: [
            { content: 'npm run build', prefix: '$' },
            { content: 'Building project...', prefix: '>' },
            { content: 'Error: Module not found', prefix: '>', highlight: true, color: 'error' },
            { content: 'Build failed', prefix: '>', color: 'error' }
        ],
    },
}

export const GitExample: Story = {
    args: {
        code: [
            { content: 'git status', prefix: '$' },
            { content: 'On branch main', prefix: '>' },
            { content: 'Changes not staged for commit:', prefix: '>', color: 'warning' },
            { content: '  modified: src/components/Button.vue', prefix: '>' },
            { content: '  modified: src/stores/theme.ts', prefix: '>' }
        ],
    },
}

export const TypeScript: Story = {
    args: {
        language: 'typescript',
        code: `interface User {
  id: number
  name: string
  email: string
  isActive: boolean
}

class UserService {
  private users: User[] = []
  
  addUser(user: User): void {
    this.users.push(user)
  }
  
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id)
  }
  
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive)
  }
}`,
    },
}

export const HTML: Story = {
    args: {
        language: 'html',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Vue App</title>
</head>
<body>
  <div id="app">
    <header class="navbar">
      <h1>{{ title }}</h1>
    </header>
    
    <main class="container">
      <section v-for="item in items" :key="item.id">
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
      </section>
    </main>
  </div>
  
  <script src="/src/main.js"></script>
</body>
</html>`,
    },
}

export const CSS: Story = {
    args: {
        language: 'css',
        code: `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 0 0.5rem;
  }
}`,
    },
}

export const Variants: Story = {
    render: () => ({
        components: { CodeMockup },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <CodeMockup 
            language="python"
            :code="\`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))\`"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Border</h3>
          <CodeMockup 
            variant="border"
            language="sql"
            :code="\`SELECT users.name, COUNT(orders.id) as order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE users.created_at >= '2024-01-01'
GROUP BY users.id, users.name
ORDER BY order_count DESC;\`"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Background</h3>
          <CodeMockup 
            variant="bg"
            language="bash"
            :code="\`# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test\`"
          />
        </div>
      </div>
    `,
    }),
}

export const WithLineNumbers: Story = {
    args: {
        language: 'vue',
        showLineNumbers: true,
        code: `<template>
  <div class="user-profile">
    <img :src="user.avatar" :alt="user.name" class="avatar" />
    <div class="user-info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <badge :variant="user.status">{{ user.status }}</badge>
    </div>
    <button @click="toggleFollow" :class="buttonClass">
      {{ isFollowing ? 'Unfollow' : 'Follow' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Badge from './Badge.vue'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  status: 'online' | 'offline' | 'away'
}

const props = defineProps<{
  user: User
}>()

const isFollowing = ref(false)

const buttonClass = computed(() => ({
  'btn': true,
  'btn-primary': !isFollowing.value,
  'btn-outline': isFollowing.value
}))

function toggleFollow() {
  isFollowing.value = !isFollowing.value
}
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}
</style>`,
    },
}

export const MultipleLanguages: Story = {
    render: () => ({
        components: { CodeMockup },
        template: `
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-bold mb-4">Frontend (Vue)</h3>
            <CodeMockup 
              language="vue"
              :code="\`<template>
  <div class="todo-app">
    <input 
      v-model="newTodo" 
      @keyup.enter="addTodo"
      placeholder="Add a todo..."
    />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todos = ref([])
const newTodo = ref('')

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value
    })
    newTodo.value = ''
  }
}
</script>\`"
            />
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">Backend (Node.js)</h3>
            <CodeMockup 
              language="javascript"
              :code="\`const express = require('express')
const app = express()

app.use(express.json())

let todos = []

app.get('/api/todos', (req, res) => {
  res.json(todos)
})

app.post('/api/todos', (req, res) => {
  const todo = {
    id: Date.now(),
    text: req.body.text,
    completed: false
  }
  todos.push(todo)
  res.status(201).json(todo)
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})\`"
            />
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Database (SQL)</h3>
          <CodeMockup 
            language="sql"
            variant="border"
            :code="\`CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_todos_completed ON todos(completed);

INSERT INTO todos (text) VALUES 
  ('Learn Vue 3'),
  ('Build a todo app'),
  ('Deploy to production');\`"
          />
        </div>
      </div>
    `,
    }),
}

export const AllVariants: Story = {
    render: () => ({
        components: { CodeMockup },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <CodeMockup code="npm i daisyui" />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Prefix</h3>
          <CodeMockup 
            :code="[
              { content: 'npm i daisyui', prefix: '$' },
              { content: 'installing...', prefix: '>', color: 'warning' },
              { content: 'Done!', prefix: '>', color: 'success' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Highlighted Line</h3>
          <CodeMockup 
            :code="[
              { content: 'npm i daisyui', prefix: '1' },
              { content: 'installing...', prefix: '2' },
              { content: 'Error!', prefix: '3', highlight: true, color: 'warning' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Primary Color</h3>
          <CodeMockup 
            code="can be any color!"
            variant="primary"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Success Color</h3>
          <CodeMockup 
            code="Build successful!"
            variant="success"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Warning Color</h3>
          <CodeMockup 
            code="Warning: Deprecated API"
            variant="warning"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Error Color</h3>
          <CodeMockup 
            code="Error: Build failed"
            variant="error"
          />
        </div>
      </div>
    `,
    }),
}

export const InteractiveExample: Story = {
    render: () => ({
        components: { CodeMockup },
        template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-bold mb-4">Terminal Session</h3>
          <CodeMockup 
            :code="[
              { content: 'cd my-project', prefix: '$' },
              { content: 'npm install', prefix: '$' },
              { content: 'installing dependencies...', prefix: '>', color: 'info' },
              { content: 'added 1,234 packages', prefix: '>', color: 'success' },
              { content: 'npm run dev', prefix: '$' },
              { content: 'Starting development server...', prefix: '>', color: 'info' },
              { content: 'Server running on http://localhost:3000', prefix: '>', color: 'success' }
            ]"
          />
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">Git Workflow</h3>
          <CodeMockup 
            :code="[
              { content: 'git add .', prefix: '$' },
              { content: 'git commit -m "feat: add new component"', prefix: '$' },
              { content: 'git push origin main', prefix: '$' },
              { content: 'Pushing to origin/main...', prefix: '>', color: 'info' },
              { content: 'Branch pushed successfully', prefix: '>', color: 'success' }
            ]"
          />
        </div>
      </div>
    `,
    }),
}
