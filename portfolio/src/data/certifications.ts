import type { CertificationSecteur } from "@/types";

export const certificationsBySector: CertificationSecteur[] = [
  {
    secteur: { fr: "Crypto & Blockchain", en: "Crypto & Blockchain" },
    logo: "bitcoin",
    certifs: [
      {
        titre: { fr: "Architecture du portefeuille Bitcoin", en: "Bitcoin Wallet Architecture" },
        organisme: "Plan ₿ Network",
        date: { fr: "Mars 2026", en: "March 2026" },
        lien: "https://planb.academy/fr/exam-certificates/37221242-063c-4bf3-aee7-492d64df3619",
        competences: ["Bitcoin", "Blockchain"],
        statut: "obtenu",
      },
      {
        titre: { fr: "Sécurité informatique & gestion des données", en: "Update Your Online Security" },
        organisme: "Plan ₿ Network",
        date: { fr: "26/03/2026 (certificat de fin de cours)", en: "26 March 2026 (course completion certificate)" },
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
        date: { fr: "Mars 2026", en: "March 2026" },
        lien: "https://www.coursera.org/account/accomplishments/specialization/certificate/GWDZRQ7LQT10",
        competences: ["IA", "Prompt Engineering"],
        statut: "obtenu",
        logo: "google",
      },
    ],
  },
  {
    secteur: { fr: "Outils & Productivité", en: "Tools & Productivity" },
    logo: "notion",
    certifs: [
      {
        titre: { fr: "Notion Workflows Quiz", en: "Notion Workflows Quiz" },
        organisme: "Notion Academy & Certifications",
        date: { fr: "14/04/2026", en: "14 April 2026" },
        expiration: { fr: "14/04/2028", en: "14 April 2028" },
        lien: "https://verify.skilljar.com/c/ego5gaa7iz2h",
        competences: ["Notion", "Workflows"],
        statut: "obtenu",
      },
    ],
  },
];
