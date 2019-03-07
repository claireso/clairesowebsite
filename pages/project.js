import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Error from 'next/error'
import Head from 'next/head'

import withProjects from '@hoc/withProjects'
import usePrevious from '@hooks/usePrevious'

import Observable from '@components/Observable'

import Header from '@views/project/Header'
import FullDescription from '@views/project/FullDescription'
import Media from '@views/project/Media'
import Pager from '@views/project/Pager'
import GoToTop from '@views/project/GoToTop'

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
  const resetTransition = prevSlug !== slug

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
        <Header project={project} />
      </Observable>

      {project.full_description && <FullDescription project={project} />}

      {project.media && (
        <Media project={project} resetTransition={resetTransition} />
      )}

      <Observable onChange={entry => setPagerVisible(entry.isIntersecting)}>
        <Pager next={nextProject} prev={previousProject} />
      </Observable>

      <GoToTop show={showGoToTop} />
    </Fragment>
  )
}

Project.getInitialProps = async ({ query }) => ({ slug: query.slug })

Project.propTypes = {
  projects: PropTypes.arrayOf(Object).isRequired,
  slug: PropTypes.string.isRequired
}

export default withProjects(Project)
