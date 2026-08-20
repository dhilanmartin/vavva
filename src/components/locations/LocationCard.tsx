/* One location, as a ledger entry.
   ===========================================================================

   Rebuilt 2026-08-19. It was a line-art skyline illustration above a centred
   name, address and status — three problems in one card:

   THE SKYLINE WAS A THIRD ILLUSTRATION LANGUAGE. The landing is pixel art,
   the product frames are photography, and this was fine-line vector. Three
   drawing styles on a four-page site is most of what made it read as
   assembled rather than authored, and this was the easiest of the three to
   lose because it carried no information — it was a generic Manhattan
   skyline standing in for a specific address on Mercer Street.

   IT WAS CENTRED, and it was the same shape as every other interior page:
   one small centred block adrift in a wide white field.

   AND THE ADDRESS WAS BODY COPY. An address is the single most ledger-like
   thing on the site — it is the fact the whole thesis rests on — so it is
   ledger type now, at the same 11px as the price on a tee and the copyright
   in the footer.

   The status keeps `--red`: "Open Soon" is precisely a thing that does not
   exist yet, which is what red is reserved for. */

import { ScrollReveal } from "@/components/reveal/ScrollReveal";

export function LocationCard({
  name,
  address,
  status,
}: {
  name: string;
  address: string[];
  status: string;
}) {
  return (
    <ScrollReveal className="flex flex-col gap-4">
      <h2 className="vv-statement">{name}</h2>

      <div className="flex flex-col gap-2">
        <p className="vv-ledger vv-ledger-mute">
          {address.map((line) => (
            <span key={line} className="block leading-[1.6]">
              {line}
            </span>
          ))}
        </p>
        <p className="vv-ledger vv-ledger-red">{status}</p>
      </div>
    </ScrollReveal>
  );
}
