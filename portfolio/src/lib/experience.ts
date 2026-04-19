import type { Experience } from "@/types";

export type ExperienceSectionKey = "education" | "personal" | "professional";

export type ExperienceSection = {
  key: ExperienceSectionKey;
  items: Experience[];
};

const personalExperienceTypes = new Set<Experience["type"]>([
  "personal",
  "volunteering",
]);

function sortByStartDate(
  items: Experience[],
  direction: "asc" | "desc"
): Experience[] {
  return [...items].sort((a, b) => {
    const comparison = a.startDate.localeCompare(b.startDate);
    return direction === "asc" ? comparison : -comparison;
  });
}

export function getExperienceSections(items: Experience[]): ExperienceSection[] {
  return [
    {
      key: "education",
      items: sortByStartDate(
        items.filter((experience) => experience.type === "education"),
        "asc"
      ),
    },
    {
      key: "personal",
      items: sortByStartDate(
        items.filter((experience) =>
          personalExperienceTypes.has(experience.type)
        ),
        "asc"
      ),
    },
    {
      key: "professional",
      items: sortByStartDate(
        items.filter((experience) => experience.type === "professional"),
        "desc"
      ),
    },
  ];
}
