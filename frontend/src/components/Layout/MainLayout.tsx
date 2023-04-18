import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}

export default MainLayout
