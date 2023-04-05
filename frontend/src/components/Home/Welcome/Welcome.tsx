import { useState, useEffect, Fragment } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { convertString } from '../../../helpers/convertString'
import { HomeData } from '../../../types/HomeTypes'
import s from './Welcome.module.scss'

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
        <section className={s.welcome}>
          <h2 className={s.welcome__title}>{welcome.title}</h2>
          <div className={s.welcome__content}>{convertString(welcome.content)}</div>
        </section>
      )}
    </Fragment>
  )
}

export default Welcome
