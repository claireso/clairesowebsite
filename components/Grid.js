import styled, { css } from 'styled-components'

export const Grid = styled.div`
  @media only screen and (min-width: 860px) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 0 2rem;
  }
`

const start = css`
  @media only screen and (min-width: 860px) {
    grid-column-start: ${props => props.start};
  }
`

const end = css`
  @media only screen and (min-width: 860px) {
    grid-column-end: ${props => props.end};
  }
`

const row = css`
  @media only screen and (min-width: 860px) {
    grid-row: ${props => props.row};
  }
`

export const Cell = styled.div`
  ${props => (props.start ? start : '')}
  ${props => (props.end ? end : '')}
  ${props => (props.row ? row : '')}
`
