import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link, navigate } from "gatsby"
import backend from "../helper/backend.js"
import { HashLoader as Loader } from "react-spinners"
export default () => {
  const [password, setPassword] = useState("")
  const [jwt, setJwt] = useState("")
  useEffect(() => {
    setJwt(localStorage.jwt)
  }, [])
  const [loading, setLoading] = useState(false)
  const onSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      const data = await backend.deleteUser(password)
      alert(data)
      setLoading(false)
      backend.setTokenHeader("")
      navigate("/")
    } catch (err) {
      setLoading(false)
      console.log(err.response)
      if (err.response && err.response.status) {
        alert(err.response.data.message)
      } else {
        alert("Error while trying to process your request")
      }
    }
  }

  const onChange = e => {
    setPassword(e.target.value)
  }
  return (
    <Layout>
      <Seo title="account" />
      {!jwt ? (
        <div>
          <Link to="/auth">Create an Account or Login</Link>
        </div>
      ) : (
        <div>
          {!loading ? (
            <div>
              <h3>Delete Account</h3>
              {/* Delete Form */}
              <form className="form" onSubmit={onSubmit}>
                <input
                  type="password"
                  onChange={onChange}
                  name={password}
                  value={password}
                  placeholder="enter password to delete"
                  required
                />
                <button>⚠️ Delete Account</button>
              </form>
            </div>
          ) : (
            <Loader />
          )}
        </div>
      )}
    </Layout>
  )
}
