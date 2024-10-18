import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { storeHooks } from '../../../../state'
import { resetMessage } from '../../../../state/lib/slices/commonSlice'
import { useWebSocketConnection } from '../../../../connections/src'

export const App = () => {
  const stateMessage = storeHooks.useAppSelector((state) => state.common.message)

  const { isConnectionOpen, sendWSMessage, closeWSConnection } = useWebSocketConnection({
    url: 'wss://echo.websocket.org',
  })

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => sendWSMessage()}>Send message</button>
        <button onClick={() => resetMessage()}>Reset message</button>
        <button onClick={() => closeWSConnection()}>Close Connection</button>

        <div>
          <span>Connection Status: </span> <span>{isConnectionOpen ? '🟢' : '🔴'}</span>
        </div>
        <p>{stateMessage || 'No message yet'}</p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}
