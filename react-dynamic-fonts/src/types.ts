import * as React from 'react';

/**
 * Props for the `FontProvider` component.
 * The `FontProvider` is responsible for managing and providing the selected font to the rest of the application.
 */
export interface FontProviderProps extends React.PropsWithChildren {
  /**
   * The default font to be used when the application loads.
   * If not provided, 'Inter' will be used as the default font.
   *
   * @default 'Inter'
   */
  defaultFont?: string;

  /**
   * An array of available fonts that can be selected within the application.
   * If not provided, a predefined list of Google Fonts will be used.
   *
   * @default googleFonts
   */
  fonts?: string[];
}

/**
 * The structure of the data returned by the `useFont` hook.
 * This includes the available fonts, the current font, and a function to update the font.
 */
export interface UseFontProps {
  /**
   * The currently selected font.
   */
  font?: string | undefined;
  /**
   * An array of available fonts that can be selected within the application.
   */
  fonts: string[];
  /**
   * A function to update the current font.
   *
   * @param font - The new font to be applied.
   */
  setFont: (font: string) => void;
}
