import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import Container from './Container'

const HeaderWrapper = styled.header`
  // background: #fff;
  // box-shadow: 0 0 7px 0 #d0cece;
  //margin-bottom: calc(var(--baseline) * 18);
`

const Wrapper = styled(Container)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;

  &:after {
    background: var(--textColor);
    bottom: 0;
    content: '';
    display: block;
    height: 0.1rem;
    left: 4rem;
    position: absolute;
    right: 4rem;
  }
`

const StyledLink = styled.a`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 33rem;
`

const Title = styled.h1`
  font-size: 2.4rem;
  line-height: 1.35;
  margin: 0;
  font-weight: 400;

  @media only screen and (min-width: 860px) {
    font-size: 3rem;
  }
`

const Nav = styled.nav`
  li {
    display: inline-flex;
    font-size: 2.4rem;

    & + li {
      margin: 0 0 0 1rem;
    }
  }

  a {
    display: inline-block;
    line-height: 1;
    padding: calc(var(--baseline) * 7) 0;
  }

  @media only screen and (min-width: 860px) {
    li + li {
      margin: 0 0 0 2rem;
    }
  }
`

const Header = () => {
  return (
    <HeaderWrapper>
      <Wrapper>
        <Link href="/" passHref>
          <StyledLink>
            <Title>Claire Sosset</Title>
          </StyledLink>
        </Link>
        <Nav>
          <ul>
            <li>
              <Link href="/#projects">
                <a>Projets</a>
              </Link>
            </li>
            <li>
              <Link href="/#profile">
                <a>Profil</a>
              </Link>
            </li>
            <li>
              <Link href="/#contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </Nav>
      </Wrapper>
    </HeaderWrapper>
  )
}

export default Header
