import { ReactNode } from 'react'
import BibleVerse from '../components/UI/Links/BibleVerse/BibleVerse'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

export const useTransform = () => {
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
                    key={fragment + Math.random()}
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
              <BibleVerse key={fragment + Math.random()} reference={fragment} />
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

  return { transform }
}
