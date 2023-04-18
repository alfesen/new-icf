import Announcements from '../components/Home/Announcements/Announcements'
import Shortcuts from '../components/Home/Shortcuts/Shortcuts'
import UsefulLinks from '../components/Home/UsefulLinks/UsefulLinks'
import Welcome from '../components/Home/Welcome/Welcome'

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <Announcements />
      <Shortcuts />
      <UsefulLinks />
    </div>
  )
}

export default HomePage
