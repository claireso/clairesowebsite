import { Fragment, useState } from 'react'
import Error from 'next/error'
import Head from 'next/head'
import PropTypes from 'prop-types'

import projects from '@data/projects'

import Observable from '@components/Observable'

import Header from '@views/project/Header'
import FullDescription from '@views/project/FullDescription'
import Media from '@views/project/Media'
import Pager from '@views/project/Pager'
import GoToTop from '@views/project/GoToTop'

const Project = ({ project, nextProject, previousProject }) => {
  const [isVisibleHeader, setHeaderVisible] = useState(true)
  const [isVisiblePager, setPagerVisible] = useState(false)

  const showGoToTop = !isVisibleHeader && !isVisiblePager

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

      {project.media && <Media project={project} />}

      <Observable onChange={entry => setPagerVisible(entry.isIntersecting)}>
        <Pager next={nextProject} prev={previousProject} />
      </Observable>

      <GoToTop show={showGoToTop} />
    </Fragment>
  )
}

export const getStaticProps = async context => {
  const { slug } = context.params

  const projectIndex = projects.findIndex(project => project.slug === slug)
  const project = projects[projectIndex]
  const nextProject = projects[projectIndex + 1]
  const previousProject = projects[projectIndex - 1]

  return {
    props: {
      project: project || null,
      nextProject: nextProject
        ? { title: nextProject.title, slug: nextProject.slug }
        : null,
      previousProject: previousProject
        ? {
            title: previousProject.title,
            slug: previousProject.slug
          }
        : null
    }
  }
}

export async function getStaticPaths() {
  const paths = projects.map(project => ({ params: { slug: project.slug } }))

  return {
    paths: paths,
    fallback: false
  }
}

Project.propTypes = {
  project: PropTypes.object,
  nextProject: PropTypes.object,
  previousProject: PropTypes.object
}

export default Project
