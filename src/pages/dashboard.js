import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link } from "gatsby"
import backend from "../helper/backend.js"
import { HashLoader as Loader } from "react-spinners"
export default () => {
  const [formState, setFormState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [jwt, setJwt] = useState("")
  useEffect(() => {
    setJwt(localStorage.jwt)
  }, [])
  const [loading, setLoading] = useState(false)
  const onSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      const data = await backend.setTimer(formState)
      alert(data)
    } catch (err) {
      setLoading(false)
      console.log(err)
      alert("failed to set timer")
    }
  }
  const resetTimer = async e => {
    try {
      await backend.resetTimer()
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  const onChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  const { hours, minutes, seconds } = formState
  return (
    <Layout>
      <Seo title="dashboard" />
      {!jwt ? (
        <div>
          <Link to="/auth">Create an Account or Login</Link>
        </div>
      ) : (
        <div>
          {!loading ? (
            <form className="form" onSubmit={onSubmit}>
              <label htmlFor="hours">Hours</label>
              <input
                type="number"
                name="hours"
                value={hours}
                onChange={onChange}
                placeholder="hours"
                min="0"
              />
              <label htmlFor="minutes">Minutes</label>
              <input
                type="number"
                name="minutes"
                value={minutes}
                onChange={onChange}
                min="0"
                placeholder="minutes"
              />
              <label htmlFor="seconds">Seconds</label>
              <input
                type="number"
                name="seconds"
                value={seconds}
                min="0"
                onChange={onChange}
                placeholder="seconds"
              />
              <button>Start Timer</button>
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Loader />
              <p>
                You will get a SMS in{" "}
                {formState.hours ? `${formState.hours}hr ` : ""}{" "}
                {formState.minutes ? `${formState.minutes}min` : ""}{" "}
                {formState.seconds ? `${formState.seconds}s` : ""}
              </p>
              <h4>What will the SMS contain?</h4>
              <p>
                The message will contain the reminder to get off your device and
                a recommendation of something you can do instead. Disclaimer:
                not all of these recommendations are ideal or preferable at this
                time. Please make your best judgement and take it with a grain
                of salt
              </p>
              <br />
              <p>
                Enjoy this Awesome video about ponies or feel free to close this
                window (the timer will continue even if you leave 😊 )
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/hAXX_bPxIzY"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button onClick={resetTimer}>Reset Timer</button>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}
