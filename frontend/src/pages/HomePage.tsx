import { Helmet } from 'react-helmet'
import Announcements from '../components/Home/Announcements/Announcements'
import Shortcuts from '../components/Home/Shortcuts/Shortcuts'
import UsefulLinks from '../components/Home/UsefulLinks/UsefulLinks'
import Welcome from '../components/shared/Welcome/Welcome'

const HomePage = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>International Christian Fellowship of Warsaw</title>
        <link rel='canonical' href='#' />
      </Helmet>
      <div>
        <Welcome route='home' />
        <Announcements />
        <Shortcuts />
        <UsefulLinks />
      </div>
    </>
  )
}

export default HomePage
