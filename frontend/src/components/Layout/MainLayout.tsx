import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
    </Fragment>
  )
}

export default MainLayout
