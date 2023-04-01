import { useState, useEffect } from 'react'

export const useClientWidth = () => {
  const [width, setWidth] = useState(innerWidth)
  
  const handleResize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => removeEventListener('resize', handleResize)
  }, [])

  return { width }
}
