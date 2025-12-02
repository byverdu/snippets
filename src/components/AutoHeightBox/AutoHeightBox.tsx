import type { CSSProperties, JSX } from 'react';
import { DEFAULT_SPACING_GAP } from '../../constants';

type Props = {
  children?: JSX.Element;
  heightProp?: 'height' | 'maxHeight';
  customStyles?: CSSProperties;
  parentSelector?: string;
};

export const AutoHeightBox = ({
  children,
  heightProp = 'height',
  customStyles,
  parentSelector,
  ...rest
}: Props) => (
  <div
    // data-testid="box"
    ref={node => {
      if (node && node instanceof HTMLElement) {
        if (parentSelector) {
          const parent = document.querySelector(parentSelector);

          if (parent) {
            const { height } = parent.getBoundingClientRect();

            node.style[heightProp] = `${height}px`;

            return undefined;
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
