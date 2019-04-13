import React from "react"
import { Link, graphql } from "gatsby"
import useWindowSize from "@rooks/use-window-size"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import YouTube from "react-youtube"

const localizeMonth = (monthNumber, locale) => {
  const date = new Date();
  date.setMonth(monthNumber);
  return date.toLocaleString(locale, { month: "long" })
}

const transformData = (data) => ({
  events: data.allMarkdownRemark.nodes.map(node => ({
    ...node.frontmatter,
    date: new Date(node.frontmatter.date),
  }))
});

const groupEventsToPrograms = (events) => {
  const byProgram = events.reduce((acc, event) => ({
    ...acc,
    [event.date.getMonth()]: [
      ...(acc[event.date.getMonth()] || []),
      event
    ]
  }), []);
  return Object.entries(byProgram).map(([month, events]) => ({
    month,
    events
  }))
}

const IndexPage = ({ data }) => {
  const { innerWidth } = useWindowSize();
  const transformedData = transformData(data);
  const programs = groupEventsToPrograms(transformedData.events);
  return <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {
      programs.map(program => (
        <>
          <h4>{localizeMonth(program.month, "en-us")} Jazz</h4>
          {program.events.map(event => (
            <>
              <h5>{event.date.toLocaleDateString("en-us", { month: 'numeric', day: 'numeric' })} {event.title}</h5>
              {event.performers.map(performer => (
                <p>
                  <b>{performer.name} - {performer.instrument}</b>
                </p>
              ))}
              <p>
                <a href={event.facebookLink}>Facebook Event</a>
              </p>
              <YouTube
                videoId={event.videoId}
                opts={{
                  width: Math.min(innerWidth - 43, 960)
                }}
              />
            </>
          ))}
        </>
      ))
    }
  </Layout>
}

export const query = graphql`
{
  allMarkdownRemark {
    nodes {
      frontmatter {
        date
        title
        videoId
        facebookLink
        performers {
          instrument
          name
        }
      }
    }
  }
}
`

export default IndexPage
