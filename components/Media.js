import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Observable from './Observable'
import LazyImage from './LazyImage'
import LazyVideo from './LazyVideo'

const MediaWrapper = styled.div`
  border: solid 1.2rem #fff;

  & + & {
    margin: 8rem 0 0;
  }

  @media only screen and (min-width: 860px) {
    border-width: 2.5rem;
  }
`

const MediaInner = styled.picture`
  background: var(--backgroundColor);
  display: block;
  padding-top: ${props => (props.height / props.width) * 100}%;
  position: relative;

  > img {
    display: block;
    height: 100%;
    left: 0;
    max-width: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    will-change: opacity;
  }
`

const TYPE_VIDEO = 'video'
const TYPE_IMAGE = 'image'

const ComponentByType = {
  [TYPE_IMAGE]: LazyImage,
  [TYPE_VIDEO]: LazyVideo
}

const Media = props => {
  const { size, type, src } = props
  const [inView, setInView] = useState(false)

  const Component = ComponentByType[type]

  return (
    <Observable
      onlyOnce={type !== TYPE_VIDEO}
      onChange={entry => setInView(entry.isIntersecting)}
    >
      <MediaWrapper>
        <MediaInner {...size}>
          {inView && <Component src={src} {...size} />}
        </MediaInner>
      </MediaWrapper>
    </Observable>
  )
}

Media.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  type: PropTypes.string,
  src: PropTypes.string.isRequired
}

export default Media
