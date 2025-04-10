import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center justify-center text-sm text-muted-foreground">
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
      </div>
    </footer>
  );
};

export default Footer;
