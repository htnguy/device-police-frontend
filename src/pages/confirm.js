import React, { useState } from "react"
import backend from "../helper/backend.js"
import Layout from "../components/layout.js"
import Seo from "../components/seo.js"
import { Link } from "gatsby"
import PhoneInput from "react-phone-number-input"

export default () => {
  const [code, setCode] = useState("")
  const [displayCodeResendForm, setDisplayCodeResendForm] = useState(false)
  const [phone, setPhone] = useState("")
  const onSubmit = async e => {
    e.preventDefault()
    try {
      if (code.length < 6) {
        alert("please enter the entire 6-digit code")
        return
      }
      let data = await backend.confirmPhone(code)
      alert(data)
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }
  const resendCode = async e => {
    e.preventDefault()
    try {
      if (phone.length < 12) {
        return alert("please enter the full phone number")
      }
      const data = await backend.resendVerificationCode(phone)
      alert(data)
    } catch (err) {
      console.log(err)
      alert("error sending verification code please try again later")
    }
  }
  return (
    <Layout>
      <Seo title="confirm phone" />
      {displayCodeResendForm ? (
        <form className="form" onSubmit={resendCode}>
          <PhoneInput
            placeholder="phone number: xxx-xxx-xxxx"
            onChange={setPhone}
            value={phone}
            defaultCountry="US"
            required
            limitMaxLength
          />
          <button>resend</button>
        </form>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            required
            value={code}
            onChange={({ target }) => setCode(target.value)}
            maxLength="6"
            placeholder="enter the 6-digit verification code sent to your phone"
          />
          <button>verify</button>
        </form>
      )}
      <div>
        {" "}
        <a onClick={() => setDisplayCodeResendForm(!displayCodeResendForm)}>
          {displayCodeResendForm
            ? "Enter verification code"
            : "Did not get the code?"}
        </a>
      </div>

      <Link to="/device-police">Create an Account or Login</Link>
    </Layout>
  )
}
