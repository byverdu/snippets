import { test, expect } from 'vitest';
import { useElementHasOverflow } from '@hooks';
import { renderHook } from '@testing-library/react';

describe('useElementHasOverflow', () => {
  const elem = document.createElement('div');
  const triggerChange = true;

  beforeEach(() => {
    globalThis.setRangeBoundingWidth({ width: 100.1 });
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(6);
      return 1;
    });
  });
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(
    () => ({ width: 100 }) as DOMRect,
  );

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should be defined', () => {
    expect(useElementHasOverflow).toBeInstanceOf(Function);
  });

  test('should return false when element is null', () => {
    const {
      result: { current },
    } = renderHook(() => useElementHasOverflow({ elem: null, triggerChange }));
    expect(current).toEqual(false);
  });

  test('should return true if text overflows', () => {
    const {
      result: { current },
    } = renderHook(() => useElementHasOverflow({ elem, triggerChange }));

    expect(current).toEqual(true);
  });

  test('should trigger change if triggerChange props changes', () => {
    const { result, rerender } = renderHook<
      boolean | undefined,
      {
        elem: Element | null | undefined;
        triggerChange: unknown;
      }
    >(props => useElementHasOverflow(props), {
      initialProps: { elem: null, triggerChange },
    });

    expect(result.current).toEqual(false);

    rerender({ elem, triggerChange });

    expect(result.current).toEqual(true);
  });
});
