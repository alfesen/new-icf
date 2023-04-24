import { useState, useEffect, Fragment } from 'react'
import { useFetchData } from '../../../hooks/useFetchData'
import { convertString } from '../../../helpers/convertString'
import { HomeData } from '../../../types/HomeTypes'
import s from './Welcome.module.scss'
import Button from '../../UI/Form/Button/Button'
import Modal from '../../UI/Modal/Modal'
import WelcomeForm from '../../shared/WelcomeForm/WelcomeForm'

const Welcome = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
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

  const showEditModal = () => {
    console.log(editMode)
    setEditMode(true)
  }

  const closeEditModal = () => {
    setEditMode(false)
  }

  const removeWelcomeSection = async () => {
    try {
      await sendRequest('http://localhost:5000/api/home', 'DELETE')
    } catch (err) {}
    location.reload()
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
          <WelcomeForm route='home' onCancel={closeEditModal} />
        </Modal>
      )}
      {welcome && (
        <section className={s.welcome}>
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
