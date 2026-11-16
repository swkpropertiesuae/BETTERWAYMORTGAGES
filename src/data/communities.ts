// Silo 06 — 60 UAE freehold community mortgage guides (/areas/[emirate]/[slug]).
// Factual area, regulator, stock-type and master-developer directory without unverified price/yield claims.

export type Emirate = 'dubai' | 'abu-dhabi' | 'northern';
export type Community = {
  slug: string;
  emirate: Emirate;
  name: string;
  ar?: string;
  stock: 'Apartments' | 'Villas & townhouses' | 'Mixed';
  devs: string;
};

const d = (
  slug: string,
  name: string,
  stock: Community['stock'],
  devs: string,
  ar?: string,
  emirate: Emirate = 'dubai',
): Community => ({ slug, emirate, name, ar, stock, devs });

export const EMIRATES: Record<Emirate, { name: string; ar: string; regulator: string; transferFee: string }> = {
  dubai: { name: 'Dubai', ar: 'دبي', regulator: 'Dubai Land Department (DLD)', transferFee: '4% DLD transfer fee + AED 580 title deed' },
  'abu-dhabi': { name: 'Abu Dhabi', ar: 'أبوظبي', regulator: 'Abu Dhabi Real Estate Centre (ADREC)', transferFee: 'Confirm current ADREC registration schedule' },
  northern: { name: 'RAK & Sharjah', ar: 'رأس الخيمة والشارقة', regulator: 'RAK Municipality / Sharjah Real Estate Registration Department', transferFee: 'Confirm current emirate registration fee schedule' },
};

