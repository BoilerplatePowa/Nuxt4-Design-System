import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Calendar from '../../src/runtime/components/DataInput/Calendar.vue'

const meta: Meta<typeof Calendar> = {
    title: 'Data Input/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
          'A comprehensive calendar component with date selection, range selection, time picker, and full accessibility support. Built with DaisyUI and Tailwind CSS. Uses Vue 3.4 defineModel() for optimal v-model handling.',
            },
        },
    },
    argTypes: {
        mode: {
            control: 'select',
            options: ['input', 'inline'],
            description: 'Display mode - input with popover or inline calendar',
        },
        range: {
            control: 'boolean',
            description: 'Enable date range selection',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the calendar component',
        },
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'filled'],
            description: 'Visual variant of the component',
        },
        showTime: {
            control: 'boolean',
            description: 'Show time picker in addition to date selection',
        },
        allowMonthSelect: {
            control: 'boolean',
            description: 'Show month selector dropdown',
        },
        allowYearSelect: {
            control: 'boolean',
            description: 'Show year selector dropdown',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the calendar component',
        },
        readonly: {
            control: 'boolean',
            description: 'Make the calendar read-only',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text for input mode',
        },
        locale: {
            control: 'text',
            description: 'Locale for date formatting',
        },
        timeStep: {
            control: 'number',
            description: 'Time step in minutes for time picker',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        mode: 'input',
        size: 'md',
        variant: 'default',
        placeholder: 'Select a date...',
        locale: 'fr-FR',
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedDate = ref<Date | null>(null)

            const handleSelect = (date: Date) => {
                console.log('Date selected:', date)
            }

            return { args, selectedDate, handleSelect }
        },
        template: `
      <div class="space-y-4">
        <Calendar 
          v-bind="args" 
          v-model="selectedDate"
          @select="handleSelect"
        />
        <div v-if="selectedDate" class="text-sm text-center opacity-70">
          Selected: {{ selectedDate.toLocaleDateString() }}
        </div>
        <div class="text-sm text-center opacity-70">
          <p>• Uses Vue 3.4 defineModel() for v-model</p>
          <p>• Two-way binding with parent component</p>
          <p>• Automatic prop/emit handling</p>
        </div>
      </div>
    `,
    }),
}

export const Inline: Story = {
    args: {
        mode: 'inline',
        size: 'md',
        variant: 'bordered',
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedDate = ref<Date | null>(null)

            return { args, selectedDate }
        },
        template: `
      <div class="space-y-4">
        <Calendar v-bind="args" v-model="selectedDate" />
        <div class="text-sm text-center opacity-70">
          <p>• Inline calendar display</p>
          <p>• No popover, always visible</p>
          <p>• Perfect for dashboard widgets</p>
        </div>
      </div>
    `,
    }),
}

export const DateRange: Story = {
    args: {
        mode: 'input',
        range: true,
        size: 'md',
        variant: 'bordered',
        placeholder: 'Select date range...',
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedRange = ref<Date[] | null>(null)

            return { args, selectedRange }
        },
        template: `
      <div class="space-y-4">
        <Calendar v-bind="args" v-model="selectedRange" />
        <div v-if="selectedRange && selectedRange.length === 2" class="text-sm text-center opacity-70">
          Range: {{ selectedRange[0].toLocaleDateString() }} - {{ selectedRange[1].toLocaleDateString() }}
        </div>
        <div class="text-sm text-center opacity-70">
          <p>• Select start and end dates</p>
          <p>• Visual range highlighting</p>
          <p>• Apply/Clear buttons for range selection</p>
        </div>
      </div>
    `,
    }),
}

export const WithTimePicker: Story = {
    args: {
        mode: 'input',
        showTime: true,
        timeStep: 15,
        size: 'md',
        variant: 'bordered',
        placeholder: 'Select date and time...',
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedDateTime = ref<Date | null>(null)

            return { args, selectedDateTime }
        },
        template: `
      <div class="space-y-4">
        <Calendar v-bind="args" v-model="selectedDateTime" />
        <div v-if="selectedDateTime" class="text-sm text-center opacity-70">
          Selected: {{ selectedDateTime.toLocaleString() }}
        </div>
        <div class="text-sm text-center opacity-70">
          <p>• Date and time selection</p>
          <p>• Configurable time step (15 minutes)</p>
          <p>• 24-hour format</p>
        </div>
      </div>
    `,
    }),
}

