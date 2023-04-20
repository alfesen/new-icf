import { Fragment } from 'react'
import SideNavigation from '../SideNavigation/SideNavigation'
import { about } from '../../db/links.json'

const AboutPage = () => {
  return (
    <Fragment>
      <SideNavigation
        title={about.title}
        collectionTitle='About'
        links={about.links}
      />
      <div>AboutPage</div>
    </Fragment>
  )
}

export default AboutPage
