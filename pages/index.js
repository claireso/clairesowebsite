import { Fragment } from 'react'
import PropTypes from 'prop-types'

import Intro from '@views/home/Intro'
import Projects from '@views/home/Projects'
import Profile from '@views/home/Profile'
import Contact from '@views/home/Contact'

import projects from '@data/projects'

const Home = props => {
  return (
    <Fragment>
      <Intro />
      <Projects projects={props.projects} />
      <Profile />
      <Contact />
    </Fragment>
  )
}

Home.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired
}

export async function getStaticProps() {
  return {
    props: {
      projects: projects.map(p => ({
        title: p.title,
        slug: p.slug,
        role: p.role
      }))
    }
  }
}

export default Home
