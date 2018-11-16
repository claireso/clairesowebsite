/* eslint react/no-unescaped-entities: 0 */
import Section from '@components/Section'
import { Grid, Cell } from '@components/Grid'
import Text from '@components/Text'

const Profile = () => {
  return (
    <Section name="profile" title="Profil">
      <Grid>
        <Cell startAt="3" endAt="11">
          <Text>
            Je suis Claire Sosset, développeuse front-end depuis maintenant 9
            ans. <br />
            Durant ces années j'ai travaillé au sein d'agences web et de
            startups (Octave & Octave, Ulule), ce qui m'a permis de prendre part
            à l'élaboration de sites corporate et d' applications javascript
            complexes. <br />
            J'apprécie tout particulièrement de développer de belles interfaces
            en collaboration avec des UI/UX designers et de les dynamiser à
            l'aide d'API et d'outils modernes (React / Redux / Next / Webpack/
            StyledComponents ...).
          </Text>
        </Cell>
      </Grid>
    </Section>
  )
}

export default Profile
