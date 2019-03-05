import { Fragment, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useTransition, animated, useChain } from 'react-spring'

const Tile = styled(animated.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 50%;
  height: 1px;
  background: var(--textColor);
  z-index: 1;
`

const TRANSITIONS_CONFIG = [
  // tile top left
  {
    from: { right: '50%', left: '50%', top: '50%', height: '1%' },
    enter: [{ left: '0%' }, { top: '0%', height: '50%' }],
    leave: { height: '0%' },
  },
  // tile top right
  {
    from: { right: '50%', left: '50%', top: '50%', height: '1%' },
    enter: [{ right: '0%' }, { top: '0%', height: '50%' }],
    leave: { height: '0%' },
  },
  // tile bottom left
  {
    from: { right: '50%', left: '50%', top: '50%', height: '1%' },
    enter: [{ left: '0%' }, { height: '50%' }],
    leave: { top: '100%' },
  },
  // tile bottom right
  {
    from: { right: '50%', left: '50%', top: '50%', height: '1%' },
    enter: [{ right: '0%' }, { height: '50%' }],
    leave: { top: '100%' },
  },
]

export default ({ children }) => {

  const [content, setContent] = useState()
  const [showTransition, setShowTransition] = useState(false)
  let countEndStep = 0

  const groupTransitions = TRANSITIONS_CONFIG.map((conf, index) =>
    useTransition(showTransition, null, {
      ...conf,
      // attach onRest one time
      onRest: index === 0 && (() => {
        countEndStep++

        if (!showTransition || countEndStep < 2) return

        setShowTransition(false)
        setContent(children)
      })
    })
  )


  // const transitions = useTransition(showTransition, null, {
  //   from: { right: '50%', left: '50%', top: '50%' },
  //   enter: [{ right: '0%', left: '0%' }, { top: '0%' }],
  //   leave: { right: '50%', left: '50%', top: '0%' },
  //   // onFrame: (t) => console.log(t)
  //   // onRest: () => {
  //   //   console.log('onRest')
  //   //   if (!showTransition) return

  //   //   console.log('pass here ?')
  //   //   setShowTransition(false)
  //   //   setContent(children)
  //   //   // console.log('coucou', showTransition)
  //   // }
  // })

  useEffect(() => {
    setContent(children)
  }, [])

  useEffect(() => {
    if (!content) return
    // display transition
    setShowTransition(true)
  }, [children])


  return (
    <Fragment>
      {
        groupTransitions.map(transitions => {
          return transitions.map(({ item, key, props }) =>
            item && <Tile key={key} style={props} />
          )
        })
      }

      {content}
    </Fragment>
  )
}