export const DifferentSizes: Story = {
    render: () => ({
        components: { Calendar },
        setup() {
            const dates = ref({
                small: null,
                medium: null,
                large: null,
            })

            return { dates }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="font-semibold mb-2">Small Size</h3>
          <Calendar 
            v-model="dates.small" 
            mode="input" 
            size="sm"
            variant="bordered"
            placeholder="Small calendar..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Medium Size (Default)</h3>
          <Calendar 
            v-model="dates.medium" 
            mode="input" 
            size="md"
            variant="bordered"
            placeholder="Medium calendar..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Large Size</h3>
          <Calendar 
            v-model="dates.large" 
            mode="input" 
            size="lg"
            variant="bordered"
            placeholder="Large calendar..."
          />
        </div>
      </div>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { Calendar },
        setup() {
            const dates = ref({
                default: null,
                bordered: null,
                filled: null,
            })

            return { dates }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="font-semibold mb-2">Default Variant</h3>
          <Calendar 
            v-model="dates.default" 
            mode="input" 
            variant="default"
            placeholder="Default style..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Bordered Variant</h3>
          <Calendar 
            v-model="dates.bordered" 
            mode="input" 
            variant="bordered"
            placeholder="Bordered style..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Filled Variant</h3>
          <Calendar 
            v-model="dates.filled" 
            mode="input" 
            variant="filled"
            placeholder="Filled style..."
          />
        </div>
      </div>
    `,
    }),
}

export const WithConstraints: Story = {
    args: {
        mode: 'input',
        size: 'md',
        variant: 'bordered',
        placeholder: 'Select date...',
        minDate: new Date('2024-01-01'),
        maxDate: new Date('2024-12-31'),
        disabledDates: [
            new Date('2024-01-01'), // New Year
            new Date('2024-07-04'), // Independence Day
            new Date('2024-12-25'), // Christmas
        ],
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedDate = ref<Date | null>(null)

            return { args, selectedDate }
        },
        template: `
      <div class="space-y-4">
        <Calendar v-bind="args" v-model="selectedDate" />
        <div class="text-sm text-center opacity-70">
          <p>• Min date: January 1, 2024</p>
          <p>• Max date: December 31, 2024</p>
          <p>• Disabled: New Year, Independence Day, Christmas</p>
        </div>
      </div>
    `,
    }),
}

export const Accessibility: Story = {
    args: {
        mode: 'input',
        size: 'md',
        variant: 'bordered',
        placeholder: 'Select date...',
        allowMonthSelect: true,
        allowYearSelect: true,
    },
    render: args => ({
        components: { Calendar },
        setup() {
            const selectedDate = ref<Date | null>(null)

            const handleFocus = (event: FocusEvent) => {
                console.log('Calendar focused')
            }

            const handleBlur = (event: FocusEvent) => {
                console.log('Calendar blurred')
            }

            const handleClose = () => {
                console.log('Calendar closed')
            }

            return { args, selectedDate, handleFocus, handleBlur, handleClose }
        },
        template: `
      <div class="space-y-4">
        <Calendar 
          v-bind="args" 
          v-model="selectedDate"
          @focus="handleFocus"
          @blur="handleBlur"
          @close="handleClose"
        />
        <div class="text-sm text-center opacity-70">
          <p>• Full keyboard navigation support</p>
          <p>• ARIA labels and roles</p>
          <p>• Screen reader compatible</p>
          <p>• Focus management</p>
        </div>
      </div>
    `,
    }),
}

export const Localization: Story = {
    render: () => ({
        components: { Calendar },
        setup() {
            const dates = ref({
                english: null,
                french: null,
                spanish: null,
            })

            return { dates }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="font-semibold mb-2">English (en-US)</h3>
          <Calendar 
            v-model="dates.english" 
            mode="input" 
            locale="en-US"
            variant="bordered"
            placeholder="Select date..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">French (fr-FR)</h3>
          <Calendar 
            v-model="dates.french" 
            mode="input" 
            locale="fr-FR"
            variant="bordered"
            placeholder="Sélectionner une date..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Spanish (es-ES)</h3>
          <Calendar 
            v-model="dates.spanish" 
            mode="input" 
            locale="es-ES"
            variant="bordered"
            placeholder="Seleccionar fecha..."
          />
        </div>
      </div>
    `,
    }),
}

export const Vue34DefineModel: Story = {
    render: () => ({
        components: { Calendar },
        setup() {
            const date1 = ref<Date | null>(null)
            const date2 = ref<Date | null>(null)
            const date3 = ref<Date | null>(null)

            const handleDateChange = (value: Date | null, label: string) => {
                console.log(`${label} changed to:`, value)
            }

            return { date1, date2, date3, handleDateChange }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="font-semibold mb-2">Vue 3.4 defineModel() Demo</h3>
          <p class="text-sm opacity-70 mb-4">Demonstrating automatic two-way binding with defineModel()</p>
        </div>
        
        <div class="text-center">
          <h4 class="font-medium mb-2">Calendar 1</h4>
          <Calendar 
            v-model="date1" 
            mode="input" 
            variant="bordered"
            placeholder="Select date 1..."
            @select="(date) => handleDateChange(date, 'Calendar 1')"
          />
          <div v-if="date1" class="text-xs mt-1 opacity-70">
            Value: {{ date1.toLocaleDateString() }}
          </div>
        </div>
        
        <div class="text-center">
          <h4 class="font-medium mb-2">Calendar 2</h4>
          <Calendar 
            v-model="date2" 
            mode="input" 
            variant="bordered"
            placeholder="Select date 2..."
            @select="(date) => handleDateChange(date, 'Calendar 2')"
          />
          <div v-if="date2" class="text-xs mt-1 opacity-70">
            Value: {{ date2.toLocaleDateString() }}
          </div>
        </div>
        
        <div class="text-center">
          <h4 class="font-medium mb-2">Calendar 3 (Inline)</h4>
          <Calendar 
            v-model="date3" 
            mode="inline" 
            variant="bordered"
            @select="(date) => handleDateChange(date, 'Calendar 3')"
          />
          <div v-if="date3" class="text-xs mt-1 opacity-70">
            Value: {{ date3.toLocaleDateString() }}
          </div>
        </div>
        
        <div class="text-sm text-center opacity-70">
          <p>• Each calendar uses defineModel() for automatic v-model handling</p>
          <p>• No manual prop/emit setup required</p>
          <p>• Type-safe two-way binding</p>
          <p>• Check console for change events</p>
        </div>
      </div>
    `,
    }),
}

export const States: Story = {
    render: () => ({
        components: { Calendar },
        setup() {
            const dates = ref({
                normal: null,
                disabled: null,
                readonly: null,
                error: null,
            })

            return { dates }
        },
        template: `
      <div class="space-y-6">
        <div class="text-center">
          <h3 class="font-semibold mb-2">Normal State</h3>
          <Calendar 
            v-model="dates.normal" 
            mode="input" 
            variant="bordered"
            placeholder="Normal calendar..."
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Disabled State</h3>
          <Calendar 
            v-model="dates.disabled" 
            mode="input" 
            variant="bordered"
            placeholder="Disabled calendar..."
            :disabled="true"
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Readonly State</h3>
          <Calendar 
            v-model="dates.readonly" 
            mode="input" 
            variant="bordered"
            placeholder="Readonly calendar..."
            :readonly="true"
          />
        </div>
        
        <div class="text-center">
          <h3 class="font-semibold mb-2">Error State</h3>
          <Calendar 
            v-model="dates.error" 
            mode="input" 
            variant="bordered"
            placeholder="Error calendar..."
            error-message="Please select a valid date"
          />
        </div>
      </div>
    `,
    }),
}
