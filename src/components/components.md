# components

## AutoHeightBox

[Source: `AutoHeightBox/AutoHeightBox.tsx`](./AutoHeightBox/AutoHeightBox.tsx)

A React component that automatically calculates and sets the height of a container based on the viewport or a parent element. Useful for creating scrollable containers that fill the available vertical space.

**Props:**

- `children?: JSX.Element` - The content to render inside the box
- `heightProp?: 'height' | 'maxHeight'` - Whether to set `height` or `maxHeight` (default: `'height'`)
- `customStyles?: CSSProperties` - Additional CSS styles to apply
- `parentSelector?: string` - CSS selector for a parent element whose height should be used

**Behavior:**

- If `parentSelector` is provided, the box height matches the parent element's height
- If no `parentSelector` is provided, the box height is calculated as `calc(100vh - (top + spacing))`
- Always applies `overflow: 'auto'` by default

```tsx
import { AutoHeightBox } from '@components';

// Basic usage - fills viewport height
<AutoHeightBox>
  <div>Scrollable content here</div>
</AutoHeightBox>

// Use maxHeight instead of height
<AutoHeightBox heightProp="maxHeight">
  <div>Content with max height</div>
</AutoHeightBox>

// Match parent element height
<AutoHeightBox parentSelector=".parent-container">
  <div>Content matching parent height</div>
</AutoHeightBox>

// With custom styles
<AutoHeightBox
  customStyles={{ background: '#f0f0f0', padding: 16 }}
>
  <div>Styled content</div>
</AutoHeightBox>
```
