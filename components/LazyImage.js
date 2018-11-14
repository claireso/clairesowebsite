import { useState, useEffect } from 'react'
import { Spring } from 'react-spring'

export default props => {
  const [isLoaded, setLoaded] = useState(false)

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

  // config={{ tension: 140, friction: 70 }}
  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} config={{ tension: 80 }}>
      {styles => <img style={styles} {...props} />}
    </Spring>
  )
}
