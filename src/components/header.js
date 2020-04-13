import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

const Header = ({ siteTitle }) => {
  const clearLocalStorage = e => {
    localStorage.clear()
  }
  const [jwt, setJwt] = useState("")
  useEffect(() => {
    setJwt(localStorage.jwt)
  }, [])
  return (
    <header
      className="header"
      style={{
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div className="navigation">
          <Link to="/device-police">Get Started</Link>
          {!jwt ? <Link to="/auth">Create Account</Link> : ""}
          <Link to="/dashboard">Dashboard</Link>
          {jwt ? (
            <a
              onClick={() => {
                clearLocalStorage()
                navigate("/")
              }}
            >
              Logout
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
