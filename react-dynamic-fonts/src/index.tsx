'use client';

import React from 'react';
import { FontProviderProps, UseFontProps } from './types';
import { googleFonts } from './googleFonts';
import { useLoadFont } from './useLoadFont';

const FontContext = React.createContext<UseFontProps | undefined>(undefined);
const FONT_STORAGE_KEY = 'font';

/**
 * `FontProvider` component that manages the font state and provides it to the application.
 *
 * @param {FontProviderProps} props - The properties for the FontProvider.
 * @returns {JSX.Element} The FontProvider component.
 */
export const FontProvider: React.FC<FontProviderProps> = ({
  defaultFont = 'Inter',
  fonts = googleFonts,
  children,
}) => {
  const [font, setFontState] = React.useState<string>(() => {
    const storedFont =
      typeof window !== 'undefined'
        ? localStorage.getItem(FONT_STORAGE_KEY)
        : null;
    return storedFont || defaultFont;
  });

  useLoadFont(font);

  const setFont = React.useCallback(
    (newFont: string) => {
      if (fonts.includes(newFont)) {
        setFontState(newFont);
        localStorage.setItem(FONT_STORAGE_KEY, newFont);
      } else {
        console.warn(
          `Font "${newFont}" is not available in the provided fonts list.`,
        );
        setFontState(defaultFont);
        localStorage.setItem(FONT_STORAGE_KEY, defaultFont);
      }
    },
    [fonts, defaultFont],
  );

  const value = React.useMemo(
    () => ({ font, fonts, setFont }),
    [font, fonts, setFont],
  );

  React.useEffect(() => {
    document.documentElement.style.setProperty('--app-font', font);
  }, [font]);

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};

/**
 * Custom hook to use the font context.
 * Provides the current font, available fonts, and a function to change the font.
 *
 * @returns {UseFontProps} The current font, available fonts, and a setter for the font.
 */
export const useFont = (): UseFontProps => {
  const context = React.useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within a FontProvider');
  }
  return {
    font: context.font,
    fonts: context.fonts,
    setFont: context.setFont,
  };
};
