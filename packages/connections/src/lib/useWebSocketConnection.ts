import { useCallback, useEffect, useRef, useState } from 'react'
import { storeHooks } from '../../../state'
import { setMessage, resetMessage } from '../../../state/lib/slices/commonSlice'

export const useWebSocketConnection = ({ url }: { url: string }) => {
  const [isConnectionOpen, setIsConnectionOpen] = useState(false)
  const [socketError, setSocketError] = useState<Event | null>(null)
  const WSInstanceRef = useRef<WebSocket | null>(null)
  const dispatch = storeHooks.useAppDispatch()

  const startWSConnection = useCallback(() => {
    if (WSInstanceRef.current && WSInstanceRef.current.readyState === WSInstanceRef.current.OPEN) {
      console.log(`%c Connection is already open`, 'background:#111;color:yellow')
      return
    }
    WSInstanceRef.current = new WebSocket(url)

    WSInstanceRef.current.onopen = () => {
      console.log(`%c Connection open with ${url}`, 'background:#111;color:lightgreen')
      WSInstanceRef.current?.send('Hello, WebSocket!')
      setIsConnectionOpen(true)
    }

    WSInstanceRef.current.onerror = (event) => {
      console.log(`%c Error`, 'background:#111;color:red')
      setSocketError(event)
    }

    WSInstanceRef.current.onmessage = (event) => {
      console.log(`%c Message received > \n ${JSON.stringify(event.data)}`, 'background:#111;color:cyan')
      dispatch(setMessage(event.data))
    }

    WSInstanceRef.current.onclose = () => {
      console.log(`%c Closing connection with ${url}`, 'background:#111;color:cyan')
      setIsConnectionOpen(false)
    }
  }, [dispatch, url])

  const sendWSMessage = (message: string) => {
    if (WSInstanceRef.current) {
      WSInstanceRef.current.send(message)
    }
  }

  const closeWSConnection = () => {
    WSInstanceRef.current?.close()
    resetMessage()
  }

  useEffect(() => {
    startWSConnection()

    return () => WSInstanceRef.current?.close()
  }, [dispatch, startWSConnection, url])

  return {
    socketError,
    isConnectionOpen,
    startWSConnection,
    sendWSMessage,
    closeWSConnection,
  }
}
