import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ChatBubble from '../../src/runtime/components/DataDisplay/ChatBubble.vue'

const meta: Meta<typeof ChatBubble> = {
  title: 'Data Display/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Chat message bubble component with sender positioning and styling options.',
      },
    },
  },
  argTypes: {
    message: {
      control: 'text',
      description: 'The chat message content',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Message position (left for others, right for user)',
    },
    name: {
      control: 'text',
      description: 'Sender name',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Chat bubble size',
    },
    avatar: {
      control: 'text',
      description: 'Avatar image URL',
    },
    timestamp: {
      control: 'text',
      description: 'Message timestamp',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'],
      description: 'Chat bubble color variant',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: 'Hello! How are you doing today?',
    position: 'left',
  },
}

export const UserMessage: Story = {
  args: {
    message: 'I am doing great, thanks for asking!',
    position: 'right',
  },
}

export const WithAvatar: Story = {
  args: {
    message: 'Hey there! Nice to meet you.',
    position: 'left',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
  },
}

export const WithTimestamp: Story = {
  args: {
    message: 'This message has a timestamp',
    position: 'right',
    timestamp: '2:30 PM',
  },
}

export const ColorVariants: Story = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div class="space-y-4 max-w-md">
        <ChatBubble 
          message="Primary color message" 
          position="left" 
          variant="primary"
        />
        <ChatBubble 
          message="Secondary color message" 
          position="right" 
          variant="secondary"
        />
        <ChatBubble 
          message="Accent color message" 
          position="left" 
          variant="accent"
        />
        <ChatBubble 
          message="Success message" 
          position="right" 
          variant="success"
        />
        <ChatBubble 
          message="Warning message" 
          position="left" 
          variant="warning"
        />
        <ChatBubble 
          message="Error message" 
          position="right" 
          variant="error"
        />
      </div>
    `,
  }),
}

export const Conversation: Story = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div class="space-y-4 max-w-lg mx-auto">
        <ChatBubble 
          message="Hey! Are you free for lunch today?" 
          position="left"
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b05e?w=40&h=40&fit=crop&crop=face"
          timestamp="11:30 AM"
        />
        <ChatBubble 
          message="Yes! I'd love to. Where do you want to go?" 
          position="right"
          timestamp="11:32 AM"
        />
        <ChatBubble 
          message="How about that new Italian place downtown?" 
          position="left"
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b05e?w=40&h=40&fit=crop&crop=face"
          timestamp="11:33 AM"
        />
        <ChatBubble 
          message="Perfect! Let's meet there at 12:30" 
          position="right"
          timestamp="11:35 AM"
        />
        <ChatBubble 
          message="Great! See you there 😊" 
          position="left"
          avatar="https://images.unsplash.com/photo-1494790108755-2616b612b05e?w=40&h=40&fit=crop&crop=face"
          timestamp="11:36 AM"
        />
      </div>
    `,
  }),
}

export const LongMessage: Story = {
  args: {
    message:
      'This is a much longer message to demonstrate how the chat bubble handles multiple lines of text. It should wrap nicely and maintain proper spacing and readability even with extended content.',
    position: 'left',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    timestamp: '3:45 PM',
  },
}

export const SystemMessage: Story = {
  render: () => ({
    components: { ChatBubble },
    template: `
      <div class="space-y-4 max-w-md mx-auto">
        <div class="text-center">
          <div class="inline-block bg-base-200 text-base-content px-4 py-2 rounded-full text-sm">
            John joined the conversation
          </div>
        </div>
        <ChatBubble 
          message="Welcome to the team chat!" 
          position="left"
          avatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
        />
        <div class="text-center">
          <div class="inline-block bg-base-200 text-base-content px-4 py-2 rounded-full text-sm">
            Sarah is typing...
          </div>
        </div>
      </div>
    `,
  }),
}
