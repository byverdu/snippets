globalThis.setRangeBoundingWidth = ({ width, ...rest }: Partial<DOMRect>) => {
  Range.prototype.getBoundingClientRect = function () {
    return { width, ...rest } as DOMRect;
  };
};

globalThis.setRangeBoundingWidth({ width: 100 });
