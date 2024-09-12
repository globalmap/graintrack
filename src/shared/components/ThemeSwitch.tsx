import { useLocalStorage } from "../hooks/useLocaleStorage";
import * as Switch from "@radix-ui/react-switch";
import { useEffect } from "react";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage("theme", LIGHT_THEME);

  useEffect(() => {
    document.documentElement.classList.remove(LIGHT_THEME, DARK_THEME);
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleCheck = (checked: boolean) => {
    setTheme(checked ? DARK_THEME : LIGHT_THEME);
  };

  return (
    <form className='absolute right-5'>
      <div className='flex items-center'>
        <label
          className='text-[15px] leading-none pr-[15px]'
          htmlFor='theme-mode'>
          Theme Mode
        </label>
        <Switch.Root
          onCheckedChange={handleCheck}
          checked={theme === "dark"}
          className='cursor-pointer w-[42px] h-[25px] bg-blackA6 rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none '
          id='theme-mode'
          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
          aria-label='Toggle theme mode'>
          <Switch.Thumb className='block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
        </Switch.Root>
      </div>
    </form>
  );
}

export default ThemeSwitch;
