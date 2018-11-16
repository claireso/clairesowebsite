/* eslint react/display-name: 0 */
import { Fragment, useState } from 'react'
import { Transition, Spring } from 'react-spring'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Error from 'next/error'
import Link from 'next/link'
import Head from 'next/head'

import withProjects from '@hoc/withProjects'
import usePrevious from '@hooks/usePrevious'

import { Grid, Cell } from '@components/Grid'
import Container from '@components/Container'
import Section from '@components/Section'
import Pager from '@components/Pager'
import Media from '@components/Media'
import { BackLink } from '@components/Link'
import Text from '@components/Text'
import * as Icons from '@components/Icons'
import Observable from '@components/Observable'

const Header = styled(Container)`
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

const ProjectFullDescriptionWrapper = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
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

const GoToTop = styled.button.attrs({
  children: <Icons.LongArrowUp />
})`
  appearance: none;
  background: var(--backgroundColor);
  border: none;
  border-radius: 0.4rem;
  bottom: 2.4rem;
  cursor: pointer;
  height: 5.2rem;
  outline: none;
  padding: 1.2rem 1.6rem;
  position: fixed;
  right: 2.4rem;
  width: 5.2rem;

  svg {
    height: 2.4rem;
    width: auto;

    path {
      transition: fill 150ms ease-out;
    }
  }

  .no-touch &:hover svg {
    fill: var(--primaryColor);
  }
`

const formatPagerItem = project => ({
  subtitle: project.title,
  link: {
    as: `/p/${project.slug}`,
    href: `/project?slug=${project.slug}`,
    prefetch: true
  }
})

const formatPrevItem = project => {
  if (!project) return undefined

  return {
    title: 'Projet précédent',
    ...formatPagerItem(project)
  }
}

const formatNextItem = project => {
  if (!project) return undefined

  return {
    title: 'Projet suivant',
    ...formatPagerItem(project)
  }
}

const Project = props => {
  const { projects, slug } = props
  const [isVisibleHeader, setHeaderVisible] = useState(true)
  const [isVisiblePager, setPagerVisible] = useState(false)

  const projectIndex = projects.findIndex(project => project.slug === slug)
  const project = projects[projectIndex]
  const nextProject = projects[projectIndex + 1]
  const previousProject = projects[projectIndex - 1]

  const showGoToTop = !isVisibleHeader && !isVisiblePager

  const prevSlug = usePrevious(slug)
  const prevProject = usePrevious(project)
  const reset = prevSlug !== slug

  if (!project) return <Error statusCode={404} />

  return (
    <Fragment>
      <Head>
        <title>
          {project.title} - Claire Sosset - Freelance front-end développeur
          basée à Paris
        </title>
      </Head>
      <Observable onChange={entry => setHeaderVisible(entry.isIntersecting)}>
        <Header>
          <Link href="/" passHref>
            <BackLink>Retour</BackLink>
          </Link>
          <Spring
            from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
            to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            delay={50}
            reset={reset}
          >
            {styles => (
              <ProjectTitle style={styles}>{project.title}</ProjectTitle>
            )}
          </Spring>

          <Spring
            from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
            to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            delay={200}
            reset={reset}
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
                reset={reset}
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
                  reset={reset}
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
        </Header>
      </Observable>

      {project.full_description && (
        <Section light>
          <Spring
            from={{ opacity: 0, transform: 'translate3d(0, 10px, 0)' }}
            to={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
            delay={430}
            reset={reset}
          >
            {styles => (
              <ProjectFullDescriptionWrapper style={styles}>
                {project.full_description.map((content, index) => (
                  <Text
                    key={`${project.slug}-full-description-${index}`}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ))}
              </ProjectFullDescriptionWrapper>
            )}
          </Spring>
        </Section>
      )}

      {project.media && (
        <Spring
          from={{ backgroundColor: prevProject ? prevProject.color : '#fff' }}
          to={{ backgroundColor: project.color }}
          reset={reset}
        >
          {styles => (
            <Section style={styles}>
              {project.media.map((media, index) => (
                <Media key={`${project.slug}-${index}`} {...media} />
              ))}
            </Section>
          )}
        </Spring>
      )}

      <Section light>
        <Observable onChange={entry => setPagerVisible(entry.isIntersecting)}>
          <Pager
            next={formatNextItem(nextProject)}
            prev={formatPrevItem(previousProject)}
          />
        </Observable>
      </Section>

      <Transition
        items={showGoToTop}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={{ tension: 250 }}
      >
        {showGoToTop =>
          showGoToTop &&
          (props => (
            <GoToTop style={props} onClick={() => window.scrollTo(0, 0)} />
          ))
        }
      </Transition>
    </Fragment>
  )
}

Project.getInitialProps = async ({ query }) => ({ slug: query.slug })
Project.propTypes = {
  projects: PropTypes.arrayOf(Object).isRequired,
  slug: PropTypes.string.isRequired
}

export default withProjects(Project)
