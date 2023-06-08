import { useState, useRef, useCallback } from 'react'
import { useFetchData } from '../../../../hooks/useFetchData'
import s from './BibleVerse.module.scss'

type BibleVerseProps = {
  reference: string
  className?: string
}

const BibleVerse = ({ reference, className }: BibleVerseProps) => {
  const [passageHTML, setPassageHTML] = useState<string>('')
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const tooltipRef = useRef<HTMLDivElement>(null)
  const leaveTimeoutRef = useRef<NodeJS.Timeout>()

  const { sendRequest } = useFetchData()

  const handleMouseEnter = useCallback(async (): Promise<void> => {
    const { passages } = await sendRequest(
      `${process.env.ESV_URI}${encodeURIComponent(reference)}`,
      'GET',
      undefined,
      {
        Authorization: `Token ${process.env.ESV_TOKEN}`,
      }
    )

    setPassageHTML(passages[0])
    setTooltipVisible(true)
  }, [sendRequest, reference])

  const handleMouseLeave = (): void => {
    leaveTimeoutRef.current = setTimeout(() => {
      setTooltipVisible(false)
    }, 100)

    if (tooltipRef.current) {
      tooltipRef.current.addEventListener('mouseenter', () => {
        clearTimeout(leaveTimeoutRef.current!)
      })
      tooltipRef.current.addEventListener('mouseleave', () => {
        setTooltipVisible(false)
      })
    }
  }

  return (
    <span
      className={`${s.reference} ${className ? s.className : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <p className={s.reference__text}>{reference}</p>
      {tooltipVisible && (
        <div
          ref={tooltipRef}
          className={s.reference__passage}
          dangerouslySetInnerHTML={{ __html: passageHTML }}></div>
      )}
    </span>
  )
}

export default BibleVerse
