import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const NavigationBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch() 

  const UserLogginInfo = () => (
    <div className="flex items-center space-x-4">
      <span className="text-white text-xl">{user.name}</span>
      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors" onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );

  return (
    <nav className="bg-blue-500 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className='flex items-center'>
            {/* Title */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-yellow-400">Blogs App</span>
            </div>
            {/* Desktop links */}
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <Link
                to="/"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-yellow-400 transition-all"
              >
                Blogs
              </Link>
              <Link
                to="/users"
                className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-yellow-400 transition-all"
              >
                Users
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            {user !== null && <UserLogginInfo />}
          </div>

          {/* Open mobile menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Menu icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </Link>
          <Link
            to="/users"
            className="text-gray-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
        </div>
        {user !== null && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center justify-between">
              <UserLogginInfo />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationBar