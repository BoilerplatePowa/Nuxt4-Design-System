import type { Meta, StoryObj } from '@storybook/vue3-vite'
import WindowMockup from '../../src/runtime/components/Mockup/WindowMockup.vue'

const meta: Meta<typeof WindowMockup> = {
    title: 'Mockup/WindowMockup',
    component: WindowMockup,
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'border', 'bg'],
        },
        title: {
            control: { type: 'text' },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        title: 'My Application',
    },
    render: args => ({
        components: { WindowMockup },
        setup() {
            return { args }
        },
        template: `
      <WindowMockup v-bind="args">
        <div class="p-8 bg-gray-50 min-h-64 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-4">Desktop Application</h2>
            <p class="text-gray-600">This is a mockup of a desktop window interface</p>
          </div>
        </div>
      </WindowMockup>
    `,
    }),
}

export const TextEditor: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <WindowMockup title="TextEdit - Document.txt">
        <div class="bg-white h-80 p-4 font-mono text-sm">
          <div class="mb-4 pb-2 border-b flex items-center justify-between text-xs text-gray-500">
            <span>File Edit View Help</span>
            <span>Ln 1, Col 1</span>
          </div>
          <div class="leading-relaxed">
            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            <div>Sed do eiusmod tempor incididunt ut labore et dolore magna</div>
            <div>aliqua. Ut enim ad minim veniam, quis nostrud exercitation</div>
            <div>ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            <div></div>
            <div>Duis aute irure dolor in reprehenderit in voluptate velit</div>
            <div>esse cillum dolore eu fugiat nulla pariatur. Excepteur sint</div>
            <div>occaecat cupidatat non proident, sunt in culpa qui officia</div>
            <div>deserunt mollit anim id est laborum.</div>
            <div class="bg-blue-100 inline">|</div>
          </div>
        </div>
      </WindowMockup>
    `,
    }),
}

export const Calculator: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <WindowMockup title="Calculator" class="max-w-xs">
        <div class="bg-gray-800 text-white p-4">
          <!-- Display -->
          <div class="bg-black p-4 mb-4 text-right text-2xl font-mono rounded">
            123,456.78
          </div>
          
          <!-- Buttons -->
          <div class="grid grid-cols-4 gap-2">
            <button class="bg-gray-600 hover:bg-gray-500 p-3 rounded text-sm">C</button>
            <button class="bg-gray-600 hover:bg-gray-500 p-3 rounded text-sm">±</button>
            <button class="bg-gray-600 hover:bg-gray-500 p-3 rounded text-sm">%</button>
            <button class="bg-orange-500 hover:bg-orange-400 p-3 rounded text-sm">÷</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">7</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">8</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">9</button>
            <button class="bg-orange-500 hover:bg-orange-400 p-3 rounded text-sm">×</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">4</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">5</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">6</button>
            <button class="bg-orange-500 hover:bg-orange-400 p-3 rounded text-sm">−</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">1</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">2</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">3</button>
            <button class="bg-orange-500 hover:bg-orange-400 p-3 rounded text-sm">+</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm col-span-2">0</button>
            <button class="bg-gray-700 hover:bg-gray-600 p-3 rounded text-sm">.</button>
            <button class="bg-orange-500 hover:bg-orange-400 p-3 rounded text-sm">=</button>
          </div>
        </div>
      </WindowMockup>
    `,
    }),
}

export const ChatApp: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <WindowMockup title="Messages - John Doe">
        <div class="flex h-80">
          <!-- Sidebar -->
          <div class="w-64 bg-gray-100 border-r">
            <div class="p-4 border-b">
              <input 
                type="text" 
                placeholder="Search conversations..."
                class="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
            <div class="overflow-y-auto">
              <div class="p-3 hover:bg-gray-200 border-b cursor-pointer bg-blue-50">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    JD
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm">John Doe</div>
                    <div class="text-xs text-gray-500 truncate">Hey, how's the project going?</div>
                  </div>
                </div>
              </div>
              <div class="p-3 hover:bg-gray-200 border-b cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    JS
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-sm">Jane Smith</div>
                    <div class="text-xs text-gray-500 truncate">Meeting at 3pm tomorrow</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Chat Area -->
          <div class="flex-1 flex flex-col">
            <!-- Messages -->
            <div class="flex-1 p-4 space-y-4 overflow-y-auto">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  JD
                </div>
                <div class="bg-gray-200 rounded-lg px-3 py-2 max-w-xs">
                  <div class="text-sm">Hey! How's the project going?</div>
                  <div class="text-xs text-gray-500 mt-1">2:30 PM</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-3 justify-end">
                <div class="bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
                  <div class="text-sm">Going great! Just finished the mockup components.</div>
                  <div class="text-xs text-blue-200 mt-1">2:32 PM</div>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                  JD
                </div>
                <div class="bg-gray-200 rounded-lg px-3 py-2 max-w-xs">
                  <div class="text-sm">Awesome! Can't wait to see them.</div>
                  <div class="text-xs text-gray-500 mt-1">2:33 PM</div>
                </div>
              </div>
            </div>
            
            <!-- Input -->
            <div class="border-t p-4">
              <div class="flex space-x-3">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  class="flex-1 px-3 py-2 border rounded-lg"
                />
                <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </WindowMockup>
    `,
    }),
}

export const Variants: Story = {
    render: () => ({
        components: { WindowMockup },
        template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-bold mb-4">Default</h3>
          <WindowMockup title="Default Window">
            <div class="p-6 text-center">
              <p>Default window mockup</p>
            </div>
          </WindowMockup>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Border</h3>
          <WindowMockup title="Bordered Window" variant="border">
            <div class="p-6 text-center">
              <p>Window with border styling</p>
            </div>
          </WindowMockup>
        </div>
        
        <div>
          <h3 class="text-lg font-bold mb-4">With Background</h3>
          <WindowMockup title="Background Window" variant="bg">
            <div class="p-6 text-center">
              <p>Window with background styling</p>
            </div>
          </WindowMockup>
        </div>
      </div>
    `,
    }),
}
