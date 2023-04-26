import SideNavigation from '../SideNavigation/SideNavigation'
import { about } from '../../db/links.json'
import { Outlet } from 'react-router-dom'

const AboutPage = () => {
  return (
    <section className='page'>
      <SideNavigation
        title={about.title}
        collectionTitle='About'
        links={about.links}
      />
      <div className='subpage'>
        <Outlet />
      </div>
    </section>
  )
}

export default AboutPage
