/**
 * Inline SVG icons — no icon font, no extra network request, and they inherit
 * `currentColor`. The previous FontAwesome class names rendered nothing
 * because the font was never loaded.
 */

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function IconInstagram(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 8.5H17V5.2h-2.6c-2.2 0-3.6 1.4-3.6 3.6v1.9H8.5v3.2h2.3V21h3.3v-7.1h2.4l.4-3.2h-2.8V9.4c0-.6.2-.9.4-.9Z" />
    </svg>
  );
}

export function IconTripadvisor(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.2" cy="13" r="3.6" />
      <circle cx="16.8" cy="13" r="3.6" />
      <circle cx="7.2" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.8" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M8.4 8.2A9.6 9.6 0 0 1 12 7.5c1.3 0 2.5.2 3.6.7" />
    </svg>
  );
}

export function IconPhone(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3.8h3.2l1.6 4-2 1.3a11.5 11.5 0 0 0 5.1 5.1l1.3-2 4 1.6V17c0 1.8-1.5 3.3-3.3 3.2A15.6 15.6 0 0 1 3.8 7.1 3.3 3.3 0 0 1 5 3.8Z" />
    </svg>
  );
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 7.1 5a1.6 1.6 0 0 0 1.8 0l7.1-5" />
    </svg>
  );
}

export function IconPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.4V12l3 1.9" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
