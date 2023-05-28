import { ReactNode } from 'react'
import BibleVerse from '../components/UI/Links/BibleVerse/BibleVerse'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

export const useTransform = (html?: string) => {
  const transform = (node: any) => {
    let parsedNode: any = node
    if (typeof node === 'string') {
      const cleanNode = DOMPurify.sanitize(node, {
        USE_PROFILES: { html: true },
      })
      parsedNode = parse(cleanNode)
    }
    let result: ReactNode[] = []
    for (let child of parsedNode.props.children) {
      if (typeof child === 'string' && child.includes('^')) {
        const fragments = child.split('^') as any
        const transformedFragments = fragments.map(
          (fragment: string, index: number) => {
            if (index % 2 === 1) {
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
    return result
  }

  return { transform }
}
