type ComparisonTableProps = {
  eyebrow: string;
  heading: string;
  headingEmphasis: string;
};

const TABLE_ROWS = [
  {
    label: "Time to first insight",
    big4: "4–6 weeks",
    freelancer: "Variable",
    fullTime: "3–6 months",
    mach2: "60 minutes",
  },
  {
    label: "Who does the work",
    big4: "Junior team",
    freelancer: "Varies",
    fullTime: "One person",
    mach2: "Senior architect, always",
  },
  {
    label: "Stage fit",
    big4: "Enterprise",
    freelancer: "Any",
    fullTime: "Any",
    mach2: "Series A–B SaaS only",
  },
  {
    label: "Entry cost",
    big4: "€20k–50k+",
    freelancer: "Hourly, unstructured",
    fullTime: "€180k–250k/yr",
    mach2: "Single Diagnosis Call",
  },
  {
    label: "Commitment required",
    big4: "High",
    freelancer: "Medium",
    fullTime: "Very high",
    mach2: "None to start",
  },
] as const;

export default function ComparisonTable({
  eyebrow,
  heading,
  headingEmphasis,
}: ComparisonTableProps) {
  return (
    <section
      id="comparison"
      className="bg-deep-blue py-20 lg:py-[120px] relative"
    >
      <div aria-hidden="true" className="s-top" />

      <div className="wrap">
        <div className="max-w-[640px] mb-[72px]">
          <p className="eyebrow">{eyebrow}</p>
          <h2>
            {heading} <em>{headingEmphasis}</em>
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left pb-5 pr-4 w-[220px]" />
                <th className="text-left font-mono text-[10px] tracking-[0.1em] uppercase text-grey-700 pb-5 px-4 font-medium">
                  Big 4 / Agency
                </th>
                <th className="text-left font-mono text-[10px] tracking-[0.1em] uppercase text-grey-700 pb-5 px-4 font-medium">
                  Generalist Freelancer
                </th>
                <th className="text-left font-mono text-[10px] tracking-[0.1em] uppercase text-grey-700 pb-5 px-4 font-medium">
                  Full-Time Hire
                </th>
                <th
                  className="text-left font-mono text-[10px] tracking-[0.1em] uppercase text-electric-cyan pb-5 px-4 font-bold"
                  style={{ background: "rgba(0,229,255,0.06)" }}
                >
                  MaCh2.Cloud
                </th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-white/[0.05]">
                  <td className="font-mono text-[11px] text-grey-mid py-4 pr-4">
                    {row.label}
                  </td>
                  <td className="font-body text-[13px] text-grey-700 py-4 px-4">
                    {row.big4}
                  </td>
                  <td className="font-body text-[13px] text-grey-700 py-4 px-4">
                    {row.freelancer}
                  </td>
                  <td className="font-body text-[13px] text-grey-700 py-4 px-4">
                    {row.fullTime}
                  </td>
                  <td
                    className="font-body text-[13px] font-semibold text-electric-cyan py-4 px-4"
                    style={{ background: "rgba(0,229,255,0.06)" }}
                  >
                    {row.mach2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked cards — label + MaCh2.Cloud value only */}
        <div className="md:hidden space-y-3">
          {TABLE_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 p-4 rounded-card border border-electric-cyan/15"
              style={{ background: "rgba(0,229,255,0.03)" }}
            >
              <span className="font-mono text-[11px] text-grey-mid">
                {row.label}
              </span>
              <span className="font-body text-[13px] font-semibold text-electric-cyan text-right">
                {row.mach2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
