const hasPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

const BUYER_PREFIXES = [
  '/mortgages',
  '/get-started',
  '/concierge',
  '/calculators',
  '/tools',
  '/handover',
  '/advisory',
];

const AGENT_PREFIXES = ['/hub', '/edge', '/partners'];

const RESOURCE_PREFIXES = [
  '/rates',
  '/guides',
  '/areas',
  '/affordability',
  '/why-betterway-vs-direct-bank',
  '/our-underwriters',
  '/reviews',
];

export function isNavActive(pathname: string, label: string): boolean {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  switch (label) {
    case 'Home':
      return clean === '/';
    case 'About Us':
      return hasPrefix(clean, '/about-us');
    case 'For Buyers':
      return BUYER_PREFIXES.some((p) => hasPrefix(clean, p));
    case 'For Agents':
      return AGENT_PREFIXES.some((p) => hasPrefix(clean, p));
    case 'Mortgages':
      return hasPrefix(clean, '/mortgages');
    case 'Rates':
      return hasPrefix(clean, '/rates');
    case 'Calculators':
      return hasPrefix(clean, '/calculators') || hasPrefix(clean, '/tools');
    case 'Off-plan':
      return hasPrefix(clean, '/handover');
    case 'Areas':
      return hasPrefix(clean, '/areas') || hasPrefix(clean, '/affordability');
    case 'Resources':
      return (
        RESOURCE_PREFIXES.some((p) => hasPrefix(clean, p)) ||
        hasPrefix(clean, '/about-us') ||
        hasPrefix(clean, '/advisory')
      );
    default:
      return false;
  }
}
