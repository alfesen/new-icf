import { useState, useEffect, Fragment } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { convertString } from '../../../helpers/convertString'
import { HomeData } from '../../../types/HomeTypes'

const Welcome = () => {
  const [welcome, setWelcome] = useState<HomeData>(null)
  const { sendRequest } = useFetchData()

  useEffect(() => {
    const getWelcome = async () => {
      try {
        const { welcomeData } = await sendRequest(
          'http://localhost:5000/api/home'
        )
        setWelcome(welcomeData)
      } catch (err) {}
    }
    getWelcome()
  }, [])

  return (
    <Fragment>
      {welcome && (
        <section>
          <h2>{welcome.title}</h2>
          <div>{convertString(welcome.content)}</div>
        </section>
      )}
    </Fragment>
  )
}

export default Welcome
