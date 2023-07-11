import { Fragment } from 'react'
import { createPortal } from 'react-dom'
import { BackdropProps, ModalProps } from '../../../types/UITypes'
import Card from '../Card/Card'

import s from './Modal.module.scss'

const Backdrop = ({ onDetach }: BackdropProps) => {
  const content = <div className={s.backdrop} onClick={onDetach}></div>
  return createPortal(content, document.getElementById('backdrop')!)
}

const Modal = ({ show, children, heading, actions, onDetach }: ModalProps) => {
  const content = (
    <Fragment>
      {show && <Backdrop onDetach={onDetach} />}
      <Card className={s.modal}>
        <header className={s.modal__header}>
          <h2>{heading}</h2>
        </header>
        <section className={s.modal__content}>{children}</section>
        {actions && <footer className='align-right'>{actions}</footer>}
      </Card>
    </Fragment>
  )
  return createPortal(content, document.getElementById('modal')!)
}

export default Modal
