export default function EligibilityBanner({
  access,
  diligenceStatus,
}: {
  access: string;
  diligenceStatus: string;
}) {
  return (
    <div className="border border-[var(--line)] bg-[var(--white)] p-5 md:p-6">
      <p className="flex items-center gap-4 font-sans text-[10px] font-light tracking-[0.25em] uppercase text-[var(--grey)] mb-4">
        Market Access
        <span className="flex-1 h-px bg-[var(--line)]" />
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Eligibility
          </p>
          <p className="font-serif text-[1.4rem] font-light tracking-[-0.03em] text-[var(--black)]">
            {access}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-light tracking-[0.2em] uppercase text-[var(--grey)] mb-2">
            Diligence Status
          </p>
          <p className="font-serif text-[1.4rem] font-light tracking-[-0.03em] text-[var(--black)]">
            {diligenceStatus}
          </p>
        </div>
      </div>
      <p className="mt-4 text-[13px] font-light leading-[1.8] text-[var(--grey)] max-w-3xl">
        This is a curated market surface. Access, liquidity participation, and eventual settlement can be
        conditioned on membership, KYC, disclosures, and treasury rules.
      </p>
    </div>
  );
}
