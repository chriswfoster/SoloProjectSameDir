import React, { Component } from "react"

import { getAllPosts, toDisplay } from "../../../ducks/reducer"
import { connect } from "react-redux"

import "../../../Retrothemecontents/fixedx.png"

import "./mostliked.css"
class Mostliked extends Component {
  constructor() {
    super()
    this.state = {
      display: "liked__inner fader"
    }
  }

  hiderfunction() {
    this.state.display === "liked__inner fader"
      ? this.setState({ display: "liked__inner hideit" })
      : this.setState({ display: "liked__inner fader" })
  }

  render() {
    const testz = Math.max.apply(
      Math,
      this.props.allposts.map((dream, i) => dream.likes)
    )

    const evenfinder = this.props.allposts.map(
      (dream, i) =>
        testz == dream.likes ? (
          <div className={this.state.display} div key={i}>
            <div>
              <label
                className={this.props.theme.closexborder}
                onClick={() => this.hiderfunction()}
              />
            </div>

            <center>
              <h1 className="likednittifont"> MOST LIKED RECENT POST! </h1>
            </center>
            <h3>
              <u>{dream.story_title}</u>
            </h3>

            <div className={this.props.theme.inputboxes.concat(
                  " ",
                  "likedstorytext")} id="likedscrollbar">
              <pre>{dream.story_text}</pre>
            </div>

            <div className="likedinfluenceflex">
              <div
                className={this.props.theme.inputboxes.concat(
                  " ",
                  "likedinfluence"
                )}
                id="likedscrollbar"
              >
                <pre>
                  <u>DREAM AID:</u> <br />
                  {dream.influence}
                </pre>
              </div>

              <div className={this.props.theme.inputboxes.concat(
                  " ",
                  "likedinfluence"
                )} id="likedscrollbar">
                <pre>
                  <u>BACK STORY:</u> <br />
                  {dream.back_story}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
    )

    return <div>{evenfinder}</div>
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getAllPosts, toDisplay })(Mostliked)
