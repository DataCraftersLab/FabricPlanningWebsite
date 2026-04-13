import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

const resourceLinks: NavLink[] = [
  { href: "/resources/events", label: "Events" },
  { href: "/resources/blog", label: "Blog" },
  { href: "/resources/social-media", label: "Social Media" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setResourcesOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-40 border-t border-white/10 bg-forest shadow-lg">
          <nav className="mx-auto flex max-w-[1200px] flex-col px-6 py-4">
            <a
              href="/"
              className="rounded-md px-3 py-3 text-base font-medium text-white hover:bg-white/10"
              onClick={close}
            >
              Home
            </a>
            <a
              href="/faq"
              className="rounded-md px-3 py-3 text-base font-medium text-white hover:bg-white/10"
              onClick={close}
            >
              FAQ
            </a>

            <button
              type="button"
              aria-expanded={resourcesOpen}
              onClick={() => setResourcesOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium text-white hover:bg-white/10"
            >
              <span>Resources</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {resourcesOpen && (
              <div className="ml-3 flex flex-col border-l border-white/10 pl-3">
                {resourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
                    onClick={close}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <a
              href="/about"
              className="rounded-md px-3 py-3 text-base font-medium text-white hover:bg-white/10"
              onClick={close}
            >
              About
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
