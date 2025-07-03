import { FaYoutube, FaFacebook } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    link: "https://facebook.com",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://twitter.com",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "QKSS - Map Pin ",
    slug: "qkss-map-pin",
    description:
      "The QKSS Map Pin platform is a comprehensive monitoring tool designed to track and document events that influence interethnic relations in Kosovo. It serves as a resource to support early warning mechanisms, informed policy analysis, and initiatives aimed at fostering dialogue and building trust among communities.By systematically collecting and mapping incidents and developments, the platform offers real-time insight into dynamics that may impact social cohesion, security, and stability.",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
    brief:
      "A robust monitoring solution providing real-time insights on interethnic relations to aid policy analysis and community dialogue.",
    image: "/projects/project-1.png",
    link: "https://imap.qkss.org/",
  },
  {
    title: "Interactive Cards Portfolio",
    slug: "interactive-cards-portfolio",
    description:
      'Step into the extraordinary world of my professional journey through the "Interactive Cards Portfolio" - an innovative and visually captivating platform that redefines the traditional portfolio experience. Ditching the conventional static layout, this portfolio leverages interactive cards to showcase my skills, projects, and personality in an engaging and dynamic manner.',
    technologies: ["React", "Framer Motion", "CSS"],
    brief:
      "An engaging portfolio site featuring animated cards that highlight skills and projects in a memorable format.",
    image: "/projects/project-2.png",
    link: "https://example.com",
  },
  {
    title: "Space Themed Website",
    slug: "space-themed-website",
    description:
      'Embark on an interstellar journey with my "Space Themed Website", a mesmerizing space-themed website that invites you to explore the cosmic wonders beyond our world. Immerse yourself in an awe-inspiring digital experience that blends cutting-edge design with the mysteries of the universe.',
    technologies: ["React", "Three.js", "Next.js"],
    brief:
      "A captivating site that combines sleek design with space-inspired visuals to deliver an immersive browsing experience.",
    image: "/projects/project-3.png",
    link: "https://example.com",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/festimii",
      },
      {
        name: "Discord",
        icon: RxDiscordLogo,
        link: "https://discord.com",
      },
    ],
  },
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://instagram.com",
      },
      {
        name: "Twitter",
        icon: RxTwitterLogo,
        link: "https://twitter.com",
      },
      {
        name: "Linkedin",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com",
      },
    ],
  },
  {
    title: "About",
    data: [
      {
        name: "Contact US",
        icon: null,
        link: "mailto:festimii200@gmail.com",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "/contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/festimii",
};

export const FEATURES = [
  {
    title: "Custom Web Development",
    description:
      "We build fast, modern, and responsive websites tailored to your brand and goals.",
  },
  {
    title: "Mobile App Development",
    description:
      "Launch cross-platform apps for iOS and Android that deliver smooth user experiences.",
  },
  {
    title: "Cloud & Infrastructure",
    description:
      "Deploy reliable, scalable systems on top-tier cloud infrastructure like AWS and Azure.",
  },
  {
    title: "Cloud Consulting",
    description:
      "Get expert advice to make the most of cloud technology—secure, scalable, and cost-effective.",
  },
  {
    title: "UI/UX Design",
    description:
      "We craft user-first designs that look stunning and feel effortless to use.",
  },
  {
    title: "API Integration",
    description:
      "Connect your systems with third-party APIs for automation, insights, and new features.",
  },
  {
    title: "DevOps & CI/CD",
    description:
      "Speed up your development with automated CI/CD pipelines and DevOps best practices.",
  },
  {
    title: "Security Auditing",
    description:
      "Protect your app and data with in-depth security reviews and actionable insights.",
  },
  {
    title: "Maintenance & Support",
    description:
      "Ongoing support, updates, and monitoring to keep your software running smoothly.",
  },
] as const;

export const PARTNERS = [
  {
    name: "Qendra Kosovare për Studime të Sigurisë(QKSS)",
    logo: "/partners/qkss_logo_blue-en_1.png",
    link: "https://qkss.org/",
  },
  {
    name: "Ministria e Puneve te Brendshme e Kosoves",
    logo: "/partners/Emblem_of_the_Republic_of_Kosovo.svg.png",
    link: "https://mpb.rks-gov.net/",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Alice Johnson",
    role: "Head of Digital Strategy at NexaDigital",
    image: "/testimonials/alice.jpg",
    quote:
      "DEXLUNA brought our vision to life with a clean, scalable platform that exceeded all expectations.",
  },
  {
    name: "Carlos Diaz",
    role: "CTO at InnovateX",
    image: "/testimonials/marie.jpg",
    quote:
      "The team’s technical depth and proactive communication made every milestone smooth and successful.",
  },
  {
    name: "Marie Curie",
    role: "Founder of BrightIdeas",
    image: "/testimonials/carlos.jpg",
    quote:
      "From concept to launch, DEXLUNA delivered with professionalism, creativity, and attention to detail.",
  },
] as const;
