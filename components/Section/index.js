import PropTypes from 'prop-types'
import styled from 'styled-components'

import Container from '../Container'
import { Grid, Cell } from '../Grid'

const SectionWrapper = styled.section`
  padding: 4rem 0;
  background: ${props => (props.light ? '#fff' : 'transparent')};
  will-change: background;
`

const Title = styled(Cell)`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4rem;
  margin: 0 0 1.6rem;
`

const Section = ({ title, name, children, light, style = {} }) => {
  return (
    <SectionWrapper id={name} light={light} style={style}>
      <Container>
        {title && (
          <Grid as="header">
            <Title as="h2" startAt="3" endAt="13">
              {title}
            </Title>
          </Grid>
        )}
        {children}
      </Container>
    </SectionWrapper>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.array
  ]).isRequired,
  light: PropTypes.bool,
  style: PropTypes.object
}

export default Section
