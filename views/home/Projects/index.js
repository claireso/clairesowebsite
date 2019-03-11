import { useContext } from 'react'

import projectsContext from '@context/projects'

import Section from '@components/Section'

import Project from './Project'

const Projects = () => {
  const projects = useContext(projectsContext)

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
