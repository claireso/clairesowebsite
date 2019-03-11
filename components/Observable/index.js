/* eslint react/no-find-dom-node: 0 */
import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom'

const DEFAULT_CONFIG = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

const Observable = props => {
  const target = useRef(null)

  useEffect(() => {
    const { onChange, config, onlyOnce } = props
    const IOconfig = config || DEFAULT_CONFIG

    const targetDom = ReactDom.findDOMNode(target.current)

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { isIntersecting } = entry

        onChange(entry)

        if (onlyOnce && isIntersecting) {
          observer.unobserve(entry.target)
        }
      })
    }, IOconfig)

    observer.observe(targetDom)

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
