/* eslint react/no-find-dom-node: 0 */
import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

const DEFAULT_CONFIG = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

const loadIntersectionObserverPolyfill = async () => {
  await import('intersection-observer')
}

const checkIntersectionObserver = () => {
  return new Promise(resolve => {
    if ('IntersectionObserver' in window === true) {
      resolve()
      return
    }

    loadIntersectionObserverPolyfill()
      .then(resolve)
      .catch(() => {
        throw new Error('Can not load polyfill intersection observer')
      })
  })
}

const Observable = props => {
  const target = useRef(null)

  useEffect(() => {
    const { onChange, config, onlyOnce } = props
    const IOconfig = config || DEFAULT_CONFIG

    const targetDom = ReactDom.findDOMNode(target.current)
    let observer

    checkIntersectionObserver()
      .then(() => {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            const { isIntersecting } = entry

            onChange(entry)

            if (onlyOnce && isIntersecting) {
              observer.unobserve(entry.target)
            }
          })
        }, IOconfig)

        observer.observe(targetDom)
      })
      .catch(() => {})

    return () => observer.unobserve(targetDom)
  }, [])

  return React.cloneElement(React.Children.only(props.children), {
    ref: target
  })
}

Observable.defaultProps = {
  onChange: () => {}
}

export default Observable
