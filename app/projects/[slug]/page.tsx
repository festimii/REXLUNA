import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PROJECTS } from "@/constants";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <main className="flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        {project.title}
      </h1>
      <div className="mt-10 w-full max-w-4xl flex flex-col items-center gap-6">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="w-full object-contain rounded-lg"
        />
        <p className="text-gray-300 text-center">{project.description}</p>
        <details className="w-full max-w-2xl">
          <summary className="cursor-pointer text-lg font-medium text-white">Technologies Used</summary>
          <ul className="list-disc pl-5 mt-2 text-gray-300">
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </details>
        <details className="w-full max-w-2xl mt-4">
          <summary className="cursor-pointer text-lg font-medium text-white">Brief Overview</summary>
          <p className="mt-2 text-gray-300">{project.brief}</p>
        </details>
        <Link
          href={project.link}
          target="_blank"
          rel="noreferrer noopener"
          className="py-2 px-4 button-primary text-white rounded-lg"
        >
          Visit Site
        </Link>
      </div>
    </main>
  );
}
