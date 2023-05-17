export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export interface ResponseData {
  [key: string]: any
}

export interface UseHttpClientResponse<T = ResponseData> {
  loading: boolean
  error: string | null
  sendRequest: (
    url: string,
    method?: HttpMethod,
    body?: BodyInit,
    headers?: HeadersInit
  ) => Promise<T>
}