import '@/styles.css';
import type { AppProps } from 'next/app';
import { FontProvider } from 'react-dynamic-fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FontProvider>
      <Component {...pageProps} />;
    </FontProvider>
  );
}
