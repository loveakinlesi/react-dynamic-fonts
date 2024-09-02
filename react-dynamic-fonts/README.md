# React Dynamic Fonts

`react-dynamic-fonts` is a lightweight and flexible React library that allows
you to dynamically change fonts in your React applications. With built-in
support for Google Fonts, this package makes it easy to provide a seamless
font-switching experience, enabling users to customize the typography of your
app on the fly.

### Features

- Dynamic Font Switching: Easily switch between different fonts in your
  application with minimal configuration.
- Google Fonts Integration: Out-of-the-box support for a wide array of Google
  Fonts.
- Context API: Provides a simple and efficient way to manage font state across
  your application using React’s Context API.

### Installation

```bash
npm install react-dynamic-fonts
```

or

```bash
pnpm add react-dynamic-fonts
```

### Usage

Wrap your application in the FontProvider and use the useFont hook to manage and
switch fonts dynamically:

```tsx
import React from 'react';
import { FontProvider, useFont } from 'react-dynamic-fonts';

const App = () => {
  const { font, setFont, fonts } = useFont();

  return (
    <div>
      <h1 style={{ fontFamily: font }}>Hello, World!</h1>
      <select value={font} onChange={(e) => setFont(e.target.value)}>
        {fonts.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Root() {
  return (
    <FontProvider>
      <App />
    </FontProvider>
  );
}
```
