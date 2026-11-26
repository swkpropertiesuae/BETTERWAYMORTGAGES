'use client';

import { useState } from 'react';
import {
  Building2,
  Car,
  Compass,
  Crosshair,
  ExternalLink,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Train,
} from 'lucide-react';
import { SITE, fullAddress } from '@/data/site';

type LandmarkPin = {
  id: string;
  label: string;
  distance: string;
  note: string;
  xPct: number;
  yPct: number;
  kind: 'metro' | 'hospital' | 'road' | 'club';
};

const LANDMARKS: LandmarkPin[] = [
  {
    id: 'metro',
    label: 'Oud Metha Metro',
    distance: '4 min walk',
    note: 'Green Line Exit 1 · Direct link from DIFC (via BurJuman), Dubai Creek & DXB Airport.',
    xPct: 64.7,
    yPct: 21.9,
    kind: 'metro',
  },
  {
    id: 'club',
    label: 'Al Nasr Club',
    distance: '2 min walk',
    note: 'Immediately east of Al Nasr Plaza across Street 10, with public RTA parking bays.',
    xPct: 57.1,
    yPct: 43.2,
    kind: 'club',
  },
  {
    id: 'hospital',
    label: 'American Hospital',
    distance: '3 min walk',
    note: 'Landmark reference directly across Oud Metha Street 15 from our advisory desk.',
    xPct: 60.5,
    yPct: 58.2,
    kind: 'hospital',
  },
  {
    id: 'road',
    label: 'Oud Metha Rd (D79)',
    distance: '8 min to DIFC',
    note: 'Fast highway access via Sheikh Rashid Rd (E11) & Al Ain Rd (E66) from Downtown & DIFC.',
    xPct: 70.2,
    yPct: 72.0,
    kind: 'road',
  },
];

/**
 * Zero-Fail Interactive Dubai Office Location Map for /contact.
 * Primary tab renders real bilingual GPS-accurate Dubai Oud Metha cartography with interactive
 * zoom, clickable transit landmarks, and a pulsing Betterway HQ pin (zero iframe blackout risk).
 * Secondary tabs provide the live OpenStreetMap embed (CSP-allowed) and structured Directions cards.
 */
