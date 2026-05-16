import Link from "next/link";

export default function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-sm border-b border-on-surface dark:border-outline flat no shadows">
      <div className="flex items-center gap-8">
        <span className="font-display-lg text-headline-lg-mobile font-extrabold tracking-tighter text-on-surface dark:text-on-surface">
          Persona
        </span>
        <div className="hidden md:flex gap-6">
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="#"
          >
            Chat
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="#"
          >
            Traits
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="/Assessment"
          >
            Assessment
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className="hidden md:block bg-on-surface text-surface px-6 py-2 font-label-bold text-label-bold btn-primary transition-colors border border-transparent"
          href="/MBTI"
        >
          MBTI Test
        </Link>
        <button className="text-primary dark:text-primary-fixed hover:text-primary-container transition-colors p-2">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="text-primary dark:text-primary-fixed hover:text-primary-container transition-colors p-2">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
    </nav>
  );
}
