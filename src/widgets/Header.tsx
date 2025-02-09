import { SwitchThemeBtn } from "../features/themes/SwitchThmBtn";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white dark:bg-white dark:text-black">
      Header
      <SwitchThemeBtn />
    </header>
  );
}