export default function ContactLocationMap() {
  const [mapMode, setMapMode] = useState<'interactive' | 'osm' | 'landmarks'>('interactive');
  const [zoom, setZoom] = useState<number>(1);
  const [selectedPin, setSelectedPin] = useState<string | null>(null);

  const lat = 25.2368;
  const lng = 55.3102;
  const q = encodeURIComponent(`${SITE.address.building}, ${SITE.address.street}, ${SITE.address.district}, Dubai`);
  const activeLandmark = LANDMARKS.find((l) => l.id === selectedPin) ?? null;

  const zoomIn = () => setZoom((z) => Math.min(1.8, Number((z + 0.25).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(1, Number((z - 0.25).toFixed(2))));
  const resetView = () => {
    setZoom(1);
    setSelectedPin(null);
  };

  return (
    <div className="bw-beam-box overflow-hidden rounded-[26px] border border-[#e5eaf0] bg-white">
      {/* Top Bar: Address + View Mode Switcher + 1-Click Navigation Apps */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf1f5] bg-[#fbfcfd] px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-[#0b0f17] text-[#f1d57e]">
            <MapPin size={18} />
          </span>
          <div>
            <p className="font-display text-base font-bold text-[#080b0f]">
              Al Nasr Plaza · Oud Metha, Dubai
            </p>
            <p className="text-xs text-[#4f596b]">{fullAddress}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Dubai office map view"
            className="inline-flex rounded-full border border-[#e2e8f0] bg-white p-1 text-xs font-semibold"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mapMode === 'interactive'}
              onClick={() => setMapMode('interactive')}
              className={`rounded-full px-3 py-1 transition cursor-pointer ${
                mapMode === 'interactive'
                  ? 'bg-[#0b0f17] text-white shadow-sm'
                  : 'bg-transparent text-[#4f596b] hover:text-[#080b0f]'
              }`}
            >
              Interactive Map
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mapMode === 'osm'}
              onClick={() => setMapMode('osm')}
              className={`rounded-full px-3 py-1 transition cursor-pointer ${
                mapMode === 'osm'
                  ? 'bg-[#0b0f17] text-white shadow-sm'
                  : 'bg-transparent text-[#4f596b] hover:text-[#080b0f]'
              }`}
            >
              Live Street Embed
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mapMode === 'landmarks'}
              onClick={() => setMapMode('landmarks')}
              className={`rounded-full px-3 py-1 transition cursor-pointer ${
                mapMode === 'landmarks'
                  ? 'bg-[#0b0f17] text-white shadow-sm'
                  : 'bg-transparent text-[#4f596b] hover:text-[#080b0f]'
              }`}
            >
              Directions &amp; Landmarks
            </button>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#0b0f17] px-3.5 text-xs font-bold text-white transition hover:bg-[#1e293b]"
          >
            <Navigation size={13} className="text-[#f1d57e]" />
            Google Maps
            <ExternalLink size={11} />
          </a>
          <a
            href={`https://maps.apple.com/?daddr=${lat},${lng}&q=Betterway+Mortgages+Al+Nasr+Plaza+Dubai`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#d6dfe8] bg-white px-3.5 text-xs font-bold text-[#080b0f] transition hover:border-[#080b0f]"
          >
            Apple Maps
          </a>
          <a
            href={`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#d6dfe8] bg-white px-3.5 text-xs font-bold text-[#080b0f] transition hover:border-[#080b0f]"
          >
            Waze
          </a>
        </div>
      </div>

      {/* Main Map Stage */}
      {mapMode === 'interactive' && (
        <div className="relative h-[440px] w-full overflow-hidden bg-[#f4f1e8] select-none">
          {/* Zoomable Real Bilingual Dubai Oud Metha Cartography Layer */}
          <div
            className="relative h-full w-full transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})`, transformOrigin: '50% 50%' }}
          >
            <img
              src="/images/dubai-oud-metha-map.webp"
              alt="Detailed street map of Oud Metha, Dubai showing Betterway Mortgages at Al Nasr Plaza, Oud Metha Road (D79), Al Nasr Club, and Oud Metha Metro Station"
              width={1520}
              height={680}
              className="h-full w-full object-cover object-center"
            />

            {/* Subtle vignette along outer edges for executive contrast */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, transparent 56%, rgba(8, 11, 15, 0.16) 100%)',
              }}
            />

            {/* Clickable Dubai Landmark Pins */}
            {LANDMARKS.map((lm) => {
              const isSelected = selectedPin === lm.id;
              return (
                <button
                  key={lm.id}
                  type="button"
                  onClick={() => setSelectedPin(isSelected ? null : lm.id)}
                  style={{ left: `${lm.xPct}%`, top: `${lm.yPct}%` }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold shadow-md transition cursor-pointer ${
                    isSelected
                      ? 'scale-105 border-[#d7b158] bg-[#0b0f17] text-[#f1d57e] shadow-xl'
                      : 'border-[#0b0f17]/15 bg-white/95 text-[#080b0f] hover:border-[#0b0f17] hover:bg-white'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      lm.kind === 'metro'
                        ? 'bg-[#0e6954]'
                        : lm.kind === 'road'
                        ? 'bg-[#b8861d]'
                        : 'bg-[#0b0f17]'
                    }`}
                  />
                  <span className="whitespace-nowrap">{lm.label}</span>
                  <span className="hidden text-[10px] font-semibold opacity-75 sm:inline">
                    · {lm.distance}
                  </span>
                </button>
              );
            })}

            {/* Exact GPS Betterway Mortgages HQ Pulsing Pin (25.2368° N, 55.3102° E) */}
            <button
              type="button"
              onClick={resetView}
              aria-label="Betterway Mortgages HQ, Al Nasr Plaza, Oud Metha, Dubai"
              style={{ left: '50%', top: '50%' }}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            >
              <span className="absolute -inset-4 animate-ping rounded-full bg-[#d7b158]/35" />
              <span className="absolute -inset-2 rounded-full bg-[#0e6954]/20 ring-2 ring-[#d7b158]/60" />
              <span className="relative flex items-center gap-2 rounded-full border-2 border-[#d7b158] bg-[#0b0f17] px-3.5 py-2 text-white shadow-[0_14px_34px_-6px_rgba(8,11,15,0.65)] transition group-hover:scale-105">
                <img
                  src="/brand/icon.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain"
                />
                <span className="text-start leading-tight">
                  <span className="block font-display text-xs font-bold tracking-tight text-white">
                    Betterway Mortgages
                  </span>
                  <span className="block text-[10px] font-semibold text-[#f1d57e]">
                    Al Nasr Plaza · Oud Metha
                  </span>
                </span>
              </span>
            </button>
          </div>

          {/* Interactive Zoom & Center Controls */}
          <div className="absolute end-4 top-4 z-20 flex flex-col overflow-hidden rounded-[14px] border border-[#0b0f17]/15 bg-white/95 shadow-lg backdrop-blur-md">
            <button
              type="button"
              onClick={zoomIn}
              aria-label="Zoom in map"
              className="grid h-9 w-9 place-items-center text-[#080b0f] transition hover:bg-[#f1f5f9] cursor-pointer"
            >
              <Plus size={16} />
            </button>
            <button
              type="button"
              onClick={zoomOut}
              aria-label="Zoom out map"
              className="grid h-9 w-9 place-items-center border-t border-[#e5eaf0] text-[#080b0f] transition hover:bg-[#f1f5f9] cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <button
              type="button"
              onClick={resetView}
              aria-label="Center on Betterway Mortgages"
              className="grid h-9 w-9 place-items-center border-t border-[#e5eaf0] text-[#0e6954] transition hover:bg-[#f1f5f9] cursor-pointer"
            >
              <Crosshair size={15} />
            </button>
          </div>

          {/* Floating Betterway Office / Selected Landmark Info Card */}
          <div className="absolute bottom-4 start-4 z-20 max-w-sm rounded-[18px] border border-white/25 bg-[#0b0f17]/94 px-4 py-3 text-white shadow-2xl backdrop-blur-md">
            {activeLandmark ? (
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-xs font-bold text-[#f1d57e]">
                    {activeLandmark.label} · {activeLandmark.distance}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedPin(null)}
                    className="text-[10px] font-semibold text-white/65 hover:text-white cursor-pointer"
                  >
                    HQ Pin
                  </button>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-white/85">{activeLandmark.note}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src="/brand/icon.png"
                  alt=""
                  width={26}
                  height={26}
                  className="h-6 w-6 shrink-0 object-contain"
                />
                <div className="text-xs">
                  <p className="font-display font-bold text-white">Betterway Mortgages LLC</p>
                  <p className="text-[11px] text-[#f1d57e]">
                    Al Nasr Plaza · Plot 319-310 · 25.2368° N, 55.3102° E
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Cartographic Attribution Pill */}
          <div className="pointer-events-none absolute bottom-4 end-4 z-20 hidden rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#475569] shadow-sm sm:block">
            © Esri · OpenStreetMap contributors · Zoom {Math.round(zoom * 100)}%
          </div>
        </div>
      )}

      {mapMode === 'osm' && (
        <div className="relative h-[440px] w-full bg-[#f4f1e8]">
          <iframe
            title="Live OpenStreetMap to Betterway Mortgages, Al Nasr Plaza, Oud Metha, Dubai"
            className="h-full w-full border-0"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=55.3025%2C25.2315%2C55.3180%2C25.2422&layer=mapnik&marker=${lat}%2C${lng}`}
          />
          <div className="pointer-events-none absolute bottom-4 start-4 z-20 flex items-center gap-2.5 rounded-[16px] border border-white/25 bg-[#0b0f17]/92 px-4 py-2.5 text-white shadow-xl backdrop-blur-md">
            <img src="/brand/icon.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
            <div className="text-xs">
              <p className="font-display font-bold text-white">Betterway Mortgages LLC</p>
              <p className="text-[11px] text-[#f1d57e]">Office · Al Nasr Plaza · 25.2368° N, 55.3102° E</p>
            </div>
          </div>
        </div>
      )}

      {mapMode === 'landmarks' && (
        <div className="grid gap-6 p-7 md:grid-cols-3">
          {[
            {
              icon: Train,
              title: 'Oud Metha Metro (Green Line)',
              metric: '4 min walk',
              desc: 'Exit 1 toward Oud Metha Road & Al Nasr Plaza Towers. Direct metro access from Dubai Creek, DIFC (via BurJuman), and DXB Airport.',
            },
            {
              icon: Car,
              title: 'Driving & Visitor Parking',
              metric: '8 min from DIFC',
              desc: 'Immediate access via Oud Metha Road (D79/E66) and Sheikh Rashid Road. Dedicated RTA & Al Nasr Plaza basement visitor parking available.',
            },
            {
              icon: Building2,
              title: 'In-Person 1-on-1 Advisory',
              metric: 'Mon–Sat · 9am–7pm',
              desc: 'Bring your Emirates ID, passport copy, and property booking details for a live 24-bank written Final Offer Letter review in our private boardroom.',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-[20px] border border-[#e5eaf0] bg-[#fbfcfd] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#0b0f17] text-[#f1d57e]">
                    <Icon size={18} />
                  </span>
                  <span className="rounded-full bg-[#eef7f4] px-3 py-1 text-xs font-bold text-[#0e6954]">
                    {card.metric}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-[#080b0f]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4f596b]">{card.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Transit & Distance Bar */}
      <div className="grid gap-3 border-t border-[#edf1f5] bg-[#fbfcfd] px-6 py-3.5 text-xs font-medium text-[#475569] sm:grid-cols-3">
        <span className="inline-flex items-center gap-2">
          <Train size={14} className="text-[#0e6954]" /> 4 mins walk · Oud Metha Metro Station
        </span>
        <span className="inline-flex items-center gap-2">
          <Compass size={14} className="text-[#b8861d]" /> 8 mins drive · DIFC &amp; Downtown Dubai
        </span>
        <span className="inline-flex items-center gap-2">
          <Car size={14} className="text-[#080b0f]" /> Visitor parking · Al Nasr Plaza, Oud Metha
        </span>
      </div>
    </div>
  );
}
