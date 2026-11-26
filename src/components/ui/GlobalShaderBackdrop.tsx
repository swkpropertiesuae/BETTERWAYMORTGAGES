'use client';

import { ShaderArt } from '@/components/ui/shader-art';

/**
 * 100% Site-Wide Consistent Living WebGL Backdrop powered by ShaderArt.
 * Fixed behind all 435 pages (English, Arabic, Russian, Chinese, French, Spanish) so every
 * section below the hero flows directly over a single unified corporate fintech light canvas.
 */
export default function GlobalShaderBackdrop() {
  return (
    <ShaderArt
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-dvh w-screen"
      colors={{
        base: '#f6f8fb',
        accent: '#15a681',
        ink: '#0a1424',
      }}
      intensity={0.32}
      interactive
      scale={1.3}
      speed={0.62}
    />
  );
}
