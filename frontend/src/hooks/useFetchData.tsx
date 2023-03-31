import { useState, useCallback, useRef, useEffect } from 'react'

export const useFetchData = () => {
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const activeHttpRequests = useRef<AbortController[]>([])

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: string | FormData | null = null,
      headers = {}
    ) => {
      setLoading(true)
      const httpAbort = new AbortController()
      activeHttpRequests.current.push(httpAbort)
      let responseData: any
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        })
        
        responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (req: AbortController) => req !== httpAbort
        )
      } catch (err: any) {
        const errorText =
          method === 'GET' ? 'Failed to fetch data' : err.message
        setError(errorText)
      }

      setLoading(false)
      return responseData
    },
    []
  )

  const detachError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((ctrl: AbortController) =>
        ctrl.abort()
      )
    }
  }, [])

  return { sendRequest, loading, error, detachError }
}
