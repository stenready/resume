export const STORAGE_KEYS = {
  LOCALE: 'current-locale',
  THEME: 'current-theme',
} as const

export const THEMES = {
  dark: 'dark',
  light: 'light',
} as const

export type Theme = (typeof THEMES)[keyof typeof THEMES]

export const SECTIONS_NAMES = {
  ABOUT_ME: 'about',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  ARTICLES: 'articles',
  CONTACTS: 'contacts',
} as const

export type SectionName = (typeof SECTIONS_NAMES)[keyof typeof SECTIONS_NAMES]

const EMAIL = 's.radchenko.develop@gmail.com'

export const EXTERNAL_LINK_ATTRS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const

export interface SocialContact {
  name: string
  label?: string
  icon: string
  href: string
  isExternal?: boolean
}

export type SocialContactKey =
  | 'email'
  | 'linkedIn'
  | 'telegram'
  | 'instagram'
  | 'whatsApp'
  | 'viber'
  | 'github'

export const SOCIAL_CONTACTS: Record<SocialContactKey, SocialContact> = {
  email: {
    name: 'Email',
    label: EMAIL,
    icon: 'fa-solid fa-envelope',
    href: `mailto:${EMAIL}`,
  },
  linkedIn: {
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    href: 'https://www.linkedin.com/in/stanislav-radchenko-639122205/',
    isExternal: true,
  },
  telegram: {
    name: 'Telegram',
    icon: 'fa-brands fa-telegram',
    href: 'https://t.me/stenready',
    isExternal: true,
  },
  instagram: {
    name: 'Instagram',
    icon: 'fa-brands fa-instagram',
    href: 'https://www.instagram.com/readysten/',
    isExternal: true,
  },
  whatsApp: {
    name: 'WhatsApp',
    icon: 'fa-brands fa-whatsapp',
    href: 'https://wa.me/380987618744',
    isExternal: true,
  },
  viber: {
    name: 'Viber',
    icon: 'fa-brands fa-viber',
    href: 'viber://chat?number=%2B380987618744',
  },
  github: {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    href: 'https://github.com/stenready/resume',
    isExternal: true,
  },
}

export const PLANETA_KINO_URL = 'https://planetakino.ua/'
