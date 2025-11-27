export type SectorModule = {
  name: string;
  description: string;
  kpis: string[];
};

export type SectorTemplate = {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  summary: string;
  modules: SectorModule[];
};

export const sectorTemplates: SectorTemplate[] = [
  {
    id: "retail",
    title: "Perakende",
    icon: "🛍️",
    gradient: "from-brand-primary to-brand-secondary",
    summary:
      "Şube, stok, kampanya ve müşteri sadakati yönetimi için esnek modüller.",
    modules: [
      {
        name: "Mağaza & Şube Yönetimi",
        description: "Lokasyon, kasa, vardiya ve ciro takibi",
        kpis: ["Günlük ciro", "Sepet ortalaması", "Dönüşüm oranı"],
      },
      {
        name: "Stok & Lojistik",
        description: "Satın alma, envanter seviyesi, tedarikçi SLA",
        kpis: ["Stok devir hızı", "Tedarik süresi", "Kritik stok uyarıları"],
      },
      {
        name: "Müşteri Deneyimi",
        description: "Sadakat programları, iade yönetimi, NPS",
        kpis: ["NPS", "Tekrar alışveriş", "Kampanya ROI"],
      },
    ],
  },
  {
    id: "manufacturing",
    title: "Üretim",
    icon: "🏭",
    gradient: "from-brand-secondary to-brand-accent",
    summary: "İş emirleri, kalite kontrol ve bakım planlaması için hazır altyapı.",
    modules: [
      {
        name: "Üretim Planlama",
        description: "Hat verimliliği, iş emri ve kapasite planlama",
        kpis: ["OEE", "Hata oranı", "Teslimat performansı"],
      },
      {
        name: "Kalite & Uyum",
        description: "Numune, kontrol planı, izlenebilirlik",
        kpis: ["Duruş süresi", "1. kalite oranı", "İade oranı"],
      },
      {
        name: "Bakım Yönetimi",
        description: "Periyodik bakım, arıza kayıtları, MTTR/MTBF",
        kpis: ["MTTR", "MTBF", "Planlı bakım oranı"],
      },
    ],
  },
  {
    id: "healthcare",
    title: "Sağlık",
    icon: "🩺",
    gradient: "from-brand-accent to-pink-500",
    summary: "Hasta kabul, klinik süreç, kaynak planlama ve faturalama başlıkları.",
    modules: [
      {
        name: "Hasta Yönetimi",
        description: "Randevu, kabul, onam ve hasta yolculuğu",
        kpis: ["Doluluk oranı", "Randevu bekleme süresi", "Taburcu süresi"],
      },
      {
        name: "Klinik Süreç",
        description: "Laboratuvar, görüntüleme, order yönetimi",
        kpis: ["Turnaround time", "Hizmet başı maliyet", "Kritik vaka uyarıları"],
      },
      {
        name: "Faturalama & Sigorta",
        description: "Paket tanımları, provizyon, sigorta kuralları",
        kpis: ["Provizyon onay oranı", "Tahsilat süresi", "Ret oranı"],
      },
    ],
  },
  {
    id: "finance",
    title: "Finans",
    icon: "💳",
    gradient: "from-emerald-400 to-brand-secondary",
    summary: "Portföy, risk, uyum ve müşteri 360 için güçlü veri modeli.",
    modules: [
      {
        name: "Portföy & Ürünler",
        description: "Kredi, mevduat, yatırım ürünleri kurguları",
        kpis: ["Ürün penetrasyonu", "Kârlılık", "Müşteri ömür değeri"],
      },
      {
        name: "Risk & Uyum",
        description: "AML/KYC, skor kartları, politikalar",
        kpis: ["Risk skoru", "Alarm çözüm süresi", "Uyum ihlal sayısı"],
      },
      {
        name: "Operasyon",
        description: "İş akışı, doküman yönetimi, SLA takibi",
        kpis: ["SLA uyumu", "İşlem hacmi", "İşlem süresi"],
      },
    ],
  },
  {
    id: "logistics",
    title: "Lojistik",
    icon: "🚚",
    gradient: "from-orange-400 to-brand-primary",
    summary: "Taşıma, depo, filo ve saha ekipleri için operasyonel görünürlük.",
    modules: [
      {
        name: "Taşıma Yönetimi",
        description: "Sevkiyat, rota, teslimat performansı",
        kpis: ["Zamanında teslimat", "Taşıma maliyeti", "Boşta geçen süre"],
      },
      {
        name: "Depo & Envanter",
        description: "WMS, adresleme, sayım, cross-dock",
        kpis: ["Stok doğruluk", "Sipariş hatası", "Pallet verimliliği"],
      },
      {
        name: "Saha Operasyonları",
        description: "Ekip görevleri, kontrol listeleri, denetimler",
        kpis: ["Tamamlama oranı", "Ziyaret süresi", "Bulgu sayısı"],
      },
    ],
  },
];
