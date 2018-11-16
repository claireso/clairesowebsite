/* eslint react/no-unescaped-entities: 0 */
import styled from 'styled-components'

import Container from '@components/Container'
import { Grid, Cell } from '@components/Grid'

const Wrapper = styled(Grid)`
  padding: calc(var(--baseline) * 20) 0 calc(var(--baseline) * 10);

  @media only screen and (min-width: 860px) {
    padding: calc(var(--baseline) * 28) 0 calc(var(--baseline) * 18);
  }
`

const Content = styled(Cell)`
  font-size: 4.2rem;
  line-height: 6.4rem;
  margin: 0;

  @media only screen and (min-width: 860px) {
    font-size: 4.8rem;
  }

  &:after {
    background: var(--textColor);
    content: '';
    display: block;
    height: 0.8rem;
    margin: 5.2rem 0 0;
    min-width: 6.4rem;
    width: 14%;
  }
`

const Intro = () => {
  return (
    <Container>
      <Wrapper>
        <Content start="3" end="12" as="p">
          Développeuse front-end indépendante basée à Paris. <br />
          Découvrez quelques uns des projets auxquels j'ai eu le plaisir de
          participer.
        </Content>
      </Wrapper>
    </Container>
  )
}

export default Intro
