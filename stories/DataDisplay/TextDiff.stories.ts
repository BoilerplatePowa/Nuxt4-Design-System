import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TextDiff from '../../src/runtime/components/DataDisplay/TextDiff.vue'

const meta: Meta<typeof TextDiff> = {
  title: 'Data Display/TextDiff',
  component: TextDiff,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['unified', 'split'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showHeader: {
      control: { type: 'boolean' },
    },
    showStats: {
      control: { type: 'boolean' },
    },
    showLineNumbers: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOldText = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`

const sampleNewText = `function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}`

export const Default: Story = {
  args: {
    oldText: sampleOldText,
    newText: sampleNewText,
    oldFileName: 'calculator.js',
    newFileName: 'calculator.js',
  },
}

export const UnifiedMode: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        oldCode: `import React from 'react';

function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;`,
        newCode: `import React from 'react';
import { useState } from 'react';

function Button({ children, onClick, variant = 'primary' }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    await onClick?.();
    setIsLoading(false);
  };
  
  return (
    <button 
      className={\`btn btn-\${variant}\`} 
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default Button;`,
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-bold mb-4">Unified Diff View</h3>
        <TextDiff 
          :old-text="oldCode"
          :new-text="newCode"
          old-file-name="Button.jsx"
          new-file-name="Button.jsx"
          mode="unified"
        />
      </div>
    `,
  }),
}

export const SplitMode: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        oldConfig: `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}`,
        newConfig: `{
  "name": "my-app",
  "version": "1.1.0",
  "scripts": {
    "start": "node server.js",
    "build": "webpack --mode=production",
    "test": "jest --coverage"
  },
  "dependencies": {
    "express": "^4.18.0",
    "webpack": "^5.70.0"
  }
}`,
      }
    },
    template: `
      <div class="max-w-6xl">
        <h3 class="text-lg font-bold mb-4">Split Diff View</h3>
        <TextDiff 
          :old-text="oldConfig"
          :new-text="newConfig"
          old-file-name="package.json"
          new-file-name="package.json"
          mode="split"
        />
      </div>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        oldCode: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
        newCode: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]`,
        actions: [
          { label: 'Apply', variant: 'primary', size: 'sm' },
          { label: 'Reject', variant: 'outline', size: 'sm' },
          { label: 'Comment', variant: 'ghost', size: 'sm' },
        ],
      }
    },
    methods: {
      handleActionClick(action: { label: string }, _event: Event) {
        console.log('Action clicked:', action.label)
        alert(`${action.label} clicked!`)
      },
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-bold mb-4">Code Review Diff</h3>
        <TextDiff 
          :old-text="oldCode"
          :new-text="newCode"
          old-file-name="fibonacci.py"
          new-file-name="fibonacci.py"
          :actions="actions"
          @action-click="handleActionClick"
        />
      </div>
    `,
  }),
}

export const CustomDiffLines: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        customUnifiedLines: [
          {
            content: '@@ -1,8 +1,9 @@',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '@@',
          },
          {
            content: 'class UserService {',
            type: 'context',
            oldLineNumber: 1,
            newLineNumber: 1,
            prefix: ' ',
          },
          {
            content: '  constructor() {',
            type: 'removed',
            oldLineNumber: 2,
            newLineNumber: null,
            prefix: '-',
          },
          {
            content: '  constructor(apiClient) {',
            type: 'added',
            oldLineNumber: null,
            newLineNumber: 2,
            prefix: '+',
          },
          {
            content: '    this.apiClient = apiClient;',
            type: 'added',
            oldLineNumber: null,
            newLineNumber: 3,
            prefix: '+',
          },
          {
            content: '    this.users = [];',
            type: 'context',
            oldLineNumber: 3,
            newLineNumber: 4,
            prefix: ' ',
          },
          {
            content: '  }',
            type: 'context',
            oldLineNumber: 4,
            newLineNumber: 5,
            prefix: ' ',
          },
          {
            content: '',
            type: 'context',
            oldLineNumber: 5,
            newLineNumber: 6,
            prefix: ' ',
          },
          {
            content: '  async getUser(id) {',
            type: 'context',
            oldLineNumber: 6,
            newLineNumber: 7,
            prefix: ' ',
          },
          {
            content: '    return this.users.find(u => u.id === id);',
            type: 'removed',
            oldLineNumber: 7,
            newLineNumber: null,
            prefix: '-',
          },
          {
            content: '    return await this.apiClient.get(`/users/${id}`);',
            type: 'added',
            oldLineNumber: null,
            newLineNumber: 8,
            prefix: '+',
          },
          {
            content: '  }',
            type: 'context',
            oldLineNumber: 8,
            newLineNumber: 9,
            prefix: ' ',
          },
          {
            content: '}',
            type: 'context',
            oldLineNumber: 9,
            newLineNumber: 10,
            prefix: ' ',
          },
        ],
      }
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-bold mb-4">Custom Diff Lines</h3>
        <TextDiff 
          :unified-lines="customUnifiedLines"
          old-file-name="UserService.js"
          new-file-name="UserService.js"
          mode="unified"
        />
      </div>
    `,
  }),
}

export const NoHeader: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        oldSnippet: `const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];`,
        newSnippet: `const users = [
  { id: 1, name: 'John', active: true },
  { id: 2, name: 'Jane', active: false },
  { id: 3, name: 'Bob', active: true }
];`,
      }
    },
    template: `
      <div class="max-w-3xl">
        <h3 class="text-lg font-bold mb-4">Minimal Diff (No Header)</h3>
        <TextDiff 
          :old-text="oldSnippet"
          :new-text="newSnippet"
          :show-header="false"
          size="sm"
        />
      </div>
    `,
  }),
}

export const LargeDiff: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        oldDocument: `# Project Documentation

