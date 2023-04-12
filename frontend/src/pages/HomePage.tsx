import Announcements from '../components/Home/Announcements/Announcements'
import Welcome from '../components/Home/Welcome/Welcome'

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <section>
        <Announcements />
      </section>
    </div>
  )
}

export default HomePage
