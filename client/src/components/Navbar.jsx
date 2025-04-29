import { useClerk } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()

  const navigate = useNavigate()

  const { setShowRecruiterLogin } = useContext(AppContext)
  return (
    <header className="navbar-header top-0 left-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-xl flex backdrop-blur-md border-b border-blue-800/30 z-50">
      <div className="logo-container w-full h-20 px-6 flex items-center justify-between ">
        <img
          onClick={() => navigate("/")}
          className="logo w-40 h-16 bg-transparent md:static cursor-pointer transition-transform duration-200 hover:scale-105 drop-shadow-lg"
          src="/src/assets/Logo.png"
          alt="HireHub Logo"
        />
        {user ? (
          <div className="flex gap-4 items-center text-lg text-white font-medium">
            <Link
              className="hover:text-amber-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
              to={"/applications"}
            >
              <span className="inline-flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01.88 7.9M12 3v1m0 16v1m8.66-13.66l-.7.7M4.34 19.66l-.7.7M21 12h-1M4 12H3m16.66 7.66l-.7-.7M4.34 4.34l-.7-.7" /></svg>
                Applied Jobs
              </span>
            </Link>
            <span className="text-2xl text-amber-400">|</span>
            <span className="max-sm:hidden text-base font-semibold tracking-wide bg-white/10 px-3 py-1 rounded-lg shadow-inner">
              Hi, {user.firstName + " " + user.lastName}
            </span>
            <span className="ml-2">
              <UserButton afterSignOutUrl="/"/>
            </span>
          </div>
        ) : (
          <div className="flex gap-2 items-center max-sm:text-xs">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-900 font-bold px-4 py-2 rounded-full shadow-md hover:from-yellow-500 hover:to-amber-400 transition-all duration-200 border-2 border-amber-300/40"
            >
              For Recruiter
            </button>
            <button
              onClick={() => openSignIn()}
              className="flex items-center gap-2 bg-white/10 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              User
              <svg className="w-6 h-6 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar