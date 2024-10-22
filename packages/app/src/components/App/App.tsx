import './App.css'
import { storeHooks } from '../../../../state'
import { resetMessage } from '../../../../state/lib/slices/commonSlice'
import { useWebSocketConnection } from '../../../../connections/src'
import { useState } from 'react'

export const App = () => {
  const stateMessage = storeHooks.useAppSelector((state) => state.common.message)
  const dispatch = storeHooks.useAppDispatch()

  const [dataType, setDataType] = useState<'trees' | 'fruits'>('trees')

  const { isConnectionOpen, sendWSMessage, closeWSConnection, startWSConnection } = useWebSocketConnection({
    url: `ws://127.0.0.1:8081/?type=${dataType}`,
  })

  const handleChangeDataType = (type: 'trees' | 'fruits') => {
    closeWSConnection()
    setDataType(() => type)
    startWSConnection()
  }

  return (
    <>
      <h1>Lerna + Storybook + WS Playground</h1>
      <div className="card">
        <button onClick={() => sendWSMessage('Message from button')}>Send message</button>
        <p></p>
        <button onClick={() => handleChangeDataType('trees')}>Request random trees</button>
        <p></p>
        <button onClick={() => handleChangeDataType('fruits')}>Request random fruits</button>
        <p></p>
        <button onClick={() => dispatch(resetMessage())}>Reset Message</button>
        <p></p>
        <button onClick={() => startWSConnection()}>Restart Connection</button>
        <p></p>
        <button onClick={() => closeWSConnection()}>Close Connection</button>

        <p>
          <span>Connection Status: </span>
          <span>{isConnectionOpen ? '🟢' : '🔴'}</span>
        </p>
        <p>
          Socket Message: <span>{dataType === 'trees' ? '🌳' : '🍑'} </span>{' '}
          <span style={{ borderBottom: `2px solid ${dataType === 'trees' ? 'lightgreen' : 'orangered'}` }}>
            {stateMessage || 'No message yet'}
          </span>
        </p>
      </div>
    </>
  )
}
