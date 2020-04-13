import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people,</h1>
    <p>I know. My design skill needs some work. Hear me out</p>
    <p>
      On April 2, 2020, a new challenge rosed from our despair and gave us new
      hopes for a better future.
    </p>
    <p>
      {" "}
      Yes I am talking about the ⭐⭐
      <a
        href="https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8"
        target="_blank"
        rel="noopener noreferrer"
      >
        Devto Twilio Hackathon!
      </a>
      ⭐⭐
    </p>
    <p>
      As a fellow developer and a citizen of this amazing world, I decided to
      embark on this uncertain journey
    </p>
    <p>My jouney has led me here</p>
    <Link to="/device-police">see what I found</Link>🚪
  </Layout>
)

export default IndexPage
