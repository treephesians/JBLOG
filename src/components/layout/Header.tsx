import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-background pt-3 flex justify-center">
      <header className="max-w-3xl w-full px-4 flex justify-between items-center border-b border-border pb-3">
        <div className="font-bold text-xl">
          <Link href="/">JBlog</Link>
        </div>
        <div className="flex items-center">
          <nav className="mr-4">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/posts"
                  className="hover:text-stone-600 transition-colors"
                >
                  posts
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/project"
                  className="hover:text-stone-600 transition-colors"
                >
                  project
                </Link>
              </li> */}
              <li>
                <Link
                  href="/about"
                  className="hover:text-stone-600 transition-colors"
                >
                  about
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
};

export default Header;
