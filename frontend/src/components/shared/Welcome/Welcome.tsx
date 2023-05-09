import { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { useModal } from '../../../hooks/useModal'
import { convertString } from '../../../helpers/convertString'
import { WelcomeData } from '../../../types/SharedTypes'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import s from './Welcome.module.scss'

const WelcomeForm = lazy(() => import('../WelcomeForm/WelcomeForm'))

const Welcome = ({ route, subpage }: { route: string; subpage?: boolean }) => {
  const [welcome, setWelcome] = useState<WelcomeData>(null)
  const { sendRequest } = useFetchData()
  const { openModal, closeModal, show } = useModal()

  useEffect(() => {
    const getWelcome = async () => {
      try {
        const { welcomeData } = await sendRequest(
          `http://localhost:5000/api/${route}`
        )
        setWelcome(welcomeData)
      } catch (err) {}
    }
    getWelcome()
  }, [])

  const removeWelcomeSection = async () => {
    try {
      await sendRequest(`http://localhost:5000/api/${route}`, 'DELETE')
      setWelcome(null)
      closeModal()
    } catch (err) {}
  }

  const submitWelcome = (data: WelcomeData) => {
    setWelcome(data)
    closeModal()
  }

  return (
    <Fragment>
      {!welcome && (
        <Button type='button' onClick={openModal}>
          Add Welcome section
        </Button>
      )}
      {show && (
        <Modal
          show={show}
          actions={
            <Button type='button' onClick={removeWelcomeSection}>
              Remove section
            </Button>
          }
          onDetach={closeModal}
          heading='Editing Welcome'>
          <Suspense>
            <WelcomeForm
              route={route}
              onCancel={closeModal}
              onSubmit={submitWelcome}
            />
          </Suspense>
        </Modal>
      )}
      {welcome && (
        <section className={`${s.welcome} ${subpage ? s.subpage : ''}`}>
          <h2 className={s.welcome__title}>{welcome.title}</h2>
          <div className={s.welcome__content}>
            {convertString(welcome.content)}
          </div>
          <Button edit onClick={openModal}>
            Edit
          </Button>
        </section>
      )}
    </Fragment>
  )
}

export default Welcome
