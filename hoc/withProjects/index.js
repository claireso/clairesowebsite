import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

import projects from './data'

const ProjectsContext = React.createContext(projects)

export default function withProjects(Component) {
  const EnhancedComponent = props => {
    return (
      <ProjectsContext.Consumer>
        {projects => <Component {...props} projects={projects} />}
      </ProjectsContext.Consumer>
    )
  }

  hoistNonReactStatics(EnhancedComponent, Component)

  return EnhancedComponent
}
