import React from 'react'
import PropTypes from 'prop-types'

import Section from '@components/Section'
import Pager from '@components/Pager'

const formatPagerItem = project => ({
  subtitle: project.title,
  link: {
    as: `/p/${project.slug}`,
    href: '/p/[slug]'
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

class ProjectPager extends React.Component {
  static propTypes = {
    next: PropTypes.object,
    prev: PropTypes.object
  }

  render() {
    return (
      <Section light>
        <Pager
          next={formatNextItem(this.props.next)}
          prev={formatPrevItem(this.props.prev)}
        />
      </Section>
    )
  }
}

export default ProjectPager
