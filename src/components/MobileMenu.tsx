import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/resources/events", label: "Events" },
  { href: "/resources/blog", label: "Blog" },
  { href: "/resources/social-media", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "8px",
          color: "var(--fg)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "100%",
            zIndex: 40,
            background: "var(--bg-1)",
            borderBottom: "1px solid var(--rule)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <nav
            style={{
              maxWidth: "1240px",
              margin: "0 auto",
              padding: "1rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--fg-soft)",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.background =
                    "var(--bg-3)";
                  (e.target as HTMLAnchorElement).style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.background =
                    "transparent";
                  (e.target as HTMLAnchorElement).style.color = "var(--fg-soft)";
                }}
              >
                {link.label}
              </a>
            ))}
            <div
              style={{
                marginTop: "12px",
                paddingTop: "12px",
                borderTop: "1px solid var(--rule)",
              }}
            >
              <a
                href="https://fabricplanning.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Subscribe →
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
