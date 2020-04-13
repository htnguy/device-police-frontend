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
      <Link to="/auth">Try it Out!</Link>
    </Layout>
  )
}