## Getting Started

To get started with this project:

1. Clone the repository
2. Install dependencies: npm install
3. Start the server: npm start

## Configuration

Edit the config.json file to customize settings.

## API Endpoints

- GET /api/users - Get all users
- POST /api/users - Create a user
- GET /api/users/:id - Get a specific user

## Contributing

Please read our contributing guidelines before submitting PRs.`,
        newDocument: `# Project Documentation

## Getting Started

To get started with this project:

1. Clone the repository
2. Install dependencies: \`npm install\`
3. Copy environment file: \`cp .env.example .env\`
4. Start the development server: \`npm run dev\`

## Configuration

Edit the \`.env\` file to customize environment-specific settings.
For advanced configuration, see \`config/settings.js\`.

## API Endpoints

### Users
- GET /api/v1/users - Get all users (paginated)
- POST /api/v1/users - Create a user
- GET /api/v1/users/:id - Get a specific user
- PUT /api/v1/users/:id - Update a user
- DELETE /api/v1/users/:id - Delete a user

### Authentication
- POST /api/v1/auth/login - User login
- POST /api/v1/auth/logout - User logout

## Testing

Run tests with: \`npm test\`
For coverage: \`npm run test:coverage\`

## Contributing

Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.
Make sure to run \`npm run lint\` before committing.`,
      }
    },
    template: `
      <div class="max-w-5xl">
        <h3 class="text-lg font-bold mb-4">Large Document Diff</h3>
        <div class="max-h-96 overflow-auto">
          <TextDiff 
            :old-text="oldDocument"
            :new-text="newDocument"
            old-file-name="README.md"
            new-file-name="README.md"
            mode="unified"
          />
        </div>
      </div>
    `,
  }),
}

export const GitStyleDiff: Story = {
  render: () => ({
    components: { TextDiff },
    data() {
      return {
        gitDiffLines: [
          {
            content: 'diff --git a/src/utils.js b/src/utils.js',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '',
          },
          {
            content: 'index 1234567..abcdefg 100644',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '',
          },
          {
            content: '--- a/src/utils.js',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '',
          },
          {
            content: '+++ b/src/utils.js',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '',
          },
          {
            content: '@@ -15,7 +15,8 @@ export function formatDate(date) {',
            type: 'info',
            oldLineNumber: null,
            newLineNumber: null,
            prefix: '@@',
          },
          {
            content: '  if (!date) return null;',
            type: 'context',
            oldLineNumber: 15,
            newLineNumber: 15,
            prefix: ' ',
          },
          {
            content: '  ',
            type: 'context',
            oldLineNumber: 16,
            newLineNumber: 16,
            prefix: ' ',
          },
          {
            content: '  return date.toLocaleDateString();',
            type: 'removed',
            oldLineNumber: 17,
            newLineNumber: null,
            prefix: '-',
          },
          {
            content: "  const options = { year: 'numeric', month: 'long', day: 'numeric' };",
            type: 'added',
            oldLineNumber: null,
            newLineNumber: 17,
            prefix: '+',
          },
          {
            content: "  return date.toLocaleDateString('en-US', options);",
            type: 'added',
            oldLineNumber: null,
            newLineNumber: 18,
            prefix: '+',
          },
          {
            content: '}',
            type: 'context',
            oldLineNumber: 18,
            newLineNumber: 19,
            prefix: ' ',
          },
        ],
        actions: [
          { label: 'Stage', variant: 'primary', size: 'sm' },
          { label: 'Discard', variant: 'outline', size: 'sm' },
          { label: 'Stash', variant: 'ghost', size: 'sm' },
        ],
      }
    },
    methods: {
      handleActionClick(action: { label: string }, _event: Event) {
        console.log('Git action:', action.label)
        alert(`Git ${action.label.toLowerCase()} performed!`)
      },
    },
    template: `
      <div class="max-w-4xl">
        <h3 class="text-lg font-bold mb-4">Git-style Diff</h3>
        <TextDiff 
          :unified-lines="gitDiffLines"
          old-file-name="src/utils.js"
          new-file-name="src/utils.js"
          :actions="actions"
          mode="unified"
          @action-click="handleActionClick"
        />
      </div>
    `,
  }),
}
