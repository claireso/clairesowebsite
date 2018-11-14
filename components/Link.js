import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Icons from './Icons'

const StyledExternalLink = styled.a`
  svg {
    height: auto;
    margin: 0 0 0 0.8rem;
    opacity: 0;
    position: relative;
    top: 0.2rem;
    transition: opacity 150ms ease-out;
    width: 1.6rem;
  }

  &:hover,
  &:focus {
    svg {
      opacity: 1;
    }
  }
`

const StyledBackLink = styled.a`
  display: inline-block;
  color: var(--secondaryColor);

  svg {
    display: inline-block;
    height: auto;
    margin: 0 0.4rem 0 0;
    position: relative;
    top: 0.2rem;
    width: 0.5rem;
  }
`

export const ExternalLink = ({ children, ...props }) => (
  <StyledExternalLink {...props} target="_blank" rel="noopener noreferrer">
    {children}
    <Icons.ExternalLink />
  </StyledExternalLink>
)

export const BackLink = ({ children, ...props }) => (
  <StyledBackLink {...props}>
    <Icons.AngleLeft />
    {children}
  </StyledBackLink>
)

const rot13 = value =>
  value.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode(
      (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    )
  })

export const Rot13EmailLink = ({ content }) => {
  const [generatedLink, setLink] = useState(null)

  useEffect(() => {
    setLink(rot13(content))
  }, [])

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: generatedLink
      }}
    />
  )
}

Rot13EmailLink.propTypes = {
  content: PropTypes.string.isRequired
}
