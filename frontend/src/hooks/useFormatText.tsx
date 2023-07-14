import { CSSProperties } from 'react'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import { nanoid } from 'nanoid'

export const useFormatText = () => {
  const transform = (node: any) => {
    let parsedNode: any = node
    if (typeof node === 'string') {
      const cleanNode = DOMPurify.sanitize(node, {
        USE_PROFILES: { html: true },
      })
      parsedNode = parse(cleanNode)
    }
    return <div className='editor-text'>{parsedNode}</div>
  }

  const style = {
    marginBottom: '1em',
  } as CSSProperties

  const highlight = (
    initialContent: any,
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
            key={p.length + nanoid()}>
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
            <div className={className ? className : undefined} key={index}>
              {boldAndHighlightedString(text)}
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
    string: string
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
        }
        else return text
      }
    )
    return boldAndHighlightedSplitString.flat()
  }

  const formatLink = (text: string) => {
    return text
      .trim()
      .replaceAll('/', '')
      .replaceAll('%', 'per')
      .replaceAll('& ', '')
      .replaceAll(' ', '-')
      .toLowerCase()
  }

  return { transform, highlight, formatLink }
}
