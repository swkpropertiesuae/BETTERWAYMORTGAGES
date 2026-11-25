import type { ReactNode } from 'react';

/** Static layout wrapper (zero scroll-reveal opacity/translate animations). */
export default function MotionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
