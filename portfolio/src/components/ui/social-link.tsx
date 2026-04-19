import type { Social } from "@/types";

export function SocialLink({ social }: { social: Social }) {
  const isEmail = social.url.startsWith("mailto:");

  return (
    <a
      href={social.url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="text-sm text-secondary hover:text-accent transition-colors duration-150"
    >
      {social.name}
    </a>
  );
}
