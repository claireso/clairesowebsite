import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import Container from '@components/Container'
import { Grid, Cell } from '@components/Grid'
import { BackLink } from '@components/Link'

const StyledHeader = styled(Container)`
  padding-top: 3.2rem;
  padding-bottom: 7.2rem;

  > a {
    margin: 0 0 4rem;
  }
`

const ProjectTitle = styled.h1`
  font-size: 7.6rem;
  font-weight: 400;
  margin: 0 0 0.8rem;
  text-align: center;
  will-change: transform;
`

const ProjectDetails = styled.span`
  color: var(--secondaryColor);
  display: block;
  font-size: 2rem;
  text-align: center;
  will-change: transform;
`

const ProjectDescription = styled.p`
  font-size: 3.2rem;
  line-height: 4rem;
  margin: 3.2rem 0 0;
  text-align: center;
  will-change: transform;
`

const ProjectLink = styled.a`
  border-bottom: 1px solid transparent;
  color: var(--primaryColor);
  font-size: 2rem;
  transition: border 150ms ease-out;

  .no-touch &:hover {
    border-color: var(--primaryColor);
  }
`

class Header extends React.PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired
  }

  render() {
    const { project } = this.props

    return (
      <StyledHeader>
        <Link href="/" passHref scroll={false}>
          <BackLink>Retour</BackLink>
        </Link>

        <ProjectTitle>{project.title}</ProjectTitle>

        <ProjectDetails>{project.role}</ProjectDetails>

        <Grid>
          <Cell startAt="3" endAt="11">
            <ProjectDescription>{project.description}</ProjectDescription>

            {project.website && (
              <ProjectDescription>
                <ProjectLink
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voir le site
                </ProjectLink>
              </ProjectDescription>
            )}
          </Cell>
        </Grid>
      </StyledHeader>
    )
  }
}

export default Header
