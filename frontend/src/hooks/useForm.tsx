import { useCallback, useReducer } from 'react'
import { FormAction, FormInput, FormState } from '../types/UITypes'

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
          },
        },
      }
    case 'SET_INPUTS':
      return {
        ...state,
        inputs: action.inputs,
      }
    default:
      return state
  }
}

export const useForm = (initialInputs: FormInput) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
  })

  const inputHandler = useCallback((id: string, value: string | File) => {
    dispatch({ type: 'INPUT_CHANGE', value, inputId: id })
  }, [])

  const setFormData = useCallback((inputData: FormInput) => {
    dispatch({ type: 'SET_INPUTS', inputs: inputData })
  }, [])

  return { formState, inputHandler, setFormData }
}
