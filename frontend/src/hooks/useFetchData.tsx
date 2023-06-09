import { useState, useCallback, useRef, useEffect } from 'react'
import {
  HttpMethod,
  ResponseData,
  UseHttpClientResponse,
} from '../types/HookTypes'

export const useFetchData = (): UseHttpClientResponse => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const activeHttpRequests = useRef<AbortController[]>([])

  const sendRequest = useCallback(
    async <T extends ResponseData>(
      url: string,
      method: HttpMethod = 'GET',
      body: BodyInit | null = null,
      headers: HeadersInit = {}
    ): Promise<T> => {
      setLoading(true)
      const httpAbort = new AbortController()
      activeHttpRequests.current.push(httpAbort)
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbort.signal,
        })

        const responseData = (await response.json()) as T

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbort
        )
        if (!response.ok) {
          const error = new Error(
            responseData.message || 'Something went wrong'
          )
          setError(error.message)
          throw error
        }

        setLoading(false)
        return responseData
      } catch (err: any) {
        setLoading(false)
        throw err
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return { loading, error, clearError, sendRequest }
}
