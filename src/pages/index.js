import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import YouTube from "react-youtube"

const localizeMonth = (monthNumber, locale) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString(locale, { month: "long" })
}

const programs = [
  {
    month: 4,
    events: [
      {
        date: new Date(2019, 3, 4),
        title: "Ofer Landsberg Trio",
        videoId: '6Whbcz1OB0U',
        facebookLink: 'https://www.facebook.com/events/2275839359317140/?event_time_id=2352492044985204',
        performers: [
          {
            name: "Ofer Landsberg",
            instrument: "Guitar"
          },
          {
            name: "Yonatan Riklis",
            instrument: "Piano"
          },
          {
            name: "Gasper Bertoncelj",
            instrument: "Drums"
          }
        ]
      }
    ]
  }
]

const IndexPage = () => (
  <Layout>
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
                  width: window.innerWidth - 43
                }}
              />
            </>
          ))}
        </>
      ))
    }
  </Layout>
)

export default IndexPage
