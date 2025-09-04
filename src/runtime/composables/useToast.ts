import { ref, readonly } from 'vue';
import type { ToastItem } from '../components/Feedback/ToastContainer.vue';

// Global toast state
const toasts = ref<ToastItem[]>([]);
let nextId = 1;

export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  duration?: number;
  closable?: boolean;
}

export function useToast() {
  const addToast = (message: string, options: ToastOptions = {}) => {
    const toast: ToastItem = {
      id: nextId++,
      message,
      type: options.type || 'info',
      title: options.title,
      duration: options.duration || 5000,
      closable: options.closable !== false, // Default to true
      timestamp: Date.now(),
    };

    toasts.value.push(toast);
    return toast.id;
  };

  const removeToast = (id: string | number) => {
    const index = toasts.value.findIndex(toast => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAll = () => {
    toasts.value = [];
  };

  // Convenience methods for different types
  const success = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'success' });
  };

  const error = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'error' });
  };

  const warning = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'warning' });
  };

  const info = (message: string, options?: Omit<ToastOptions, 'type'>) => {
    return addToast(message, { ...options, type: 'info' });
  };

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
  };
}

// Export the composable for global access
export default useToast;
