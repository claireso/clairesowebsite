import PropTypes from 'prop-types'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

import Section from '@components/Section'
import Text from '@components/Text'

const ProjectFullDescriptionWrapper = animated(styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`)

const FullDescription = ({ resetTransition, project }) => {
  const styles = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 10px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    delay: 430,
    reset: resetTransition
  })

  return (
    <Section light>
      <ProjectFullDescriptionWrapper style={styles}>
        {project.full_description.map((content, index) => (
          <Text
            key={`${project.slug}-full-description-${index}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ))}
      </ProjectFullDescriptionWrapper>
    </Section>
  )
}

FullDescription.propTypes = {
  project: PropTypes.object.isRequired,
  resetTransition: PropTypes.bool.isRequired
}

export default FullDescription
