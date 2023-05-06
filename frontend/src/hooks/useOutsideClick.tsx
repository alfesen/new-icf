import { useEffect, useState, useRef } from 'react'
import { useClientWidth } from './useClientWidth'

export const useOutsideClick = (initial: boolean) => {
  const [visible, setVisible] = useState(initial)
  const ref = useRef<any>(null)
  const { width } = useClientWidth()
  const handleClickOutside = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false)
    }
  }

  let event = width > 700 ? 'mouseover' : 'click'

  useEffect(() => {
    document.addEventListener(event, handleClickOutside, true)
    return () => {
      document.removeEventListener(event, handleClickOutside, true)
    }
  }, [])

  return { ref, visible, setVisible }
}
