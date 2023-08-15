import { Fragment } from "react"
import Welcome from "../../../components/shared/Welcome/Welcome"
import Location from "../../../components/About/Location/Location"
import { Helmet } from "react-helmet"

const WelcomeLocation = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Welcome to ICF - International Christian Fellowship of Warsaw</title>
        <link rel='canonical' href='#' />
      </Helmet>
      <Welcome subpage route='about/welcome' />
      <hr />
      <Location />
    </Fragment>
  )
}

export default WelcomeLocation
