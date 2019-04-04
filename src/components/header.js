import { Link } from "gatsby"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import React from "react"

const Header = ({ siteTitle, siteSubtitle, onLanguageChange }) => (
  <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "cover.png" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <header
        style={{
          backgroundColor: `#A78784`,
          backgroundImage: `url(${data.placeholderImage.childImageSharp.fluid.src})`,
          backgroundSize: `auto 130%`,
          marginBottom: `1.45rem`,
          backgroundPosition: `top center`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
          }}
        >
          {/* <h2>{siteSubtitle}</h2> */}
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `#1E1541`,
                fontWeight: 'bold',
                fontSize: '3em',
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
          {/* <h3>•Free Entrance•</h3> */}
        </div>
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteSubtitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  siteSubtitle: ``,
}

export default Header
