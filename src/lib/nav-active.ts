const hasPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

const RESOURCE_PREFIXES = [
  '/guides',
  '/advisory',
  '/about-us',
  '/why-betterway-vs-direct-bank',
  '/our-underwriters',
  '/reviews',
];

export function isNavActive(pathname: string, label: string): boolean {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  switch (label) {
    case 'Home':
      return clean === '/';
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
      return RESOURCE_PREFIXES.some((p) => hasPrefix(clean, p));
    default:
      return false;
  }
}
