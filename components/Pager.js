import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'

import { Grid, Cell } from './Grid'

const StyledLink = styled.a`
  display: block;
  padding: 5.2rem 0;
  text-align: center;

  @media only screen and (min-width: 860px) {
    text-align: ${props => (props.align ? props.align : 'left')};
  }
`

const PagerTitle = styled.span`
  color: var(--primaryColor);
  display: block;
  font-size: 2rem;
  margin: 0 0 0.8rem;
`

const PagerSubTitle = styled.span`
  display: block;
  font-size: 4.8rem;
`

const PagerItem = styled(Cell)`
  & + & {
    border-top: 1px solid #e8e8e8;
  }

  @media only screen and (min-width: 860px) {
    & + & {
      border-top: 0;
    }
  }
`

const PagerLink = ({ align, item }) => {
  return (
    <Link {...item.link} passHref>
      <StyledLink align={align}>
        <PagerTitle>{item.title}</PagerTitle>
        <PagerSubTitle>{item.subtitle}</PagerSubTitle>
      </StyledLink>
    </Link>
  )
}

PagerLink.propTypes = {
  align: PropTypes.string,
  item: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    link: PropTypes.shape({
      href: PropTypes.string.isRequired,
      as: PropTypes.string
    })
  })
}

export default class Pager extends React.Component {
  static propTypes = {
    prev: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        as: PropTypes.string
      })
    }),
    next: PropTypes.shape({
      subtitle: PropTypes.string.isRequired,
      link: PropTypes.shape({
        href: PropTypes.string.isRequired,
        as: PropTypes.string
      })
    })
  }

  render() {
    const { prev, next } = this.props

    return (
      <Grid>
        {prev && (
          <PagerItem startAt="1" endAt="7">
            <PagerLink align="left" item={prev} />
          </PagerItem>
        )}
        {next && (
          <PagerItem startAt="7" endAt="13">
            <PagerLink align="right" item={next} />
          </PagerItem>
        )}
      </Grid>
    )
  }
}