export const COMMUNITIES: Community[] = [
  d('dubai-marina', 'Dubai Marina', 'Apartments', 'Emaar, Select Group, LIV', 'دبي مارينا'),
  d('downtown-dubai', 'Downtown Dubai', 'Apartments', 'Emaar', 'وسط مدينة دبي'),
  d('business-bay', 'Business Bay', 'Apartments', 'Omniyat, DAMAC, Binghatti, Select Group, Ellington', 'الخليج التجاري'),
  d('palm-jumeirah', 'Palm Jumeirah', 'Mixed', 'Nakheel, Omniyat, Ellington, Emaar', 'نخلة جميرا'),
  d('dubai-hills-estate', 'Dubai Hills Estate', 'Mixed', 'Emaar', 'دبي هيلز استيت'),
  d('jumeirah-village-circle-jvc', 'Jumeirah Village Circle (JVC)', 'Apartments', 'Nakheel (master), Ellington, Binghatti', 'قرية جميرا الدائرية'),
  d('dubai-creek-harbour', 'Dubai Creek Harbour', 'Apartments', 'Emaar', 'خور دبي'),
  d('emaar-beachfront', 'Emaar Beachfront', 'Apartments', 'Emaar'),
  d('jumeirah-lake-towers-jlt', 'Jumeirah Lake Towers (JLT)', 'Apartments', 'DMCC (master), Sobha, Ellington'),
  d('arabian-ranches-1-2-3', 'Arabian Ranches 1, 2 & 3', 'Villas & townhouses', 'Emaar', 'المرابع العربية'),
  d('tilal-al-ghaf', 'Tilal Al Ghaf', 'Villas & townhouses', 'Majid Al Futtaim', 'تلال الغاف'),
  d('sobha-hartland-mbr-city', 'Sobha Hartland (MBR City)', 'Mixed', 'Sobha Realty'),
  d('palm-jebel-ali', 'Palm Jebel Ali', 'Villas & townhouses', 'Nakheel', 'نخلة جبل علي'),
  d('dubai-islands', 'Dubai Islands', 'Mixed', 'Nakheel'),
  d('al-furjan', 'Al Furjan', 'Mixed', 'Nakheel, Azizi', 'الفرجان'),
  d('jumeirah-village-triangle-jvt', 'Jumeirah Village Triangle (JVT)', 'Mixed', 'Nakheel (master), various sub-developers'),
  d('the-springs-and-meadows', 'The Springs & The Meadows', 'Villas & townhouses', 'Emaar', 'الينابيع والمروج'),
  d('the-lakes-and-emirates-hills', 'The Lakes & Emirates Hills', 'Villas & townhouses', 'Emaar', 'تلال الإمارات'),
  d('jumeirah-islands-and-park', 'Jumeirah Islands & Jumeirah Park', 'Villas & townhouses', 'Nakheel', 'جزر جميرا'),
  d('damac-hills-1-and-2', 'DAMAC Hills 1 & 2', 'Villas & townhouses', 'DAMAC', 'داماك هيلز'),
  d('damac-lagoons', 'DAMAC Lagoons', 'Villas & townhouses', 'DAMAC'),
  d('the-valley-by-emaar', 'The Valley by Emaar', 'Villas & townhouses', 'Emaar', 'ذا فالي'),
  d('the-oasis-by-emaar', 'The Oasis by Emaar', 'Villas & townhouses', 'Emaar', 'ذا أويسس'),
  d('dubai-south-and-expo-city', 'Dubai South & Expo City', 'Mixed', 'Dubai South, Expo City, Emaar'),
  d('emaar-south', 'Emaar South', 'Mixed', 'Emaar'),
  d('city-walk-and-jumeirah', 'City Walk & Jumeirah', 'Mixed', 'Meraas'),
  d('madinat-jumeirah-living', 'Madinat Jumeirah Living', 'Apartments', 'Meraas'),
  d('bluewaters-island', 'Bluewaters Island', 'Apartments', 'Meraas'),
  d('dubai-harbour', 'Dubai Harbour', 'Apartments', 'Shamal (master), Emaar, Sobha, DAMAC'),
  d('rashid-yachts-and-marina', 'Rashid Yachts & Marina', 'Apartments', 'Emaar'),
  d('dubai-maritime-city', 'Dubai Maritime City', 'Apartments', 'Omniyat, Select Group, Danube, Deyaar'),
  d('al-barari', 'Al Barari', 'Villas & townhouses', 'Al Barari', 'البراري'),
  d('al-jaddaf-waterfront', 'Al Jaddaf Waterfront', 'Apartments', 'Dubai Holding, Binghatti, Azizi'),
  d('dubai-festival-city', 'Dubai Festival City', 'Mixed', 'Al-Futtaim'),
  d('meydan-nad-al-sheba', 'Meydan & Nad Al Sheba', 'Villas & townhouses', 'Meydan, Meraas, Sobha', 'ميدان وند الشبا'),
  d('town-square-dubai', 'Town Square Dubai', 'Mixed', 'Nshama'),
  d('mira-and-mira-oasis-reem', 'Mira, Mira Oasis & Reem', 'Villas & townhouses', 'Emaar'),
  d('mudon-and-serena', 'Mudon & Serena', 'Villas & townhouses', 'Dubai Properties', 'مدن وسيرينا'),
  d('villanova-and-the-villa', 'Villanova & The Villa', 'Villas & townhouses', 'Dubai Properties', 'فيلانوفا'),
  d('arjan-and-dubai-science-park', 'Arjan & Dubai Science Park', 'Apartments', 'Dubai Holding (master), various sub-developers'),
  d('motor-city-and-studio-city', 'Motor City & Studio City', 'Mixed', 'Union Properties, Sobha'),
  d('dubai-sports-city', 'Dubai Sports City', 'Apartments', 'Various developers'),
  d('dubai-silicon-oasis-dso', 'Dubai Silicon Oasis (DSO)', 'Apartments', 'DSOA, Deyaar, Ellington'),
  d('the-greens-and-views', 'The Greens & The Views', 'Apartments', 'Emaar'),
  d('difc-and-sheikh-zayed-road', 'DIFC & Sheikh Zayed Road', 'Apartments', 'DIFC, Meraas, Al Habtoor'),
  d('yas-island', 'Yas Island', 'Mixed', 'Aldar', 'جزيرة ياس', 'abu-dhabi'),
  d('saadiyat-island', 'Saadiyat Island', 'Mixed', 'Aldar', 'جزيرة السعديات', 'abu-dhabi'),
  d('al-reem-island', 'Al Reem Island', 'Apartments', 'Aldar, Tamouh, Imkan', 'جزيرة الريم', 'abu-dhabi'),
  d('al-raha-beach', 'Al Raha Beach', 'Mixed', 'Aldar', undefined, 'abu-dhabi'),
  d('al-maryah-island', 'Al Maryah Island', 'Apartments', 'Mubadala, Aldar', undefined, 'abu-dhabi'),
  d('hudayriyat-island', 'Hudayriyat Island', 'Villas & townhouses', 'Modon', undefined, 'abu-dhabi'),
  d('masdar-city', 'Masdar City', 'Apartments', 'Masdar', undefined, 'abu-dhabi'),
  d('al-ghadeer-and-al-reef', 'Al Ghadeer & Al Reef', 'Mixed', 'Aldar, Manazel', undefined, 'abu-dhabi'),
  d('al-shamkha-fay-alreeman', 'Al Shamkha & Fay Alreeman', 'Villas & townhouses', 'Aldar', undefined, 'abu-dhabi'),
  d('al-jurf-ghantoot', 'Al Jurf & Ghantoot', 'Villas & townhouses', 'Imkan', undefined, 'abu-dhabi'),
  d('al-marjan-island-rak', 'Al Marjan Island', 'Mixed', 'Marjan, Ellington, Emaar, Aldar', 'جزيرة المرجان', 'northern'),
  d('mina-al-arab-rak', 'Mina Al Arab', 'Mixed', 'RAK Properties', undefined, 'northern'),
  d('al-hamra-village-rak', 'Al Hamra Village', 'Mixed', 'Al Hamra', undefined, 'northern'),
  d('aljada-sharjah', 'Aljada', 'Mixed', 'Arada', 'الجادة', 'northern'),
  d('masaar-sharjah', 'Masaar', 'Villas & townhouses', 'Arada', undefined, 'northern'),
];

export const communityBy = (emirate: string, slug: string) => COMMUNITIES.find((c) => c.emirate === emirate && c.slug === slug);

export const AR_COMMUNITIES = [
  'dubai-hills-estate', 'meydan-nad-al-sheba', 'tilal-al-ghaf', 'palm-jebel-ali', 'the-oasis-by-emaar', 'yas-island', 'saadiyat-island',
  'arabian-ranches-1-2-3', 'the-valley-by-emaar', 'damac-hills-1-and-2', 'the-lakes-and-emirates-hills', 'jumeirah-islands-and-park',
  'al-furjan', 'the-springs-and-meadows', 'mudon-and-serena', 'villanova-and-the-villa',
];
