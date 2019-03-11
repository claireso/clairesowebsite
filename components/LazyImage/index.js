import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

const LazyImage = props => {
  const [isLoaded, setLoaded] = useState(false)

  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 80 }
  })

  const handleLoad = () => {
    setLoaded(true)
  }

  useEffect(() => {
    const img = new Image()
    img.src = props.src

    img.addEventListener('load', handleLoad)

    return () => img.removeEventListener('load', handleLoad)
  }, [])

  if (!isLoaded) return null

  return <animated.img style={styles} {...props} />
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired
}

export default LazyImage
