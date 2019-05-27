import React from 'react'

import projects from './data'

const projectsContext = React.createContext(projects)

const useProjects = () => React.useContext(projectsContext)

export { useProjects }
