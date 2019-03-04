/* eslint react/display-name: 0 */
import PropTypes from 'prop-types'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'

import * as Icons from '@components/Icons'

const StyledGoToTop = animated(styled.button.attrs({
  children: <Icons.LongArrowUp />
})`
  appearance: none;
  background: var(--backgroundColor);
  border: none;
  border-radius: 0.4rem;
  bottom: 2.4rem;
  cursor: pointer;
  height: 5.2rem;
  outline: none;
  padding: 1.2rem 1.6rem;
  position: fixed;
  right: 2.4rem;
  width: 5.2rem;

  svg {
    height: 2.4rem;
    width: auto;

    path {
      transition: fill 150ms ease-out;
    }
  }

  .no-touch &:hover svg {
    fill: var(--primaryColor);
  }
`)

const GoToTop = ({ show }) => {
  const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { tension: 250 }
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <StyledGoToTop
          key={key}
          style={props}
          onClick={() => window.scrollTo(0, 0)}
        />
      )
  )
}

GoToTop.propTypes = {
  show: PropTypes.bool.isRequired
}

export default GoToTop
