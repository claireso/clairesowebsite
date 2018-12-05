import { Fragment } from 'react'

import Intro from '@views/home/Intro'
import Projects from '@views/home/Projects'
import Profile from '@views/home/Profile'
import Contact from '@views/home/Contact'

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
