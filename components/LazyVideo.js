import PropTypes from 'prop-types'
import styled from 'styled-components'

const VideoWrapper = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Video = props => {
  return (
    <VideoWrapper autoPlay muted loop>
      <source src={props.src} type="video/mp4" />
    </VideoWrapper>
  )
}

Video.propTypes = {
  src: PropTypes.string.isRequired
}

export default Video
