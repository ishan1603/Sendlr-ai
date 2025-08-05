# Custom Notification System

This project now includes a custom-styled notification system that replaces all default browser alerts and popups with components that match the retro/pixel art design aesthetic.

## Components

### 1. Notification Component (`components/Notification.tsx`)

- Styled toast notifications with animations
- Support for different types: success, error, warning, info
- Auto-close functionality with configurable duration
- Keyboard support (Esc to close)
- Stacked positioning for multiple notifications

### 2. Confirmation Modal (`components/ConfirmModal.tsx`)

- Styled confirmation dialogs
- Customizable button text and types
- Backdrop with click-to-close
- Animations and transitions

### 3. Notification Context (`contexts/NotificationContext.tsx`)

- Global state management for notifications
- Provider component for the entire app
- Methods for showing different types of notifications

### 4. Toast Hook (`hooks/useToast.ts`)

- Simplified interface for showing notifications
- Convenient wrapper around notification functions

## Usage

### Basic Notifications

```tsx
import { useNotification } from "@/contexts/NotificationContext";

const { showSuccess, showError, showWarning, showInfo } = useNotification();

// Success notification
showSuccess(
  "Preferences Saved",
  "Your newsletter preferences have been updated"
);

// Error notification
showError("Save Failed", "Please try again");

// Warning notification
showWarning("Selection Required", "Please select at least one category");

// Info notification
showInfo("Information", "This is an informational message");
```

### Using the Toast Hook

```tsx
import { useToast } from "@/hooks/useToast";

const toast = useToast();

// Simplified usage
toast.success("Operation completed!");
toast.error("Something went wrong");
toast.warning("Please check your input");
toast.info("Did you know...");
```

### Confirmation Modal

```tsx
import ConfirmModal from "@/components/ConfirmModal";

const [showConfirm, setShowConfirm] = useState(false);

<ConfirmModal
  isOpen={showConfirm}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
  confirmText="YES"
  cancelText="NO"
  type="danger" // or "default"
  onConfirm={() => {
    // Handle confirmation
    setShowConfirm(false);
  }}
  onCancel={() => setShowConfirm(false)}
/>;
```

## Design Features

- **Retro/Pixel Art Style**: Matches the Press Start 2P font and black border aesthetic
- **Consistent Styling**: All notifications follow the same visual language as the rest of the app
- **Animations**: Smooth slide-in/slide-out animations
- **Accessibility**: Keyboard support and proper focus management
- **Responsive**: Works well on different screen sizes
- **Stacking**: Multiple notifications stack vertically
- **Auto-dismiss**: Configurable auto-close timers

## Migration from Alerts

All instances of `alert()`, `confirm()`, and similar browser dialogs have been replaced:

### Before:

```tsx
alert("Preferences saved successfully!");
```

### After:

```tsx
showSuccess("Preferences Saved", "Your settings have been updated");
```

## Configuration

### Notification Duration

Default duration is 5 seconds, but can be customized:

```tsx
showNotification({
  type: "success",
  title: "Custom Duration",
  message: "This will stay for 10 seconds",
  duration: 10000, // 10 seconds
});
```

### Styling

The notifications automatically adapt to the app's theme using CSS variables defined in `globals.css`.

## Integration

The notification system is integrated at the root level in `app/layout.tsx`:

```tsx
<NotificationProvider>
  <AuthProvider>
    <Navbar />
    {children}
  </AuthProvider>
</NotificationProvider>
```

This ensures notifications are available throughout the entire application.
