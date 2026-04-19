export type PageFamily =
  | "about"
  | "contact"
  | "service"
  | "tepovanie"
  | "insulation-main"
  | "insulation-city"
  | "insulation-case-study"
  | "insulation-guide"
  | "faq"
  | "staffing";

export type PageOverride = {
  label: string;
  eyebrow: string;
  family: PageFamily;
  related: string[];
};

export type NavigationGroup = {
  title: string;
  items: Array<{
    href: string;
    label: string;
  }>;
};

export const CONTACT_INFO = {
  company: "ESPRON s.r.o",
  ico: "50915380",
  addressLines: ["Slovenská 31", "Spišská Nová Ves, 05201", "Slovensko"],
  phone: "+421 944 624 685",
  email: "info@espron.sk",
  hours: "Po – Pi · 8:00 – 17:00",
} as const;

export const PAGE_OVERRIDES: Record<string, PageOverride> = {
  "/o-nas": {
    label: "O nás",
    eyebrow: "ESPRON",
    family: "about",
    related: [
      "/zateplenie-fasady",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/interierovy-dizajn",
      "/zateplenie-fasady/trnava",
      "/kontakt",
    ],
  },
  "/kontakt": {
    label: "Kontakt",
    eyebrow: "Spojme sa",
    family: "contact",
    related: [
      "/o-nas",
      "/zateplenie-fasady",
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/svojpomocne",
      "/tepovanie",
    ],
  },
  "/zateplenie-fasady": {
    label: "Zateplenie fasády",
    eyebrow: "Stavebné práce",
    family: "insulation-main",
    related: [
      "/zateplenie-fasady/svojpomocne",
      "/zateplenie-fasady/faq",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/kosice",
      "/zateplenie-fasady/trencin",
      "/zateplenie-fasady/trnava",
    ],
  },

  "/sadrokartonove-prace": {
    label: "Sadrokartónové práce",
    eyebrow: "Stavebné práce",
    family: "service",
    related: [
      "/rucne-omietky",
      "/interierovy-dizajn",
      "/zateplenie-fasady",
      "/kontakt",
    ],
  },
  "/rucne-omietky": {
    label: "Ručné omietky",
    eyebrow: "Stavebné práce",
    family: "service",
    related: [
      "/sadrokartonove-prace",
      "/zateplenie-fasady",
      "/zateplenie-fasady/mineralna-vlna",
      "/kontakt",
    ],
  },
  "/interierovy-dizajn": {
    label: "Interiérový dizajn",
    eyebrow: "Architektonické služby",
    family: "service",
    related: [
      "/o-nas",
      "/sadrokartonove-prace",
      "/rucne-omietky",
      "/kontakt",
    ],
  },
  "/cistenie-fasady": {
    label: "Čistenie fasády",
    eyebrow: "Čistiace práce",
    family: "service",
    related: [
      "/cistenie-dlazby",
      "/tepovanie",
      "/zateplenie-fasady",
      "/kontakt",
    ],
  },
  "/cistenie-dlazby": {
    label: "Čistenie dlažby",
    eyebrow: "Čistiace práce",
    family: "service",
    related: ["/cistenie-fasady", "/tepovanie", "/zateplenie-fasady", "/kontakt"],
  },
  "/tepovanie": {
    label: "Tepovanie",
    eyebrow: "Čistiace práce",
    family: "tepovanie",
    related: [
      "/cistenie-fasady",
      "/cistenie-dlazby",
      "/interierovy-dizajn",
      "/kontakt",
    ],
  },
  "/zateplenie-fasady/bratislava": {
    label: "Zateplenie Bratislava",
    eyebrow: "Lokality",
    family: "insulation-city",
    related: [
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/trencin",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/kosice": {
    label: "Zateplenie Košice",
    eyebrow: "Lokality",
    family: "insulation-city",
    related: [
      "/zateplenie-fasady/trencin",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady",
      "/kontakt",
    ],
  },
  "/zateplenie-fasady/nitra": {
    label: "Zateplenie Nitra",
    eyebrow: "Lokality",
    family: "insulation-city",
    related: [
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady/trencin",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/trencin": {
    label: "Zateplenie Trenčín",
    eyebrow: "Lokality",
    family: "insulation-city",
    related: [
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/kosice",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/trnava": {
    label: "Zateplenie Trnava",
    eyebrow: "Lokality",
    family: "insulation-city",
    related: [
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/svojpomocne",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/mineralna-vlna": {
    label: "Prípadová štúdia Hlohovec",
    eyebrow: "Realizácia",
    family: "insulation-case-study",
    related: [
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/svojpomocne",
      "/zateplenie-fasady/faq",
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/polystyren-biely-sivy": {
    label: "Prípadová štúdia Trnava",
    eyebrow: "Realizácia",
    family: "insulation-case-study",
    related: [
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/svojpomocne",
      "/zateplenie-fasady/faq",
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/svojpomocne": {
    label: "Zateplenie svojpomocne",
    eyebrow: "Praktický návod",
    family: "insulation-guide",
    related: [
      "/zateplenie-fasady/faq",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/nitra",
      "/zateplenie-fasady/trnava",
      "/zateplenie-fasady",
    ],
  },
  "/zateplenie-fasady/faq": {
    label: "FAQ zateplenia",
    eyebrow: "Otázky a odpovede",
    family: "faq",
    related: [
      "/zateplenie-fasady/svojpomocne",
      "/zateplenie-fasady/mineralna-vlna",
      "/zateplenie-fasady/polystyren-biely-sivy",
      "/zateplenie-fasady/bratislava",
      "/zateplenie-fasady",
      "/kontakt",
    ],
  },
} as const;

export const PRIMARY_SUBPAGE_LINKS = [
  { href: "/o-nas", label: "O nás" },
  { href: "/zateplenie-fasady", label: "Zateplenie" },
  { href: "/tepovanie", label: "Tepovanie" },
  { href: "/interierovy-dizajn", label: "Interiérový dizajn" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function isNavigationItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export const NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    title: "Hlavné stránky",
    items: [
      { href: "/", label: "Domov" },
      { href: "/o-nas", label: "O nás" },
      { href: "/blog", label: "Blog" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Stavebné práce",
    items: [
      { href: "/zateplenie-fasady", label: "Zateplenie fasády" },

      { href: "/sadrokartonove-prace", label: "Sadrokartónové práce" },
      { href: "/rucne-omietky", label: "Ručné omietky" },
    ],
  },
  {
    title: "Architektonické služby",
    items: [{ href: "/interierovy-dizajn", label: "Interiérový dizajn" }],
  },
  {
    title: "Čistiace práce",
    items: [
      { href: "/tepovanie", label: "Tepovanie" },
      { href: "/cistenie-fasady", label: "Čistenie fasády" },
      { href: "/cistenie-dlazby", label: "Čistenie dlažby" },
    ],
  },
  {
    title: "Zateplenie v praxi",
    items: [
      { href: "/zateplenie-fasady/svojpomocne", label: "Svojpomocne" },
      { href: "/zateplenie-fasady/faq", label: "FAQ" },
      { href: "/zateplenie-fasady/mineralna-vlna", label: "Hlohovec" },
      {
        href: "/zateplenie-fasady/polystyren-biely-sivy",
        label: "Polystyrén biely a sivý",
      },
      { href: "/zateplenie-fasady/bratislava", label: "Bratislava" },
      { href: "/zateplenie-fasady/nitra", label: "Nitra" },
      { href: "/zateplenie-fasady/kosice", label: "Košice" },
      { href: "/zateplenie-fasady/trencin", label: "Trenčín" },
      { href: "/zateplenie-fasady/trnava", label: "Trnava" },
    ],
  },
];
