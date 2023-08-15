import { Outlet } from 'react-router-dom'
import SideNavigation from '../../components/Layout/SideNavigation/SideNavigation'
import { churchLife } from '../../db/links.json'
import { Helmet } from 'react-helmet'

const ChurchLife = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Church Life - International Christian Fellowship of Warsaw</title>
        <link rel='canonical' href='#' />
      </Helmet>
      <section className='page'>
        <SideNavigation title={churchLife.title} links={churchLife.links} />
        <div className='subpage'>
          <Outlet />
        </div>
      </section>
    </>
  )
}

export default ChurchLife
