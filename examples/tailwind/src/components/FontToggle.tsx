'use client';

import React, { useEffect, useState } from 'react';
import { useFont } from 'react-dynamic-fonts';

function FontToggle() {
  const { font, setFont, fonts } = useFont();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = event.target.value;
    if (fonts.includes(newFont)) {
      setFont(newFont);
    } else {
      console.warn(
        `Font "${newFont}" is not available in the provided fonts list.`,
      );
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className='w-[150px] h-8'>
      <select
        value={font}
        onChange={handleFontChange}
        className='px-4 py-2 font-medium rounded-md border border-black bg-transparent'>
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontToggle;
