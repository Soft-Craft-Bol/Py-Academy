//Components
//React
import { BsMoonStarsFill } from 'react-icons/bs';
import { MdWbSunny } from 'react-icons/md';

import Button from './Button';

export function ButtonTheme({ theme, onChangeTheme }) {
  return (
    <Button size="sm" variant="secondary" onClick={onChangeTheme}>
      {theme === 'dark' ? (
        <MdWbSunny className="text-yellow-300 rounded text-xl" />
      ) : (
        <BsMoonStarsFill className="text-blue-300 rounded text-xl" />
      )}
    </Button>
  );
}
