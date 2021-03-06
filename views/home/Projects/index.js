import PropTypes from 'prop-types'
import Section from '@components/Section'

import Project from './Project'

const Projects = ({ projects }) => {
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

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
}

export default Projects
