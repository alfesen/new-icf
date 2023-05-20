import { CSSProperties } from 'react'
import BibleVerse from '../components/UI/Links/BibleVerse/BibleVerse'

const style = {
  marginBottom: '1em',
} as CSSProperties

export const convertString = (
  initialContent: any,
  restrict: boolean = false,
  className?: string
) => {
  let content: string | string[] = ''
  if (initialContent.includes('\n')) {
    const splitContent = initialContent.split('\n')
    content = splitContent.map((p: string, index: number) => {
      return (
        <div
          style={
            index !== splitContent.indexOf(splitContent.at(-1))
              ? style
              : undefined
          }
          className={className ? className : undefined}
          key={p.length + Math.random()}>
          {boldAndHighlightedString(p.trim())}
        </div>
      )
    })
  } else {
    content = [initialContent.trim()]
  }
  if (Array.isArray(content)) {
    return content.map((text: string | JSX.Element, index: number) => {
      if (typeof text === 'string') {
        return (
          <div
            className={className ? className : undefined}
            key={index}>
            {boldAndHighlightedString(text, restrict)}
          </div>
        )
      } else {
        return text
      }
    })
  } else {
    return (
      <div className={className ? className : undefined}>
        {boldAndHighlightedString(content)}
      </div>
    )
  }
}

const boldAndHighlightedString = (
  string: string,
  restrict: boolean = false
) => {
  const boldSplitString = string.split('**')
  const boldAndHighlightedSplitString = boldSplitString.map(
    (text: string, index: number) => {
      if (index % 2 !== 0) {
        return (
          <span className='bold' key={`${text} key`}>
            {text}
          </span>
        )
      } else {
        if (!restrict) {
          const highlightedSplitString = text.split('^')
          if (highlightedSplitString.length === 1) {
            return text
          }
          return highlightedSplitString.map((text: string, index: number) => {
            if (index % 2 === 1) {
              return <BibleVerse key={Math.random()} reference={text} />
            } else {
              return text
            }
          })
        } else {
          return text
        }
      }
    }
  )
  return boldAndHighlightedSplitString.flat()
}
