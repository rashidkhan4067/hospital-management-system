import { create } from 'zustand';

/**
 * 🛰️ Global Modal Command Center (Zustand - Stack Managed)
 * Orchestrates a multi-layered modal lifecycle for advanced clinical flows.
 */
export const useModalStore = create((set, get) => ({
  modalStack: [], 
  activeModal: null,

  /**
   * 📤 Push Modal
   * Opens a new modal of 'type' with 'props'.
   */
  openModal: (type, props = {}) => set(state => {
    const newStack = [...state.modalStack, { type, props }];
    return { 
      modalStack: newStack, 
      activeModal: newStack[newStack.length - 1] 
    };
  }),

  /**
   * 📥 Pop/Close Modal
   * Closes the current modal and returns to the previous layer.
   */
  closeModal: () => set(state => {
    const newStack = [...state.modalStack];
    newStack.pop();
    return { 
      modalStack: newStack, 
      activeModal: newStack.length > 0 ? newStack[newStack.length - 1] : null 
    };
  }),

  clearModals: () => set({ modalStack: [], activeModal: null })
}));
