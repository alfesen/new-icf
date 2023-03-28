import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Fragment>
      <main className='container'>
        <Outlet />
      </main>
    </Fragment>
  )
}

export default MainLayout
