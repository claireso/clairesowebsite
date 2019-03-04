import { Spring } from 'react-spring/renderprops.cjs'
import PropTypes from 'prop-types'

import usePrevious from '@hooks/usePrevious'

import Section from '@components/Section'
import Media from '@components/Media'

const ProjectMedia = ({ project, resetTransition }) => {
  const prevProject = usePrevious(project)

  return (
    <Spring
      from={{ backgroundColor: prevProject ? prevProject.color : '#fff' }}
      to={{ backgroundColor: project.color }}
      reset={resetTransition}
    >
      {styles => (
        <Section style={styles}>
          {project.media.map((media, index) => (
            <Media key={`${project.slug}-${index}`} {...media} />
          ))}
        </Section>
      )}
    </Spring>
  )
}

ProjectMedia.propTypes = {
  project: PropTypes.object.isRequired,
  resetTransition: PropTypes.bool.isRequired
}

export default ProjectMedia
