import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Navigation from './Navigation/Navigation'

const MainLayout = () => {
  return (
    <Fragment>
      <Navigation />
      <Header />
      <main className='container'>
        <Outlet />
      </main>
      <Footer />
    </Fragment>
  )
}

export default MainLayout
