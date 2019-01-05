import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`facebook`, `birthdays`, `filter`]} />
    <h1>Figure out the important friends!</h1>
    <ol>
      <li>
        Go to <Link to="https://www.facebook.com">facebook.com</Link>
      </li>
      <li>Click on the downwards arrow in the top right</li>
      <li>Click Settings</li>
      <li>Your Facebook Information</li>
      <li>Download Your Information (View)</li>
      <li>Format: JSON</li>
      <li>Select on friends</li>
      <li>Click Create File</li>
      <li>Wait for download to be available and download</li>
      <li>Double click the .zip file</li>
    </ol>
    <p>
      Done? Go to the <Link to="viewer">viewer</Link>
    </p>
  </Layout>
)

export default IndexPage
