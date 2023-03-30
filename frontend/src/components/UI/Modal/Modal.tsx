import { ReactNode, Fragment } from 'react'
import { createPortal } from 'react-dom'

const Backdrop = ({ onDetach }: { onDetach: () => void }) => {
  const content = <div className='backdrop' onClick={onDetach}></div>
  return createPortal(content, document.getElementById('backdrop')!)
}

type ModalProps = {
  children: ReactNode
  heading: string
  actions: ReactNode
  show: boolean
  onDetach: () => void
}

const Modal = ({ show, children, heading, actions, onDetach }: ModalProps) => {
  const content = (
    <Fragment>
      {show && <Backdrop onDetach={onDetach} />}
      <div>
        <header>
          <h2>{heading}</h2>
        </header>
        {children}
        <footer>{actions}</footer>
      </div>
    </Fragment>
  )
  return createPortal(content, document.getElementById('modal')!)
}

export default Modal
