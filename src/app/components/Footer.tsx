import Link from "next/link";

export default function Footer() {
  return (
      <footer className="z-20 w-full py-gutter px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 bg-surface dark:bg-background border-t border-on-surface flat no shadows">
        <div className="font-mono-data text-mono-data text-on-surface-variant">
          © {new Date().getFullYear()} VECTOR.OS RETRIEVAL SYSTEMS
        </div>
        <div className="flex gap-6 font-mono-data text-mono-data">
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Protocol
          </Link>
        </div>
      </footer>
  );
}