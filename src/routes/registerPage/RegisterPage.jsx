import './RegisterPage.scss'
import apiRequest from '../../lib/apiRequest.js'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function RegisterPage() {

    const navigate = useNavigate()
    const [error, setError] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault()
    const formdata  = new FormData(e.target)

    const username = formdata.get("username")
    const email = formdata.get("email")
    const password = formdata.get("password")

    try {
      
      const response = await apiRequest.post("/auth/register", {username,email,password})
      setError("")
      navigate("/login")
  
    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }  

  }

  return (
    <div className="register-page">
      <div className="left">

          <form onSubmit={handlesubmit}>
            <h1>Sign Up</h1>
            <div className='user field'>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' required />
          </div>
          <div className='email field'>
            <label htmlFor="Email">Email</label>
            <input type="email" className='Email' name='email' />
          </div>
          <div className='password field'>
            <label htmlFor="Password">Password</label>
            <input type="password" id='Password' name='password' required />
          </div>
          <button type="submit">
            Register
          </button>
          {error && <span style={{color:"red"}}>{error}</span>}
          </form>
          

      </div>
      <div className="right">
      </div>
    </div>
  )
}

export default RegisterPage    