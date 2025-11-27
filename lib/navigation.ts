export const navItems = [
  { label: "Özet", href: "/" },
  { label: "Sektör Şablonları", href: "#sectors" },
  { label: "KPI & Göstergeler", href: "#metrics" },
  { label: "Güvenlik", href: "#security" },
  { label: "Altyapı", href: "#architecture" },
];

export type Persona = {
  role: string;
  focus: string;
  expectations: string;
};

export const personas: Persona[] = [
  {
    role: "İş Birimi Yöneticisi",
    focus: "Gelir, kârlılık, operasyonel verimlilik",
    expectations: "Hazır KPI panoları, kampanya ve iş akışı yönetimi",
  },
  {
    role: "Operasyon Lideri",
    focus: "SLA takibi, süreç otomasyonu, sahadan veri",
    expectations: "Görev dağıtımı, kontrol listeleri, denetim raporları",
  },
  {
    role: "IT & Veri",
    focus: "Kimlik, yetki, audit, entegrasyon",
    expectations: "RBAC, çoklu tenant, log ve entegrasyon katmanı",
  },
];
