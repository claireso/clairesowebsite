import PropTypes from 'prop-types'

import Section from '@components/Section'
import Media from '@components/Media'

const ProjectMedia = ({ project }) => {
  return (
    <Section style={{ backgroundColor: project.color }}>
      {project.media.map((media, index) => (
        <Media key={`${project.slug}-${index}`} {...media} />
      ))}
    </Section>
  )
}

ProjectMedia.propTypes = {
  project: PropTypes.object.isRequired
}

export default ProjectMedia
