const boldString = (string: string) => {
  const splitString = string.split('**')
  const toReturn = splitString.map((text: string) => {
    if (splitString.indexOf(text) % 2 !== 0) {
      return (
        <span className='bold' key={`${text} key`}>
          {text}
        </span>
      )
    } else {
      return text
    }
  })
  return toReturn
}

export const convertString = (initialContent: any) => {
  let content: string | string[] = ''
  if (initialContent.includes('\n')) {
    const splitContent = initialContent.split('\n')
    content = splitContent.map((p: string) => {
      return <p key={p.length + Math.random()}>{boldString(p.trim())}</p>
    })
  } else {
    return initialContent
  }
  return content
}
