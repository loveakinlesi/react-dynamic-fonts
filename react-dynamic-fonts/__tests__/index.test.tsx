// @vitest-environment jsdom

import * as React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest';
import { googleFonts } from '../src/googleFonts';
import { FontProvider, useFont } from '../src/index';
import { useLoadFont } from '../src/useLoadFont';

// Mock useLoadFont
vi.mock('../src/useLoadFont', () => ({
  useLoadFont: vi.fn(),
}));

const TestComponent: React.FC = () => {
  const { font, fonts, setFont } = useFont();

  return (
    <div>
      <span data-testid='current-font'>{font}</span>ß
      <span data-testid='available-fonts'>{fonts.join(',')}</span>
      <button onClick={() => setFont('Arial')}>Change Font</button>
      <button onClick={() => setFont('InvalidFont')}>Set Invalid Font</button>
    </div>
  );
};
afterEach(cleanup);

describe('FontProvider and useFont', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should initialize with the default font', () => {
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>,
    );

    expect(screen.getByTestId('current-font').textContent).toBe('Inter');
  });

  test('should initialize with a custom default font', () => {
    render(
      <FontProvider defaultFont='Arial'>
        <TestComponent />
      </FontProvider>,
    );

    expect(screen.getByTestId('current-font').textContent).toBe('Arial');
  });

  it('should provide the correct list of fonts', () => {
    render(
      <FontProvider>
        <TestComponent />
      </FontProvider>,
    );

    expect(screen.getByTestId('available-fonts').textContent).toBe(
      googleFonts.join(','),
    );
  });

  it('should change the font when setFont is called with a valid font', () => {
    render(
      <FontProvider defaultFont='Inter' fonts={['Inter', 'Arial']}>
        <TestComponent />
      </FontProvider>,
    );

    const button = screen.getByText('Change Font');
    fireEvent.click(button);

    expect(screen.getByTestId('current-font').textContent).toBe('Arial');
  });

  it('should not change the font and log a warning when setFont is called with an invalid font', () => {
    const consoleWarnMock = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    render(
      <FontProvider defaultFont='Inter' fonts={['Inter', 'Arial']}>
        <TestComponent />
      </FontProvider>,
    );

    const button = screen.getByText('Set Invalid Font');
    fireEvent.click(button);

    expect(screen.getByTestId('current-font').textContent).toBe('Inter');
    expect(consoleWarnMock).toHaveBeenCalledWith(
      expect.stringContaining('is not available'),
    );

    consoleWarnMock.mockRestore();
  });

  it('should update the CSS custom property when the font changes', () => {
    render(
      <FontProvider defaultFont='Inter' fonts={['Inter', 'Arial']}>
        <TestComponent />
      </FontProvider>,
    );

    const button = screen.getByText('Change Font');
    fireEvent.click(button);

    expect(document.documentElement.style.getPropertyValue('--app-font')).toBe(
      'Arial',
    );
  });

  it('should call useLoadFont when the font changes', () => {
    render(
      <FontProvider defaultFont='Inter' fonts={['Inter', 'Arial']}>
        <TestComponent />
      </FontProvider>,
    );

    const button = screen.getByText('Change Font');
    fireEvent.click(button);

    expect(useLoadFont).toHaveBeenCalledWith('Arial');
  });

  it('should throw an error when useFont is used outside of FontProvider', () => {
    const TestComponentWithoutProvider: React.FC = () => {
      useFont();
      return null;
    };

    expect(() => render(<TestComponentWithoutProvider />)).toThrow(
      'useFont must be used within a FontProvider',
    );
  });

  it("should not cause unnecessary re-renders when the font doesn't change", () => {
    const renderSpy = vi.fn();
    const TestComponentWithRenderSpy: React.FC = () => {
      const { font, setFont } = useFont();
      renderSpy();
      return (
        <div>
          <span data-testid='current-font'>{font}</span>
          <button onClick={() => setFont(font)}>Set Same Font</button>
        </div>
      );
    };

    render(
      <FontProvider defaultFont='Inter' fonts={['Inter', 'Arial']}>
        <TestComponentWithRenderSpy />
      </FontProvider>,
    );

    const initialRenderCount = renderSpy.mock.calls.length;
    const button = screen.getByText('Set Same Font');
    fireEvent.click(button);

    expect(renderSpy.mock.calls.length).toBe(initialRenderCount);
  });
});
