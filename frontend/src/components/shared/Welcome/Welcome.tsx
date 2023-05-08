import { useState, useEffect, Fragment, lazy, Suspense } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { convertString } from '../../../helpers/convertString'
import { WelcomeData } from '../../../types/SharedTypes'
import s from './Welcome.module.scss'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'

const WelcomeForm = lazy(() => import('../WelcomeForm/WelcomeForm'))

const Welcome = ({ route, subpage }: { route: string; subpage?: boolean }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [welcome, setWelcome] = useState<WelcomeData>(null)
  const { sendRequest } = useFetchData()

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

  const showEditModal = () => setEditMode(true)

  const closeEditModal = () => setEditMode(false)

  const removeWelcomeSection = async () => {
    try {
      await sendRequest(`http://localhost:5000/api/${route}`, 'DELETE')
      setWelcome(null)
      closeEditModal()
    } catch (err) {}
  }

  const submitWelcome = (data: WelcomeData) => {
    setWelcome(data)
    closeEditModal()
  }

  return (
    <Fragment>
      {!welcome && (
        <Button type='button' onClick={showEditModal}>
          Add Welcome section
        </Button>
      )}
      {editMode && (
        <Modal
          show={true}
          actions={
            <Button type='button' onClick={removeWelcomeSection}>
              Remove section
            </Button>
          }
          onDetach={closeEditModal}
          heading='Editing Welcome'>
          <Suspense>
            <WelcomeForm
              route={route}
              onCancel={closeEditModal}
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
          <Button edit onClick={showEditModal}>
            Edit
          </Button>
        </section>
      )}
    </Fragment>
  )
}

export default Welcome
