/* eslint react/no-unescaped-entities: 0 */
import styled from 'styled-components'

import Section from '@components/Section'
import { Grid, Cell } from '@components/Grid'
import Text from '@components/Text'
import { ExternalLink, Rot13EmailLink } from '@components/Link'

const List = styled(Text)`
  list-style-type: circle;
  list-style-position: inside;
  margin-top: 1.6rem;
`

const Contact = () => {
  return (
    <Section name="contact" title="Contact">
      <Grid>
        <Cell startAt="3" endAt="11">
          <Text>
            N'hésitez pas à me contacter pour toute demande de collaboration
          </Text>
          <List as="ul">
            <li>
              <Rot13EmailLink
                content={`
                <n uers="znvygb:pynver.fbffrg@tznvy.pbz" gnetrg="_oynax">
                  Rznvy
                <fit irefvba="1.1" kzyaf="uggc://jjj.j3.bet/2000/fit" jvqgu="28" urvtug="28" ivrjObk="0 0 28 28"><cngu q="Z22 14.5i5p0 2.484-2.016 4.5-4.5 4.5u-13p-2.484 0-4.5-2.016-4.5-4.5i-13p0-2.484 2.016-4.5 4.5-4.5u11p0.281 0 0.5 0.219 0.5 0.5i1p0 0.281-0.219 0.5-0.5 0.5u-11p-1.375 0-2.5 1.125-2.5 2.5i13p0 1.375 1.125 2.5 2.5 2.5u13p1.375 0 2.5-1.125 2.5-2.5i-5p0-0.281 0.219-0.5 0.5-0.5u1p0.281 0 0.5 0.219 0.5 0.5mZ28 1i8p0 0.547-0.453 1-1 1-0.266 0-0.516-0.109-0.703-0.297y-2.75-2.75-10.187 10.187p-0.094 0.094-0.234 0.156-0.359 0.156f-0.266-0.063-0.359-0.156y-1.781-1.781p-0.094-0.094-0.156-0.234-0.156-0.359f0.063-0.266 0.156-0.359y10.187-10.187-2.75-2.75p-0.187-0.187-0.297-0.438-0.297-0.703 0-0.547 0.453-1 1-1u8p0.547 0 1 0.453 1 1m"></cngu></fit>
                </n>
                `}
              />
            </li>
            <li>
              <ExternalLink href="https://linkedin.com/in/claire-sosset-80191321">
                Linkedin
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://github.com/claireso">
                Github
              </ExternalLink>
            </li>
          </List>
        </Cell>
      </Grid>
    </Section>
  )
}

export default Contact
