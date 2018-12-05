import React from 'react'
import { Spring } from 'react-spring'
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
  margin: 0 0 0.4rem;
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
    project: PropTypes.object.isRequired,
    resetTransition: PropTypes.bool.isRequired
  }

  render() {
    const { project, resetTransition } = this.props

    return (
      <StyledHeader>
        <Link href="/" passHref>
          <BackLink>Retour</BackLink>
        </Link>
        <Spring
          from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
          to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          delay={50}
          reset={resetTransition}
        >
          {styles => (
            <ProjectTitle style={styles}>{project.title}</ProjectTitle>
          )}
        </Spring>

        <Spring
          from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
          to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
          delay={200}
          reset={resetTransition}
        >
          {styles => (
            <ProjectDetails style={styles}>
              {project.date} - {project.role}
            </ProjectDetails>
          )}
        </Spring>

        <Grid>
          <Cell startAt="3" endAt="11">
            <Spring
              from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
              to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
              delay={330}
              reset={resetTransition}
            >
              {styles => (
                <ProjectDescription style={styles}>
                  {project.description}
                </ProjectDescription>
              )}
            </Spring>

            {project.website && (
              <Spring
                from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
                to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
                delay={380}
                reset={resetTransition}
              >
                {styles => (
                  <ProjectDescription style={styles}>
                    <ProjectLink
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir le site
                    </ProjectLink>
                  </ProjectDescription>
                )}
              </Spring>
            )}
          </Cell>
        </Grid>
      </StyledHeader>
    )
  }
}

export default Header
