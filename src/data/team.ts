export interface ExecutiveProfile {
  slug: string;
  name: string;
  nameAr: string;
  role: string;
  department: string;
  tier: 'Owner' | 'Executive Leadership';
  email: string;
  bio: string;
  focus: string[];
  initials: string;
}

export interface TeamSpecialist {
  slug: string;
  name: string;
  nameAr: string;
  designation: string;
  department: string;
  category: 'Advisory' | 'Operations' | 'Growth & People';
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
    slug: 'shabib-siraj',
    name: 'Shabib Siraj',
    nameAr: 'شبيب سراج',
    role: 'Founder & Managing Director',
    department: 'Executive Leadership & Governance',
    tier: 'Owner',
    email: 'shabib@betterwaymortgages.com',
    bio: 'Leads Betterway Mortgages LLC in Dubai with institutional focus on CBUAE-aligned borrower disclosures, multi-lender structuring, and transparent end-to-end mortgage governance.',
    focus: ['Institutional Lender Relationships', 'CBUAE Governance & Oversight', 'Private Client & HNW Structuring'],
    initials: 'SS',
  },
  {
    slug: 'warda',
    name: 'Warda',
    nameAr: 'وردة',
    role: 'Executive Director',
    department: 'Executive Leadership',
    tier: 'Executive Leadership',
    email: 'warda@betterwaymortgages.com',
    bio: 'Oversees executive operations, corporate quality standards, and cross-functional alignment across advisory, conveyancing, and partner broker workflows.',
    focus: ['Executive Governance', 'Client Experience Standards', 'Operational Controls'],
    initials: 'WA',
  },
] as const;

export const TEAM_SPECIALISTS: readonly TeamSpecialist[] = [
  {
    slug: 'daniel-xavier',
    name: 'Daniel Xavier',
    nameAr: 'دانيال خافيير',
    designation: 'Team Manager & Mortgage Advisor',
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
    slug: 'asif-khan',
    name: 'Asif Khan',
    nameAr: 'آصف خان',
    designation: 'Mortgage Advisor',
    department: 'Mortgage Advisory',
    category: 'Advisory',
    email: 'asif@betterwaymortgages.com',
    portrait8k: '/staff/8k/asif-khan-8k.webp',
    portrait: '/staff/asif-khan-portrait.webp',
    portrait1080: '/staff/asif-khan-portrait-1080.webp',
    avatar: '/staff/asif-khan.jpg',
    avatarWebp: '/staff/asif-khan.webp',
    aspect: 'tall',
    summary:
      'Advises homebuyers and existing UAE borrowers on fixed-to-revert rate structures, buyout refinancing break-even analysis, and upfront Dubai Land Department closing budgets.',
    specialties: ['First-Home Resident Mortgages', 'Buyout & Refinance Modelling', 'Islamic & Conventional Comparison'],
    languages: ['English'],
  },
  {
    slug: 'reshma-rajan',
    name: 'Reshma Rajan',
    nameAr: 'ريشما راجان',
    designation: 'Telesales cum Mortgage Advisor',
    department: 'Telesales & Mortgage Advisory',
    category: 'Advisory',
    email: 'reshma@betterwaymortgages.com',
    portrait8k: '/staff/8k/reshma-rajan-8k.webp',
    portrait: '/staff/reshma-rajan-portrait.webp',
    portrait1080: '/staff/reshma-rajan-portrait-1080.webp',
    avatar: '/staff/reshma-rajan.jpg',
    avatarWebp: '/staff/reshma-rajan.webp',
    aspect: 'portrait',
    summary:
      'Manages first-response borrower consultations, eligibility discovery, and tailored document checklists so every client arrives at formal bank submission fully prepared.',
    specialties: ['Initial DBR & LTV Discovery', 'Document Readiness Checklists', 'Consultation Scheduling'],
    languages: ['English'],
  },
  {
    slug: 'elton-frank',
    name: 'Elton Frank',
    nameAr: 'إلتون فرانك',
    designation: 'Coordinator',
    department: 'Operations & Conveyancing Coordination',
    category: 'Operations',
    email: 'elton@betterwaymortgages.com',
    portrait8k: '/staff/8k/elton-frank-8k.webp',
    portrait: '/staff/elton-frank-portrait.webp',
    portrait1080: '/staff/elton-frank-portrait-1080.webp',
    avatar: '/staff/elton-frank.jpg',
    avatarWebp: '/staff/elton-frank.webp',
    aspect: 'portrait',
    summary:
      'Coordinates post-approval execution across bank valuation panels, developer NOC portals, Final Offer Letter reviews, and Dubai Land Department Trustee transfer milestones.',
    specialties: ['Bank Valuation & FOL Tracking', 'Developer NOC Coordination', 'DLD Trustee Transfer Packs'],
    languages: ['English'],
  },
  {
    slug: 'mohammad-nusrik',
    name: 'Mohammad Nusrik',
    nameAr: 'محمد نصريك',
    designation: 'Digital Marketing',
    department: 'Digital Marketing & Lead Attribution',
    category: 'Growth & People',
    email: 'nusrik@betterwaymortgages.com',
    portrait8k: '/staff/8k/mohammad-nusrik-8k.webp',
    portrait: '/staff/mohammad-nusrik-portrait.webp',
    portrait1080: '/staff/mohammad-nusrik-portrait-1080.webp',
    avatar: '/staff/mohammad-nusrik.jpg',
    avatarWebp: '/staff/mohammad-nusrik.webp',
    aspect: 'portrait',
    summary:
      'Drives Betterway’s digital growth, bilingual UAE mortgage education channels, and RERA partner calculator attribution connecting prospective buyers with the advisory desk.',
    specialties: ['Digital Acquisition & SEO/AEO', 'Partner Attribution Channels', 'Brand & Campaign Architecture'],
    languages: ['English'],
  },
  {
    slug: 'rahaba-azeez',
    name: 'Rahaba Azeez',
    nameAr: 'رحبة عزيز',
    designation: 'HR',
    department: 'Human Resources & MOHRE WPS',
    category: 'Growth & People',
    email: 'rahaba@betterwaymortgages.com',
    portrait8k: '/staff/8k/rahaba-azeez-8k.webp',
    portrait: '/staff/rahaba-azeez-portrait.webp',
    portrait1080: '/staff/rahaba-azeez-portrait-1080.webp',
    avatar: '/staff/rahaba-azeez.jpg',
    avatarWebp: '/staff/rahaba-azeez.webp',
    aspect: 'tall',
    summary:
      'Leads people operations, advisor onboarding, UAE MOHRE compliance, and team capability standards at Betterway Mortgages LLC in Dubai.',
    specialties: ['People Operations & Onboarding', 'UAE MOHRE & WPS Governance', 'Team Standards & Training'],
    languages: ['English'],
  },
] as const;
