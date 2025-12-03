import { useLayoutEffect, useState } from 'react';

const getClonedElementWidth = (refElem: Element) => {
  const range = new Range();

  range.selectNodeContents(refElem);

  return range?.getBoundingClientRect().width;
};

type HookProps = {
  elem: Element | null | undefined;
  triggerChange: unknown;
};

export const useShouldHaveTooltip = ({ elem, triggerChange }: HookProps) => {
  const [withTooltip, setWithTooltip] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    if (elem) {
      const currentWidth = elem.getBoundingClientRect().width;
      const realWidth = getClonedElementWidth(elem);

      setWithTooltip(realWidth > currentWidth);
    }
  }, [triggerChange, elem]);

  return withTooltip;
};
