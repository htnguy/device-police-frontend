import React from "react"

const technologies = [
  { name: "NodeJS", purpose: "backend server" },
  { name: "ExpressJS", purpose: "web framework that sits on top of Node" },
  {
    name: "Mongoose",
    purpose:
      "ODM - object document mapper that makes working with MongoDB much easier",
  },
  { name: "MongoDB", purpose: "Our database" },
  {
    name: "Twilio Node Helper",
    purpose: "makes sending and receiving sms through Twilio feel like heaven",
  },
  {
    name: "The Bored API",
    purpose: "fetching random activity for you to do",
  },
  { name: "Gatsby", purpose: "static website generator" },
  {
    name: "React",
    purpose: "Client Library for managing our UI components /w React Hooks!",
  },
]

export default () => {
  return (
    <div>
      <h2>Introducing ✨✨ DevicePolice ✨✨</h2>
      <h3>What is DevicePolice?</h3>
      <p>
        DevicePolice is a small tool that helps you curve your habit of spending
        too much time on your device. As a result of COVID-19 and the
        quarantine, more people are staying at home and consequently spending
        more time on their device. However, staying at home doesn't mean you
        have to give up all activities. There are plenty of things that you can
        do in the comfort of your own home.
      </p>

      <h3>The Stack</h3>
      {technologies.map((t, i) => (
        <div key={i}>
          <b>{t.name}</b>
          <p>{t.purpose}</p>
        </div>
      ))}
    </div>
  )
}
