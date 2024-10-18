import './App.css'
import { storeHooks } from '../../../../state'
import { resetMessage } from '../../../../state/lib/slices/commonSlice'
import { useWebSocketConnection } from '../../../../connections/src'
import { useEffect } from 'react'

const treeNames = [
  'Oak',
  'Maple',
  'Pine',
  'Birch',
  'Willow',
  'Cherry',
  'Spruce',
  'Cedar',
  'Redwood',
  'Magnolia',
  'Ash',
  'Elm',
  'Hickory',
  'Beech',
  'Fir',
  'Linden',
  'Sycamore',
  'Poplar',
  'Cypress',
  'Douglas Fir',
  'Walnut',
  'Chestnut',
  'Juniper',
  'Alder',
  'Teak',
  'Aspen',
  'Hackberry',
  'Yew',
  'Tamarack',
  'Sassafras',
]

export const App = () => {
  const stateMessage = storeHooks.useAppSelector((state) => state.common.message)
  const dispatch = storeHooks.useAppDispatch()

  const { isConnectionOpen, sendWSMessage, closeWSConnection, startWSConnection } = useWebSocketConnection({
    url: 'wss://echo.websocket.org',
  })

  useEffect(() => {
    const randomTreeName = () => {
      const index = Math.floor(Math.random() * treeNames.length)
      return treeNames[index]
    }

    let intervalID: NodeJS.Timeout
    if (isConnectionOpen) {
      intervalID = setInterval(() => {
        sendWSMessage(randomTreeName())
      }, 3000)
    }
    return () => clearInterval(intervalID)
  }, [isConnectionOpen, sendWSMessage])

  return (
    <>
      <h1>Lerna + Storybook + WS Playground</h1>
      <div className="card">
        <button onClick={() => sendWSMessage('Message from button')}>Send message</button>
        <p></p>
        <button onClick={() => dispatch(resetMessage())}>Reset message</button>
        <p></p>
        <button onClick={() => startWSConnection()}>Restart Connection</button>
        <p></p>
        <button onClick={() => closeWSConnection()}>Close Connection</button>

        <p>
          <span>Connection Status: </span> <span>{isConnectionOpen ? '🟢' : '🔴'}</span>
        </p>
        <p>
          WS Message: <span style={{ borderBottom: '2px solid lightgreen' }}>{stateMessage || 'No message yet'}</span>
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}
