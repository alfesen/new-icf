import s from './LoadingSpinner.module.scss'

export default function LoadingSpinner() {
  return (
    <div data-testid='loading-spinner' className={`jcc-aic ${s.spinner}`}>
      <div className={s.spinner__inner}></div>
    </div>
  )
}
