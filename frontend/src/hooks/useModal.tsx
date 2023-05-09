import { useState } from 'react'
export const useModal = () => {
  const [show, setShow] = useState<boolean>(false)

  const openModal = () => setShow(true)

  const closeModal = () => setShow(false)

  return {openModal, closeModal, show}
}

