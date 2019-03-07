import PropTypes from 'prop-types'
import styled from 'styled-components'

import Section from '@components/Section'
import Text from '@components/Text'

const ProjectFullDescriptionWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
`

const FullDescription = ({ project }) => {
  return (
    <Section light>
      <ProjectFullDescriptionWrapper>
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
  project: PropTypes.object.isRequired
}

export default FullDescription
