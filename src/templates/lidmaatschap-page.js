import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'

export const LidmaatschapPageTemplate = ({
                                        image,
                                        title,
                                        heading,
                                        description,
                                        testimonials,
                                        pricing,
                                    }) => (
    <div className="content">
        <div
            className="full-width-image-container margin-top-0"
            style={{
                backgroundImage: `url(${
                    !!image.childImageSharp ? image.childImageSharp.fluid.src : image
                    })`,
            }}
        >
            <h2
                className="has-text-weight-bold is-size-1"
                style={{
                    boxShadow: '0.5rem 0 0 #FF0000, -0.5rem 0 0 #FF0000',
                    backgroundColor: '#FF0000',
                    color: 'white',
                    padding: '1rem',
                }}
            >
                {title}
            </h2>
        </div>
        <section className="section section--gradient">
            <div className="container">
                <div className="section">
                    <div className="columns">
                        <div className="column is-7 is-offset-1">
                            <h3 className="has-text-weight-semibold is-size-2">{heading}</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h2 className="has-text-weight-semibold is-size-2">
                                {pricing.heading}
                            </h2>
                            <p className="is-size-5">{pricing.description}</p>
                            <Pricing data={pricing.plans} />

                            <Testimonials testimonials={testimonials} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

LidmaatschapPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    testimonials: PropTypes.array,
    pricing: PropTypes.shape({
        heading: PropTypes.string,
        description: PropTypes.string,
        plans: PropTypes.array,
    }),
}

const data = "";
const LidmaatschapPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <LidmaatschapPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                description={frontmatter.description}
                testimonials={frontmatter.testimonials}
                pricing={frontmatter.pricing}
            />
        </Layout>
    )
}

LidmaatschapPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default LidmaatschapPage

export const LidmaatschapPageQuery = graphql`
  query LidmaatschapPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description   
        testimonials {
          author
          quote
        }
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`
