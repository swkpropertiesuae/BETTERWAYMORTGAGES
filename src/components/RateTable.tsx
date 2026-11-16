import Link from 'next/link';
import { BANKS, type Bank } from '@/data/banks';

/** 24-bank UAE mortgage lender directory, server-rendered with original bank logos. */
export default function RateTable({ banks = BANKS, limit }: { banks?: Bank[]; limit?: number }) {
  const rows = limit ? banks.slice(0, limit) : banks;
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-white">
      <p className="border-b border-line px-4 py-3 text-xs text-slate">
        UAE licensed mortgage lenders. Individual profit/interest rates, revert margins, floor rates and fees depend on borrower profile and must be confirmed in a written Final Offer Letter.
      </p>
      <table className="table-bw min-w-[780px]">
        <caption className="sr-only">UAE mortgage lender directory</caption>
        <thead>
          <tr>
            <th scope="col">Bank</th>
            <th scope="col">Structure</th>
            <th scope="col">Headquarters</th>
            <th scope="col">Lending profile</th>
            <th scope="col">Guide</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.slug}>
              <th scope="row" className="font-sans font-semibold">
                <Link href={`/rates/${b.slug}`} className="inline-flex items-center gap-2.5 text-navy hover:text-teal">
                  <span className="inline-flex h-7 w-16 shrink-0 items-center justify-center rounded border border-line bg-white px-1.5">
                    <img src={b.logo} alt="" className="max-h-4 w-auto max-w-[52px] object-contain" loading="lazy" decoding="async" />
                  </span>
                  <span>{b.name}</span>
                </Link>
              </th>
              <td className="font-sans text-slate">{b.type}</td>
              <td className="font-sans text-slate">{b.hq}</td>
              <td className="font-sans text-sm text-slate">{b.note}</td>
              <td className="font-sans">
                <Link href={`/rates/${b.slug}`} className="text-sm font-semibold text-teal hover:underline">
                  Review terms →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
