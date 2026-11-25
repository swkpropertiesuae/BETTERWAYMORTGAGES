export interface ExecutiveProfile {
  slug: string;
  name: string;
  nameAr: string;
  role: string;
  department: string;
  tier: 'Founder & Managing Director' | 'Executive Director';
  email: string;
  portrait8k: string;
  portrait: string;
  portrait1080: string;
  avatar: string;
  avatarWebp: string;
  bio: string;
  credentials?: string;
  focus: string[];
  initials: string;
}

export interface TeamSpecialist {
  slug: string;
  name: string;
  nameAr: string;
  designation: string;
  department: string;
  category: 'Leadership' | 'Advisory' | 'Operations' | 'Growth & People';
  email: string;
  portrait8k: string;
  portrait: string;
  portrait1080: string;
  avatar: string;
  avatarWebp: string;
  aspect: 'portrait' | 'tall';
  summary: string;
  specialties: string[];
  languages: string[];
}

export const EXECUTIVE_LEADERSHIP: readonly ExecutiveProfile[] = [
  {
    slug: 'warda-kapadia',
    name: 'Warda Kapadia',
    nameAr: 'وردة كاباديا',
    role: 'Founder & Managing Director',
    department: 'Executive Leadership & Governance',
    tier: 'Founder & Managing Director',
    email: 'warda@betterwaymortgages.com',
    portrait8k: '/staff/8k/warda-kapadia-8k.webp',
    portrait: '/staff/warda-kapadia-portrait.webp',
    portrait1080: '/staff/warda-kapadia-portrait-1080.webp',
    avatar: '/staff/warda-kapadia.jpg',
    avatarWebp: '/staff/warda-kapadia.webp',
    bio: 'Founder & Managing Director of Betterway Mortgages LLC in Dubai, championing transparent, CBUAE-aligned borrower disclosures, multi-lender neutrality across 24 UAE banks, and disciplined one-on-one client advocacy.',
    focus: ['Founder Vision & Strategy', 'CBUAE Governance & Standards', 'Institutional Bank Partnerships'],
    initials: 'WK',
  },
  {
    slug: 'shabib-siraj',
    name: 'Shabib Siraj',
    nameAr: 'شبيب سراج',
    role: 'Executive Director',
    department: 'Executive Advisory & Private Wealth',
    tier: 'Executive Director',
    email: 'shabib@betterwaymortgages.com',
    portrait8k: '/staff/8k/shabib-siraj-8k.webp',
    portrait: '/staff/shabib-siraj-portrait.webp',
    portrait1080: '/staff/shabib-siraj-portrait-1080.webp',
    avatar: '/staff/shabib-siraj.jpg',
    avatarWebp: '/staff/shabib-siraj.webp',
    credentials:
      '15+ years of banking in-house experience across world-class banks & Personal Investment Advisor handling HNWI for UAE Real Estate for the past 8+ years.',
    bio: 'Brings 15+ years of in-house banking experience across world-class financial institutions alongside 8+ years as a Personal Investment Advisor handling High-Net-Worth Individuals (HNWI) in UAE Real Estate, structuring complex residential, commercial, and portfolio acquisitions.',
    focus: [
      '15+ Years In-House Banking Experience',
      '8+ Years HNWI UAE Real Estate Advisory',
      'Private Client & Portfolio Structuring',
    ],
    initials: 'SS',
  },
] as const;

