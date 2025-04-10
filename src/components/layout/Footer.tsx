import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-5 bg-background max-w-3xl w-full mx-auto p-4 flex flex-col items-center justify-center text-sm text-muted-foreground border-t border-border">
      <div className="flex items-center">
        <span>© {currentYear} Powered by</span>
        <Link
          href="https://github.com/treephesians"
          className="ml-1 font-medium hover:text-foreground transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          jbaamm
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
