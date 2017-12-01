import React, { Component } from "react"

import { getAllPosts, toDisplay } from "../../ducks/reducer"
import { connect } from "react-redux"

import Sidebar from "./SideBar/Sidebar"
import Mostliked from "./Mostliked/Mostliked"
import axios from "axios"


import "./home.css"

class Poster extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.addLike = this.addLike.bind(this)
    this.postComment = this.postComment.bind(this)
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  addLike(postid) {
    axios
      .post("/api/like", {
        post_id: postid,
        user_id: this.props.user.user_id
      })
      .then(response => {
        console.log(response.data)
      })
  }

  postComment(postid) {
    axios
      .post("/api/postcomment", {
        comment_text: this.props.type_comment,
        user_id: this.props.user.user_id,
        post_id: postid
      })
      .then(response => {
        return response.data
      })
  }

  render() {
    const {toDisplay } = this.props
    const list = this.props.allposts.map((dream, i) => (
      <div key={i} className={this.props.theme.sidebartext.concat(' ' , "mainlefttitles")}>
        <div className="wrapsharebuttons">
          <input type="checkbox" id={`slide__${i}`} className="slide__check" />
          <div className="slide__base">
            <label htmlFor={`slide__${i}`} className="slide__bg" />
            <div
              className={this.props.theme.popupboxes.concat(
                " ",
                "slide__inner"
              )}
            >
              <label
                htmlFor={`slide__${i}`}
                className={this.props.theme.closexborder}
              />
              <div
                className={this.props.theme.font.concat(" ", "slide__textbox")}
              >
                <div className={this.props.theme.titletext}>
                  <h3>
                    TITLE: <u>{dream.story_title}</u>
                  </h3>
                </div>
<div className={this.props.theme.inputboxes}>
               <pre> {dream.story_text}</pre>
     </div>
                <div className="wrapstorybuttons">
                  <div className={this.props.theme.button}>LIKE</div>

                  <label
                    htmlFor={`popup__${i}`}
                    className={this.props.theme.button}
                    onClick={() => {
                      toDisplay(dream.post_id)
                    }}
                  >
                    COMMENTS
                  </label>
                  <label
                    className={this.props.theme.button}
                    htmlFor={`popup2__${i}`}
                  >
                    INFLUENCE
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              id={`popup2__${i}`}
              className="popup__check"
            />
            <div className="popup__base">
              <label htmlFor={`popup2__${i}`} className="popup__bg" />
              <div
                className={this.props.theme.popupboxes.concat(
                  " ",
                  "popup__inner"
                )}
              >
                <label
                  htmlFor={`popup2__${i}`}
                  className={this.props.theme.closexborder}
                />
                <div className={this.props.theme.font.concat("popup__textbox")}>
                  <div className={this.props.theme.titletext}>
                    <h3>
                      TITLE: <u>{dream.story_title}</u>
                    </h3>
                  </div>
                  <pre
                    className={this.props.theme.inputboxes.concat(
                      " ",
                      "poptextboxes2"
                    )}
                  >
                    {dream.influence.length === 0
                      ? "No dream/sleep aid listed."
                      : dream.influence}
                  </pre>
                  <pre
                    className={this.props.theme.inputboxes.concat(
                      " ",
                      "poptextboxes3"
                    )}
                  >
                    {dream.back_story.length === 0
                      ? "No back story given."
                      : dream.back_story}
                  </pre>
                  <div>
                    <center>
                      <label
                        htmlFor={`popup2__${i}`}
                        className={this.props.theme.button}
                      >
                        CLOSE
                      </label>
                    </center>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Sidebar dream={dream} i={i} dreamid={dream.post_id} />
        </div>
      </div>
    ))
    return (
      <div>
        <div className="leftsidebox force-overflow" id="scrollbar">
          {list}
        </div>
        <Mostliked />
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, { getAllPosts, toDisplay })(Poster)
