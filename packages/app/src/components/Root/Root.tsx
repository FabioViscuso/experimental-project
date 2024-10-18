import { App } from '../App/App'
import { StateProvider } from '../../../../state'

export const Root = () => {
  return (
    <StateProvider>
      <App />
    </StateProvider>
  )
}
