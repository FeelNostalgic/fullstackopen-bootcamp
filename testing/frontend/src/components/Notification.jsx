import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const type = useSelector(state => state.notification.type)

  if (notification === '') {
    return null
  }

  return (
    <div className={type}>
      {notification}
    </div>
  )
}

export default Notification