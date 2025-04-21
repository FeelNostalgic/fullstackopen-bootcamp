import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(message && message.trim() !== '')
  }, [message])

  if (!message || message.trim() === '') return null

  const baseClasses =
    'transition-opacity duration-600 ease-in-out text-lg border rounded-md p-3 mb-3'
  const typeClasses =
    type === 'success'
      ? 'bg-green-100 text-green-700 border-green-300'
      : 'bg-red-100 text-red-700 border-red-300'
  const visibilityClass = visible ? 'opacity-100' : 'opacity-0'

  return (
    <div className={`${baseClasses} ${typeClasses} ${visibilityClass}`}>
      {message}
    </div>
  )
}

export default Notification