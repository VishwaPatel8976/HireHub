
import { useClerk } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AppContext } from '../context/AppContext'



const Navbar = () => {

  const { openSignIn} = useClerk()
  const { user } = useUser()

  const navigate = useNavigate()

  const {setShowRecruiterLogin} = useContext(AppContext)
  return (
    <header className="navbar-header top-0 left-0 bg-blue-900 flex ">
   
       <div className="logo-container w-screen h-25 px-6 flex items-center justify-between ">
          <img onClick={() => navigate("/")}
            className="logo w-80 h-70 bg-transparent md:static cursor-pointer"
            src="/src/assets/Logo.png"
            alt="HireHub Logo"
          />
          {
            user? <div className='flex gap-3 items-center text-xl text-white  '>
              <Link to={"/applications"}>Applied Jobs</Link>
              <p>|</p>
              <p className='max-sm:hidden'>Hi, {user.firstName+" "+user.lastName}</p>
              <UserButton/>
            </div>
            : <div className="pr-40 flex gap-8 max-sm:text-xs sm:flex-row flex-col ">
           
           <button onClick={() => setShowRecruiterLogin(true)} className="text-white text-xl font-semibold ">For Recruiter</button>
          <button  onClick={() => openSignIn()} className="text-white text-xl flex flex-row font-semibold border-2 border-white  py-1 rounded-xl hover:bg-amber-500 hover:text-[#00263C] transition duration-300 ease-in-out sm:px-9">User
            <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/>
          </svg>
          </button> 
         
          </div>
          }
            </div>

    </header>
    
  )
}

export default Navbar