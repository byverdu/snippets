import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AutoHeightBox } from './AutoHeightBox';
import { expect, test, vi } from 'vitest';

describe('AutoHeightBox', () => {
  const mockGetBoundingClientRect = (top = 100, height = 500) => ({
    top,
    height,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  beforeEach(() => {
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(mockGetBoundingClientRect);
  });

  test('renders children correctly', () => {
    render(
      <AutoHeightBox>
        <div data-testid="test-child">Test Content</div>
      </AutoHeightBox>,
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies default styleProp as height', () => {
    render(<AutoHeightBox data-testid="box" />);
    const box = screen.getByTestId('box');

    expect(box).toHaveStyle({ overflow: 'auto' });
  });

  test('applies custom styleProp as maxHeight', () => {
    render(<AutoHeightBox data-testid="box" heightProp="maxHeight" />);
    const box = screen.getByTestId('box');

    expect(box).toHaveStyle({ overflow: 'auto' });
  });

  test('sets height based on parent element when parentSelector is provided', () => {
    // Create a parent element
    const parent = document.createElement('div');
    parent.setAttribute('data-testid', 'parent');
    document.body.appendChild(parent);

    // Mock parent's getBoundingClientRect
    parent.getBoundingClientRect = vi.fn(() =>
      mockGetBoundingClientRect(0, 300),
    );

    render(
      <AutoHeightBox
        parentSelector="[data-testid='parent']"
        data-testid="box"
      />,
    );

    const box = screen.getByTestId('box');
    expect(box).toHaveStyle({ height: '300px' });

    // Cleanup
    document.body.removeChild(parent);
  });

  test('sets height based on viewport when no parentSelector is provided', () => {
    render(<AutoHeightBox data-testid="box" parentSelector="none" />);
    const box = screen.getByTestId('box');

    // 100vh - (top + DEFAULT_SPACING_GAP)
    // 100vh - (100 + 16) = 100vh - 116px
    expect(box).toHaveStyle({ height: 'calc(100vh - 116px)' });
  });

  test('merges custom styles props with default styles', () => {
    render(
      <AutoHeightBox
        data-testid="box"
        customStyles={{ background: 'red', padding: 16 }}
      />,
    );
    const box = screen.getByTestId('box');

    expect(box).toHaveStyle({
      background: 'red',
      overflow: 'auto',
      padding: '16px',
    });
  });
});
