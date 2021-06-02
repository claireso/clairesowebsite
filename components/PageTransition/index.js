import { Fragment, useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTransition, animated } from 'react-spring'

import usePrevious from '@hooks/usePrevious'

const Curtain = styled(animated.div)`
  position: fixed;
  left: 50%;
  right: 50%;
  height: 0.5%;
  background: var(--textColor);
  z-index: 1;
`

const CURTAINS = [
  // curtain top
  {
    id: 0,
    from: { right: '50%', left: '50%', top: '50%', height: '0.5%' },
    enter: [{ left: '0%', right: '0%' }, { height: '50%' }],
    leave: { top: '100%' }
  },
  // curtain bottom
  {
    id: 1,
    from: { right: '50%', left: '50%', bottom: '50%', height: '0.5%' },
    enter: [{ left: '0%', right: '0%' }, { height: '50%' }],
    leave: { bottom: '100%' }
  }
]

const reducer = (state, action) => {
  switch (action.type) {
    case 'showTransition':
      return { ...state, curtains: action.transitions }
    case 'updateContentAndHideTransition':
      return { ...state, curtains: [], content: action.content }
    default:
      return { ...state }
  }
}

const scrollTo = hash => {
  let target = 0

  if (hash) {
    const element = document.querySelector(hash)

    if (element) {
      target = element.offsetTop
    }
  }

  window.scrollTo(0, target)
}

const PageTransition = ({ children }) => {
  const { pathname, asPath } = useRouter()
  const [state, dispatch] = useReducer(reducer, {
    curtains: [],
    content: children
  })

  const previousContent = usePrevious(children)
  const previousPathname = usePrevious(pathname)

  const transitions = useTransition(state.curtains, t => t.id, {
    native: true,
    config: { mass: 1, tension: 280, friction: 30 },
    from: t => t.from,
    enter: t => t.enter,
    leave: t => t.leave,
    onRest: t => {
      // Call onRest only for one curtain
      if (t.id !== 1) return

      // Update content when curtains are visible
      if (!state.curtains.length) return

      dispatch({
        type: 'updateContentAndHideTransition',
        content: children
      })

      scrollTo(window.location.hash)
    }
  })

  useEffect(() => {
    if (!previousContent) return

    if (
      previousPathname &&
      previousPathname === pathname &&
      pathname === '/'
    ) return

    dispatch({ type: 'showTransition', transitions: CURTAINS })
  }, [pathname, asPath])

  return (
    <Fragment>
      {transitions.map(
        ({ item, key, props }) => item && <Curtain key={key} style={props} />
      )}
      {state.content}
    </Fragment>
  )
}

PageTransition.propTypes = {
  children: PropTypes.element
}

export default PageTransition
