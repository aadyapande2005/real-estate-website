import './LoginPage.scss'
import apiRequest from '../../lib/apiRequest'
import { useState } from 'react'
import { useAuth } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const {updateUser} = useAuth()

  const handlesubmit = async (e: import('react').FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata  = new FormData(e.currentTarget)

    const username = formdata.get("username")
    const password = formdata.get("password")

    try {
      
      const response = await apiRequest.post("/auth/login", {username,password})

      setError("")

      updateUser(response.data)
      navigate("/")
  
    } catch (error) {
      console.log(error)
      setError(error instanceof Error ? error.message : String(error))
    }  

  }

  return (
    <div className="loginpage">
      <div className="left">

          <form onSubmit={handlesubmit}>
            <h1>Login</h1>
            <div className='user field'>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' required />
          </div>
          {/* <div className='email field'>
            <label htmlFor="Email">Email</label>
            <input type="email" className='Email' name='email' />
          </div> */}
          <div className='password field'>
            <label htmlFor="Password">Password</label>
            <input type="password" id='Password' name='password' required />
          </div>
          <button type="submit">
            Login
          </button>
          {error && <span style={{color:"red"}}>{error}</span>}
          </form>
          

      </div>
      <div className="right">
      </div>
    </div>
  )
}

export default LoginPage    