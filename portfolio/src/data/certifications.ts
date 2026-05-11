import type { CertificationSecteur } from "@/types";

export const certificationsBySector: CertificationSecteur[] = [
  {
    secteur: { fr: "Crypto & Blockchain", en: "Crypto & Blockchain" },
    logo: "bitcoin",
    certifs: [
      {
        titre: { fr: "Bitcoin Wallet Architecture", en: "Bitcoin Wallet Architecture" },
        organisme: "Plan B Network",
        date: "Mars 2026",
        lien: "https://planb.academy/fr/exam-certificates/37221242-063c-4bf3-aee7-492d64df3619",
        competences: ["Bitcoin", "Blockchain"],
        statut: "obtenu",
      },
      {
        titre: { fr: "Update Your Online Security", en: "Update Your Online Security" },
        organisme: "Plan B Network",
        date: "Mars 2026",
        lien: "https://planb.academy/fr/exam-certificates/5777c4b7-6ff9-487b-a5d5-2a5467340fde",
        competences: ["Bitcoin", "Blockchain", "Cybersécurité"],
        statut: "obtenu",
      },
    ],
  },
  {
    secteur: { fr: "Intelligence artificielle", en: "Artificial Intelligence" },
    certifs: [
      {
        titre: { fr: "Google Prompting Essentials", en: "Google Prompting Essentials" },
        organisme: "Google / Coursera",
        date: "Mars 2026",
        lien: "https://www.coursera.org/account/accomplishments/specialization/certificate/GWDZRQ7LQT10",
        competences: ["IA", "Prompt Engineering"],
        statut: "obtenu",
        logo: "google",
      },
      {
        titre: { fr: "Certification LVMH", en: "LVMH Certification" },
        organisme: "LVMH",
        date: null,
        lien: null,
        competences: [],
        statut: "en_cours",
      },
    ],
  },
  {
    secteur: { fr: "Outils & Productivité", en: "Tools & Productivity" },
    logo: "notion",
    certifs: [
      {
        titre: { fr: "Notion Workflows Badge", en: "Notion Workflows Badge" },
        organisme: "Notion",
        date: "Avr. 2026",
        expiration: "Avr. 2028",
        lien: "https://verify.skilljar.com/c/ego5gaa7iz2h",
        competences: ["Notion", "Workflows"],
        statut: "obtenu",
      },
    ],
  },
];
