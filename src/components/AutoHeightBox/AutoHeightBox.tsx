import type { CSSProperties, JSX } from 'react';
import { DEFAULT_SPACING_GAP } from '@constants';

type Props = {
  children?: JSX.Element;
  heightProp?: 'height' | 'maxHeight';
  customStyles?: CSSProperties;
  parentSelector?: string;
};

/**
 * AutoHeightBox
 *
 * A React component that automatically sets its height to fill the available vertical space
 * either relative to the viewport or to a specified parent element. Useful for creating
 * scrollable containers that fill the remaining space in a layout.
 *
 * @param props - The component props.
 * @param [props.children] - The content to render inside the box.
 * @param [props.heightProp='height'] - Determines whether to set `height` or `maxHeight` CSS property.
 * @param [props.customStyles] - Additional custom styles to apply to the container.
 * @param [props.parentSelector] - CSS selector for a parent element whose height should be used.
 * @returns The auto-height box container.
 */

export const AutoHeightBox = ({
  children,
  heightProp = 'height',
  customStyles,
  parentSelector,
  ...rest
}: Props) => (
  <div
    ref={node => {
      if (node && node instanceof HTMLElement) {
        if (parentSelector) {
          const parent = document.querySelector(parentSelector);

          if (parent) {
            const { height } = parent.getBoundingClientRect();

            node.style[heightProp] = `${height}px`;

            return;
          }
        }

        const { top } = node.getBoundingClientRect();
        node.style[heightProp] = `calc(100vh - ${top + DEFAULT_SPACING_GAP}px)`;
      }
    }}
    style={{ overflow: 'auto', ...customStyles }}
    {...rest}
  >
    {children}
  </div>
);
