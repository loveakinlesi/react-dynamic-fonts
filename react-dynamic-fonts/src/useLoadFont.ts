import React from 'react';

/**
 * Custom hook to dynamically load a Google Font.
 *
 * @param {string} font - The name of the font to load.
 */
export const useLoadFont = (font: string): void => {
  React.useEffect(() => {
    if (!font) return;

    const fontName = font.replace(/ /g, '+');
    const linkId = `google-font-${fontName}`;
    const existingLink = document.getElementById(linkId);

    // If the font is already loaded, do nothing
    if (existingLink) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    link.id = linkId;

    document.head.appendChild(link);

    return () => {
      const linkToRemove = document.getElementById(linkId);
      if (linkToRemove) {
        document.head.removeChild(linkToRemove);
      }
    };
  }, [font]);
};
