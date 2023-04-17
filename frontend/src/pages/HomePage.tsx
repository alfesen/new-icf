import Announcements from '../components/Home/Announcements/Announcements'
import Shortcuts from '../components/Home/Shortcuts/Shortcuts'
import Welcome from '../components/Home/Welcome/Welcome'

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <Announcements />
      <Shortcuts />
    </div>
  )
}

export default HomePage
