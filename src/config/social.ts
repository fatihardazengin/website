import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/fatihardazengin",
        linkTitle: `Follow Fatih Arda Zengin on Github`,
        isActive: true,
    },
    {
        name: "Mail",
        href: "mailto:fatihardazengin@gmail.com",
        linkTitle: `Send an email to Fatih`,
        isActive: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/fatihardazengin",
        linkTitle: `Fatih Arda Zengin on LinkedIn`,
        isActive: true,
    },
    {
        name: "Kaggle",
        href: "https://www.kaggle.com/fatihardazengin",
        linkTitle: `Fatih Arda Zengin on Kaggle`,
        isActive: true,
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    Linkedin: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    RSS: "RSS",
    Kaggle: "Kaggle",
};