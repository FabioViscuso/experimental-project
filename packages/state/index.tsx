import React, { ReactNode } from 'react'
import { store, useAppDispatch, useAppSelector } from './lib/store'
import { Provider } from 'react-redux'

export const stateStore = store

export const storeHooks = {
  useAppDispatch,
  useAppSelector,
}

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