export const TEAM_SPECIALISTS: readonly TeamSpecialist[] = [
  {
    slug: 'daniel-xavier',
    name: 'Daniel Xavier',
    nameAr: 'دانيال خافيير',
    designation: 'Team Manager',
    department: 'Leadership & Mortgage Advisory',
    category: 'Advisory',
    email: 'daniel@betterwaymortgages.com',
    portrait8k: '/staff/8k/daniel-xavier-8k.webp',
    portrait: '/staff/daniel-xavier-portrait.webp',
    portrait1080: '/staff/daniel-xavier-portrait-1080.webp',
    avatar: '/staff/daniel-xavier.jpg',
    avatarWebp: '/staff/daniel-xavier.webp',
    aspect: 'portrait',
    summary:
      'Leads the Dubai mortgage advisory desk, guiding UAE residents, investors, and business owners through lender policy comparison, stressed DBR planning, and structured pre-approval preparation.',
    specialties: ['Residential & Villa Structuring', 'Multi-Bank Offer Comparison', 'Self-Employed & Non-Resident Cases'],
    languages: ['English'],
  },
  {
    slug: 'elton-frank',
    name: 'Elton Frank',
    nameAr: 'إلتون فرانك',
    designation: 'Operations Manager',
    department: 'Operations & Conveyancing Execution',
    category: 'Operations',
    email: 'elton@betterwaymortgages.com',
    portrait8k: '/staff/8k/elton-frank-8k.webp',
    portrait: '/staff/elton-frank-portrait.webp',
    portrait1080: '/staff/elton-frank-portrait-1080.webp',
    avatar: '/staff/elton-frank.jpg',
    avatarWebp: '/staff/elton-frank.webp',
    aspect: 'portrait',
    summary:
      'Oversees end-to-end mortgage operations across bank valuation panels, developer NOC portals, Final Offer Letter verification, and Dubai Land Department Trustee transfer milestones.',
    specialties: ['Operations & SLA Governance', 'Bank Valuation & FOL Coordination', 'DLD Trustee Transfer Execution'],
    languages: ['English'],
  },
  {
    slug: 'rahaba-azeez',
    name: 'Rahaba Azeez',
    nameAr: 'رحبة عزيز',
    designation: 'HR',
    department: 'Human Resources & People Governance',
    category: 'Growth & People',
    email: 'rahaba@betterwaymortgages.com',
    portrait8k: '/staff/8k/rahaba-azeez-8k.webp',
    portrait: '/staff/rahaba-azeez-portrait.webp',
    portrait1080: '/staff/rahaba-azeez-portrait-1080.webp',
    avatar: '/staff/rahaba-azeez.jpg',
    avatarWebp: '/staff/rahaba-azeez.webp',
    aspect: 'portrait',
    summary:
      'Leads human resources, advisor onboarding, UAE MOHRE compliance, and team excellence standards across Betterway Mortgages LLC in Dubai.',
    specialties: ['People Operations & Onboarding', 'UAE MOHRE & WPS Governance', 'Team Standards & Training'],
    languages: ['English'],
  },
  {
    slug: 'mohammad-nusrik',
    name: 'Nusrik',
    nameAr: 'نصريك',
    designation: 'IT & Marketing',
    department: 'IT, Digital Platforms & Growth',
    category: 'Growth & People',
    email: 'nusrik@betterwaymortgages.com',
    portrait8k: '/staff/8k/mohammad-nusrik-8k.webp',
    portrait: '/staff/mohammad-nusrik-portrait.webp',
    portrait1080: '/staff/mohammad-nusrik-portrait-1080.webp',
    avatar: '/staff/mohammad-nusrik.jpg',
    avatarWebp: '/staff/mohammad-nusrik.webp',
    aspect: 'portrait',
    summary:
      'Leads Betterway’s IT architecture, BetterHub & BetterCore digital ecosystem, multilingual web growth, and data-driven marketing connecting UAE property buyers to our advisors.',
    specialties: ['IT & Platform Engineering', 'Digital Growth & SEO/AEO', 'BetterHub & Campaign Architecture'],
    languages: ['English'],
  },
  {
    slug: 'asif-khan',
    name: 'Asif Khan',
    nameAr: 'آصف خان',
    designation: 'Advisor',
    department: 'Mortgage Advisory',
    category: 'Advisory',
    email: 'asif@betterwaymortgages.com',
    portrait8k: '/staff/8k/asif-khan-8k.webp',
    portrait: '/staff/asif-khan-portrait.webp',
    portrait1080: '/staff/asif-khan-portrait-1080.webp',
    avatar: '/staff/asif-khan.jpg',
    avatarWebp: '/staff/asif-khan.webp',
    aspect: 'portrait',
    summary:
      'Advises homebuyers and existing UAE borrowers 1-on-1 on fixed-to-revert rate structures, buyout refinancing break-even analysis, and upfront Dubai Land Department closing budgets.',
    specialties: ['First-Home Resident Mortgages', 'Buyout & Refinance Modelling', 'Islamic & Conventional Comparison'],
    languages: ['English'],
  },
  {
    slug: 'reshma-rajan',
    name: 'Reshma',
    nameAr: 'ريشما',
    designation: 'Advisor',
    department: 'Mortgage Advisory',
    category: 'Advisory',
    email: 'reshma@betterwaymortgages.com',
    portrait8k: '/staff/8k/reshma-rajan-8k.webp',
    portrait: '/staff/reshma-rajan-portrait.webp',
    portrait1080: '/staff/reshma-rajan-portrait-1080.webp',
    avatar: '/staff/reshma-rajan.jpg',
    avatarWebp: '/staff/reshma-rajan.webp',
    aspect: 'portrait',
    summary:
      'Guides prospective buyers 1-on-1 through initial eligibility discovery, CBUAE DBR checks, and tailored lender checklists so every client moves smoothly toward written approval.',
    specialties: ['Initial DBR & LTV Discovery', 'Document Readiness Checklists', '1-on-1 Buyer Education'],
    languages: ['English'],
  },
] as const;

/** Complete 8-member roster with identical 3:4 eye-level calibrated portraits (y = 33.0%). */
export const ALL_TEAM_MEMBERS: readonly TeamSpecialist[] = [
  ...EXECUTIVE_LEADERSHIP.map((e) => ({
    slug: e.slug,
    name: e.name,
    nameAr: e.nameAr,
    designation: e.role,
    department: e.department,
    category: 'Leadership' as const,
    email: e.email,
    portrait8k: e.portrait8k,
    portrait: e.portrait,
    portrait1080: e.portrait1080,
    avatar: e.avatar,
    avatarWebp: e.avatarWebp,
    aspect: 'portrait' as const,
    summary: e.bio,
    specialties: e.focus,
    languages: ['English'],
  })),
  ...TEAM_SPECIALISTS,
];
