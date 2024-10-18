import { useEffect, useRef, useState } from 'react'

export const useWebSocketConnection = ({ url }: { url: string }) => {
  const [message, setMessage] = useState('')
  const [isConnectionOpen, setIsConnectionOpen] = useState(false)
  const [socketError, setSocketError] = useState<Event | null>(null)
  const WSInstanceRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    WSInstanceRef.current = new WebSocket(url)

    WSInstanceRef.current.onopen = () => {
      console.log(`%c Connection open with ${url}`, 'background:#111;color:lightgreen')
      WSInstanceRef.current?.send('Hello, WebSocket!')
      setIsConnectionOpen(true)
    }

    WSInstanceRef.current.onerror = (event) => {
      console.log(`%c `, 'background:#111;color:red')
      setSocketError(event)
    }

    WSInstanceRef.current.onmessage = (event) => {
      console.log(`%c Message received > \n ${JSON.stringify(event.data)}`, 'background:#111;color:cyan')
      setMessage(event.data)
    }

    WSInstanceRef.current.onclose = () => {
      console.log(`%c Closing WSInstanceRef.current`, 'background:#111;color:cyan')
      setIsConnectionOpen(false)
    }

    return () => WSInstanceRef.current?.close()
  }, [url])

  const sendWSMessage = () => {
    if (WSInstanceRef.current) {
      WSInstanceRef.current.send('Hello, WebSocket!')
    }
  }

  const closeWSConnection = () => {
    WSInstanceRef.current?.close()
  }

  return {
    message,
    socketError,
    isConnectionOpen,
    sendWSMessage,
    closeWSConnection,
  }
}
