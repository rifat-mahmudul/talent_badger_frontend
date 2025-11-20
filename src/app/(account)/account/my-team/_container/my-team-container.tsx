import { ProjectCard } from "./project-card"


export default function MyTeamContainer() {
  const projects = [
    {
      id: 1,
      title: "Website Redesign Project",
      description:
        "Skilled software engineers, developers, and architects with deep knowledge across a wide range of technologies.",
      progress: 85,
      team: [
        { id: 1, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 2, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 3, name: "Matthew Warkentin", role: "Developer", status: "active" },
      ],
    },
    {
      id: 2,
      title: "Website Redesign Project",
      description:
        "Skilled software engineers, developers, and architects with deep knowledge across a wide range of technologies.",
      progress: 85,
      team: [
        { id: 1, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 2, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 3, name: "Matthew Warkentin", role: "Developer", status: "active" },
      ],
    },
    {
      id: 3,
      title: "Website Redesign Project",
      description:
        "Skilled software engineers, developers, and architects with deep knowledge across a wide range of technologies.",
      progress: 85,
      team: [
        { id: 1, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 2, name: "Matthew Warkentin", role: "Developer", status: "active" },
        { id: 3, name: "Matthew Warkentin", role: "Developer", status: "active" },
      ],
    },
  ]

  return (
    <main className="">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project || ""} />
          ))}
        </div>
    </main>
  )
}

