import { Fragment } from 'react'

import Intro from '@components/home/Intro'
import Projects from '@components/home/Projects'
import Profile from '@components/home/Profile'
import Contact from '@components/home/Contact'

const Home = () => {
  return (
    <Fragment>
      <Intro />
      <Projects />
      <Profile />
      <Contact />
    </Fragment>
  )
}

export default Home
