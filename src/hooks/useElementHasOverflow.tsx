import { useLayoutEffect, useState } from 'react';

/**
 * Returns the width of a cloned element's content using Range API.
 *
 * @param refElem - The reference DOM element to measure.
 * @returns The width of the element's content in pixels, or undefined if not measurable.
 */
const getClonedElementWidth = (refElem: Element) => {
  const range = new Range();

  range.selectNodeContents(refElem);

  return range?.getBoundingClientRect().width;
};

type HookProps = {
  elem: Element | null | undefined;
  triggerChange: unknown;
};

/**
 * Custom React hook to determine whether the content of an element overflows its width.
 *
 * @param props - The hook props.
 * @param props.elem - The DOM element reference to check.
 * @param props.triggerChange - A value to watch for triggering re-calculation.
 * @returns True if the content overflows, false otherwise, or false initially.
 */
export const useElementHasOverflow = ({ elem, triggerChange }: HookProps) => {
  const [withTooltip, setWithTooltip] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    if (elem) {
      const realWidth = getClonedElementWidth(elem);
      const currentWidth = elem.getBoundingClientRect().width;

      requestAnimationFrame(() => {
        setWithTooltip(realWidth > currentWidth);
      });
    }
  }, [triggerChange, elem]);

  return withTooltip;
};
