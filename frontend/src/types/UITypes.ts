export type FormReducer = (state: FormState, action: FormAction) => FormState

export type FormInput = {
  [key: string]: {
    value: string
  }
}

export type FormState = {
  inputs: {
    [key: string]: {
      value: string
    }
  }
}

export type FormAction =
  | {
      type: 'INPUT_CHANGE'
      inputId: string
      value: string
    }
  | {
      type: 'SET_INPUTS'
      inputs: {
        [key: string]: {
          value: string
        }
      }
    }

export type InputProps = {
  element: 'input' | 'textarea'
  name: string
  placeholder: string
  rows?: number
  id: string
  label?: string
  onInput: (id: string, value: string) => void
}
