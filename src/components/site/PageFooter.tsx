import Link from "next/link";
import CookieSettingsButton from "@/components/cookies/CookieSettingsButton";
import { CONTACT_INFO, NAVIGATION_GROUPS } from "@/lib/site-navigation";

export default function PageFooter() {
  return (
    <footer className="relative overflow-hidden bg-primary-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%)]" />

 <div className="relative mx-auto w-[92%] py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="max-w-md">
            <div className="space-y-2 text-sm text-white/72">
              <p>{CONTACT_INFO.company}</p>
              <p>IČO: {CONTACT_INFO.ico}</p>
              <p>{CONTACT_INFO.addressLines.join(", ")}</p>
              <p>{CONTACT_INFO.hours}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, "")}`}
                className="rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
              >
                {CONTACT_INFO.phone}
              </Link>
              <Link
                href={`mailto:${CONTACT_INFO.email}`}
                className="rounded-full border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-white/10"
              >
                {CONTACT_INFO.email}
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {NAVIGATION_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
                  {group.title}
                </p>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block text-sm text-white/72 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ESPRON</p>
          <div className="flex flex-wrap items-center gap-5">
            <CookieSettingsButton className="transition-colors hover:text-white">
              COOKIES
            </CookieSettingsButton>
            <Link href="/ochrana-osobnych-udajov" className="transition-colors hover:text-white">
              Ochrana osobných údajov
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
