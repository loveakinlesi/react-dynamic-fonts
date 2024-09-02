import { useEffect, useState } from 'react';
import { useFont } from 'react-dynamic-fonts';

const Index = () => {
  const { font, fonts, setFont } = useFont();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const availableFonts = fonts.sort();

  return (
    <div>
      <h1>React Dynamic Fonts Example</h1>
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        data-test-id='font-selector'>
        {mounted &&
          availableFonts.map((font) => <option value={font}>{font}</option>)}
      </select>

      <br />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <br />
    </div>
  );
};

export default Index;
