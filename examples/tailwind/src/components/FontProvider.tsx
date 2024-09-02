'use client';

import * as React from 'react';
import { FontProvider as ReactDynamicFontsProvider } from 'react-dynamic-fonts';
type FontProviderProps = Parameters<typeof ReactDynamicFontsProvider>[0];

/**
 * Your app's Font provider component.
 * 'use client' is essential for react-dynamic-fonts to work with app-dir.
 */
export function FontProvider({ children, ...props }: FontProviderProps) {
  return (
    <ReactDynamicFontsProvider {...props}>{children}</ReactDynamicFontsProvider>
  );
}
