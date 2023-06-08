import { CSSProperties, ReactNode } from 'react'
import BibleVerse from '../components/UI/Links/BibleVerse/BibleVerse'
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
    let result: ReactNode[] = []
    if (Array.isArray(parsedNode.props.children)) {
      for (let child of parsedNode.props.children) {
        if (typeof child === 'string') {
          const fragments = child.split('^') as string[]
          const transformedFragments = fragments.map(
            (fragment: string, i: number) => {
              if (i % 2 === 1) {
                return (
                  <BibleVerse
                    key={fragment.length + nanoid()}
                    reference={fragment}
                  />
                )
              }
              return fragment
            }
          )
          result = result.concat(transformedFragments)
        } else {
          result.push(child)
        }
      }
    } else if (typeof parsedNode.props.children === 'string') {
      const fragments = parsedNode.props.children.split('^') as string[]
      const transformedFragments = fragments.map(
        (fragment: string, i: number) => {
          if (i % 2 === 1) {
            return (
              <BibleVerse
                key={fragment.length + nanoid()}
                reference={fragment}
              />
            )
          }
          return fragment
        }
      )
      result = transformedFragments
    } else {
      result.push(parsedNode.props.children)
    }
    return result
  }

  const style = {
    marginBottom: '1em',
  } as CSSProperties

  const highlight = (
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
                return (
                  <BibleVerse key={text.length + nanoid()} reference={text} />
                )
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
