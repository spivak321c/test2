# AdminJS Custom Frontend Override

This directory contains custom components that override the default AdminJS frontend.

## Structure

```admin/
├── components/
│   ├── Dashboard.tsx           # Custom dashboard with statistics
│   ├── ProcessPayoutAction.tsx # Custom action for processing payouts
│   ├── MerchantDetails.tsx     # Enhanced merchant details view
│   └── package.json            # Component dependencies
├── admin.ts                    # AdminJS configuration
├── component-loader.ts         # Component loader setup
└── README.md                   # This file
```
## Custom Components

### 1. Dashboard Component
- Displays key metrics (merchants, applications, payouts)
- Quick action buttons for common tasks
- Real-time statistics

### 2. ProcessPayoutAction Component
- Custom action for processing individual payouts
- Confirmation dialog before processing
- Success/error feedback
- Automatic page reload after processing

### 3. MerchantDetails Component
- Enhanced merchant profile view
- Payout summary integration
- Quick links to related resources
- Status badges with color coding

## How to Add New Custom Components

1. Create a new `.tsx` file in the `components/` directory
2. Import necessary AdminJS design system components
3. Register the component in `admin.ts` using `componentLoader.add()`
4. Use the component in resource options or actions

Example:

```typescript
// In admin.ts
import { componentLoader } from "./component-loader.js"

const adminJs = new AdminJS({
  resources: [
    {
      resource: { table: myTable, db },
      options: {
        actions: {
          myCustomAction: {
            component: componentLoader.add("MyComponent", "./components/MyComponent"),
          },
        },
      },
    },
  ],
})
```
## Styling

Custom components use the AdminJS Design System which provides:
- Pre-built UI components (Box, Button, Text, etc.)
- Consistent theming
- Responsive layouts
- Accessible components

## API Integration

Components can interact with the backend using:
- `ApiClient` from AdminJS for resource operations
- Custom API endpoints via fetch/axios
- AdminJS action handlers for server-side logic

## Development

To modify components:
1. Edit the component file in `components/`
2. Restart the server to see changes
3. AdminJS will automatically bundle the components

Note: In production, ensure components are properly bundled and cached.
