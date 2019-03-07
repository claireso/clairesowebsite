import { Fragment, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

import usePrevious from '@hooks/usePrevious'

const Tile = styled(animated.div)`
  position: fixed;
  left: 50%;
  right: 50%;
  height: 0.5%;
  background: var(--textColor);
  z-index: 1;
`

const TRANSITIONS_CONFIG = [
  // tile top
  {
    from: { right: '50%', left: '50%', top: '50%', height: '0.5%' },
    enter: [{ left: '0%', right: '0%' }, { height: '50%' }],
    leave: { top: '100%' }
  },
  // tile bottom
  {
    from: { right: '50%', left: '50%', bottom: '50%', height: '0.5%' },
    enter: [{ left: '0%', right: '0%' }, { height: '50%' }],
    leave: { bottom: '100%' }
  }
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'showTransition':
      return { ...state, visibleTransition: true }
    case 'updateContentAndHideTransition':
      return { ...state, visibleTransition: false, content: action.content }
    default:
      return { ...state }
  }
}

const PageTransition = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    visibleTransition: false,
    content: children
  })
  const previousContent = usePrevious(children)

  let countStepsEnd = 0

  const groupTransitions = TRANSITIONS_CONFIG.map((conf, index) =>
    useTransition(state.visibleTransition, null, {
      ...conf,
      native: true,
      config: { mass: 1, tension: 280, friction: 30 },
      // /!\ hack
      // react-spring has not a method to catch the end of the transition
      // our transition has two steps and the function onRest is called at the end of each
      // we attach onRest only once and we update content and hide tiles at the end of the step two
      onRest:
        index === 0 &&
        (() => {
          countStepsEnd++

          if (!state.visibleTransition || countStepsEnd < 2) return

          window.scrollTo(0, 0)
          dispatch({
            type: 'updateContentAndHideTransition',
            content: children
          })
        })
    })
  )

  useEffect(() => {
    // do not show transition in the first render
    if (!previousContent) return
    // display transition
    dispatch({ type: 'showTransition' })
  }, [children])

  return (
    <Fragment>
      {groupTransitions.map(transitions => {
        return transitions.map(
          ({ item, key, props }) => item && <Tile key={key} style={props} />
        )
      })}
      {state.content}
    </Fragment>
  )
}

PageTransition.propTypes = {
  children: PropTypes.element
}

export default PageTransition
