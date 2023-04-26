import { Fragment } from "react"
import Welcome from "../../../components/shared/Welcome/Welcome"
import Location from "../../../components/About/Location/Location"

const WelcomeLocation = () => {
  return <Fragment>
    <Welcome subpage route='about/welcome' />
    <hr />
    <Location />
  </Fragment>
}

export default WelcomeLocation
