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
          border: "1px solid var(--rule-strong)",
          cursor: "pointer",
          transition: "background 0.15s, border-color 0.15s",
        }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
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
            boxShadow: "0 24px 60px -20px rgba(0,0,0,0.8)",
          }}
        >
          <nav
            style={{
              maxWidth: "var(--container)",
              margin: "0 auto",
              padding: "1rem 20px",
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
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--fg-soft)",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.background =
                    "var(--cyan-weak)";
                  (e.target as HTMLAnchorElement).style.color = "var(--cyan)";
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
                  padding: "12px 18px",
                  borderRadius: "8px",
                  background: "var(--cyan)",
                  color: "var(--cyan-ink)",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 4px 18px rgba(0,240,209,0.28)",
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
