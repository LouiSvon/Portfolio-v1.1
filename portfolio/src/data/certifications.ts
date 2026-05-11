import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    titre: { fr: "Notion Workflows Badge", en: "Notion Workflows Badge" },
    organisme: "Notion",
    date: "2026-04",
    expiration: "2028-04",
    lien: "https://verify.skilljar.com/c/ego5gaa7iz2h",
    competences: ["Notion", "Workflows"],
    statut: "obtenu",
  },
  {
    titre: { fr: "Bitcoin Wallet Architecture", en: "Bitcoin Wallet Architecture" },
    organisme: "Plan B Network",
    date: "2026-03",
    lien: "https://planb.academy/fr/exam-certificates/37221242-063c-4bf3-aee7-492d64df3619",
    competences: ["Bitcoin", "Blockchain"],
    statut: "obtenu",
  },
  {
    titre: { fr: "Update Your Online Security", en: "Update Your Online Security" },
    organisme: "Plan B Network",
    date: "2026-03",
    lien: "https://planb.academy/fr/exam-certificates/5777c4b7-6ff9-487b-a5d5-2a5467340fde",
    competences: ["Bitcoin", "Blockchain", "Cybersécurité"],
    statut: "obtenu",
  },
  {
    titre: { fr: "Google Prompting Essentials", en: "Google Prompting Essentials" },
    organisme: "Google / Coursera",
    date: "2026-03",
    lien: "https://www.coursera.org/account/accomplishments/specialization/certificate/GWDZRQ7LQT10",
    competences: ["Intelligence artificielle", "Prompt Engineering"],
    statut: "obtenu",
  },
  {
    titre: { fr: "Certification LVMH", en: "LVMH Certification" },
    organisme: "LVMH",
    date: null,
    lien: null,
    competences: [],
    statut: "en_cours",
  },
];
