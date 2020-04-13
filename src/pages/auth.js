import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { ClipLoader as Loader } from "react-spinners"
import SEO from "../components/seo"
import PhoneInput from "react-phone-number-input"
import backend from "../helper/backend.js"

export default ({ location, history }) => {
  const [formState, setFormState] = useState({ phone: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [isSignup, setIsSignup] = useState(true)
  const [jwt, setJwt] = useState("")
  useEffect(() => {
    setJwt(localStorage.jwt)
  }, [])
  const onChange = e =>
    setFormState({ ...formState, [e.target.name]: e.target.value })
  const onSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const { phone, password } = formState
      if (phone.length < 12) {
        alert("please enter the full phone number")
      } else {
        if (isSignup) {
          const data = await backend.register(formState)
          alert(data)
          navigate("/confirm")
        } else {
          const data = await backend.signin(formState)
          backend.setTokenHeader(data.jwt)
          navigate("/dashboard")
        }
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
      alert(err.response.data.message)
      console.log(err)
    }
  }
  const { phone, password } = formState
  return (
    <Layout>
      <SEO title="Sign In" />
      {jwt ? (
        <div>
          <Link to="/dashboard">Go To Dashboard</Link>
        </div>
      ) : (
        <div>
          <form className="form" onSubmit={onSubmit}>
            <PhoneInput
              placeholder="phone number: xxx-xxx-xxxx"
              onChange={phone => setFormState({ ...formState, phone })}
              value={phone}
              defaultCountry="US"
              required
              limitMaxLength
            />
            <input
              type="password"
              placeholder="password"
              onChange={onChange}
              value={password}
              required
              name="password"
            />
            {loading ? (
              <Loader />
            ) : (
              <div>
                <button>{isSignup ? "Sign Up" : "Login"}</button>
                <a onClick={e => setIsSignup(!isSignup)}>
                  {isSignup
                    ? "Already have an account? Login"
                    : "Create an Account"}
                </a>
              </div>
            )}
          </form>
          <Link to="/confirm">Verify Phone</Link>
        </div>
      )}
    </Layout>
  )
}
