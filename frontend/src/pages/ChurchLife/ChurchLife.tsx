import { Outlet } from 'react-router-dom'
import SideNavigation from '../../components/Layout/SideNavigation/SideNavigation'
import { churchLife } from '../../db/links.json'

const ChurchLife = () => {
  return (
    <section className='page'>
      <SideNavigation title={churchLife.title} links={churchLife.links} />
      <div className='subpage'>
        <Outlet />
      </div>
    </section>
  )
}

export default ChurchLife
