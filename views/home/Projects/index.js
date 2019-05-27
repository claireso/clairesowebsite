import { useProjects } from '@context/projects'

import Section from '@components/Section'

import Project from './Project'

const Projects = () => {
  const projects = useProjects()

  return (
    <Section name="projects" title="Projets">
      <ul>
        {projects.map(project => (
          <Project key={project.slug} project={project} />
        ))}
      </ul>
    </Section>
  )
}

export default Projects
