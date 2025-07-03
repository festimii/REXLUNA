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
    <main className="flex flex-col items-center py-20 px-4 space-y-12">
      <h1 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        {project.title}
      </h1>
      <div className="w-full max-w-4xl space-y-8">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="w-full object-contain rounded-lg shadow-lg"
        />
        <p className="text-gray-300 text-center">{project.description}</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-[#2A0E61] rounded-lg space-y-2">
            <h2 className="text-lg font-medium text-white">Technologies Used</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-1">
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 border border-[#2A0E61] rounded-lg space-y-2">
            <h2 className="text-lg font-medium text-white">Brief Overview</h2>
            <p className="text-gray-300">{project.brief}</p>
          </div>
        </div>
        <div className="text-center">
          <Link
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="py-2 px-4 button-primary text-white rounded-lg"
          >
            Visit Site
          </Link>
        </div>
      </div>
    </main>
  );
}
