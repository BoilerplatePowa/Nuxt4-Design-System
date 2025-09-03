import type { Meta, StoryObj } from '@storybook/vue3-vite';
import FileInput from './FileInput.vue';

const meta: Meta<typeof FileInput> = {
  title: 'Data Input/FileInput',
  component: FileInput,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'ghost'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    multiple: {
      control: { type: 'boolean' },
    },
    showPreview: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Choose File',
  },
};

export const Multiple: Story = {
  args: {
    label: 'Choose Files',
    multiple: true,
    showPreview: true,
  },
};

export const WithPreview: Story = {
  args: {
    label: 'Upload Document',
    showPreview: true,
  },
};

export const ImageUpload: Story = {
  args: {
    label: 'Upload Image',
    accept: 'image/*',
    showPreview: true,
  },
};

export const DocumentUpload: Story = {
  args: {
    label: 'Upload Document',
    accept: '.pdf,.doc,.docx,.txt',
    showPreview: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required File Upload',
    required: true,
    helpText: 'Please select a file to continue',
  },
};

export const WithHelp: Story = {
  args: {
    label: 'Profile Picture',
    accept: 'image/*',
    helpText: 'Upload a profile picture (max 5MB, JPG/PNG only)',
    showPreview: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'File Upload',
    errorMessage: 'File size too large. Maximum allowed size is 5MB.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled File Input',
    disabled: true,
    helpText: 'File upload is currently disabled',
  },
};

export const Sizes: Story = {
  render: () => ({
    components: { FileInput },
    template: `
      <div class="space-y-6">
        <FileInput label="Extra Small" size="xs" />
        <FileInput label="Small" size="sm" />
        <FileInput label="Medium (Default)" size="md" />
        <FileInput label="Large" size="lg" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { FileInput },
    template: `
      <div class="space-y-6">
        <FileInput label="Default Variant" variant="default" />
        <FileInput label="Bordered Variant" variant="bordered" />
        <FileInput label="Ghost Variant" variant="ghost" />
      </div>
    `,
  }),
};

export const MaxFileSize: Story = {
  args: {
    label: 'Limited File Size',
    maxFileSize: 1048576, // 1MB
    showPreview: true,
    helpText: 'Maximum file size: 1MB',
  },
};

export const CustomDropZone: Story = {
  args: {
    label: 'Drag & Drop File',
    showPreview: true,
    helpText: 'Drag and drop a file here, or click to select',
    multiple: true,
  },
};
