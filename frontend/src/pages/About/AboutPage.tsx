import { Fragment } from 'react'
import SideNavigation from '../SideNavigation/SideNavigation'
import { about } from '../../db/links.json'
import { Outlet } from 'react-router-dom'

const AboutPage = () => {
  return (
    <Fragment>
      <SideNavigation
        title={about.title}
        collectionTitle='About'
        links={about.links}
      />
      <Outlet />
    </Fragment>
  )
}

export default AboutPage
