import { useNotification } from "@/contexts/NotificationContext";

/**
 * Custom hook that provides easy-to-use notification functions
 * with consistent styling and behavior across the app
 */
export const useToast = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();

  return {
    /**
     * Show a success notification
     * @param title - The main message
     * @param message - Optional detailed message
     */
    success: (title: string, message?: string) => {
      showSuccess(title, message);
    },

    /**
     * Show an error notification
     * @param title - The main error message
     * @param message - Optional detailed error message
     */
    error: (title: string, message?: string) => {
      showError(title, message);
    },

    /**
     * Show a warning notification
     * @param title - The main warning message
     * @param message - Optional detailed warning message
     */
    warning: (title: string, message?: string) => {
      showWarning(title, message);
    },

    /**
     * Show an info notification
     * @param title - The main info message
     * @param message - Optional detailed info message
     */
    info: (title: string, message?: string) => {
      showInfo(title, message);
    },
  };
};
