import { useState } from 'react';
import { contact } from '../data/content.js';

const links = [
  ['Services', '#services'],
  ['Projects', '#projects'],
  ['Process', '#process'],
  ['Contact', '#contact']
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav">
      <a href="#top" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-mark">I</span>
        <span>
          IVY INTERIO
          <small>{contact.tagline}</small>
        </span>
      </a>

      <nav className={open ? 'open' : ''}>
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="btn small" href="#calculator" onClick={() => setOpen(false)}>
          Get a Quote →
        </a>
      </nav>

      <button
        className="burger"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i />
        <i />
        <i />
      </button>
    </header>
  );
}
