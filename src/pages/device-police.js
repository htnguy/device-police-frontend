import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import SEO from "../components/seo"
import Intro from "../components/intro"

export default ({ location, history }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Intro />
      <div>
        <b>
          Don't worry you can always delete your account after trying it out. We
          don't keep any of your information after deleting your account 😂
        </b>
      </div>
      <br />
      <h2>
        <Link to="/auth">Try it Out!</Link>
      </h2>
    </Layout>
  )
}
