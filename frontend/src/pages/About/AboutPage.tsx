import { Helmet } from 'react-helmet'
import SideNavigation from '../../components/Layout/SideNavigation/SideNavigation'
import { about } from '../../db/links.json'
import { Outlet } from 'react-router-dom'

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>About ICF - International Christian Fellowship of Warsaw</title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='page'>
        <SideNavigation title={about.title} links={about.links} />
        <div className='subpage'>
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default AboutPage
