import React, { Component } from "react"

import { getAllPosts, toDisplay } from "../../../ducks/reducer"
import { connect } from "react-redux"
import Moment from "react-moment"
import Comments from "../../Comments/Comments"
import axios from "axios"

import "../home.css"
class Sidebar extends Component {
  componentWillReceiveProps() {}

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

  render(props) {
    const { i, dream, dreamid } = this.props
    return (
      <div>
        <div>
          <input type="checkbox" id={`popup__${i}`} className="popup__check" />
          <div className="popup__base">
            <label htmlFor={`popup__${i}`} className="popup__bg" />
            <div
              className={this.props.theme.popupboxes.concat(
                " ",
                "popup__inner"
              )}
            >
              <label
                htmlFor={`popup__${i}`}
                className={this.props.theme.closexborder}
              />
              <div className="popup__textbox">
                <h3 className={this.props.theme.titletext}>
                  TITLE: <u>{dream.story_title}</u>
                </h3>

                {this.props.display_post === dreamid ? (
                  <Comments dreamid={dreamid} />
                ) : (
                  "No comments here yet..."
                )}
                <div className="savebuttonalignment">
                  <div>
                    <label
                      htmlFor={`popup__${i}`}
                      className={this.props.theme.button.concat(
                        " ",
                        this.props.theme.font
                      )}
                      onClick={() => window.location.reload()}
                    >
                      CLOSE
                    </label>
                  </div>
                  {!this.props.user.user_id ? (
                    ""
                  ) : (
                    <div>
                      <label
                        className={this.props.theme.button.concat(
                          " ",
                          this.props.theme.font
                        )}
                        onClick={() =>
                          this.postComment(dream.post_id) &
                          window.location.reload()
                        }
                      >
                        SAVE
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {i % 2 === 0 ? (
          <label
            htmlFor={`slide__${i}`}
            onClick={() => {
              toDisplay(dream.post_id)
            }}
          >
            <div
              className="slideRight"
              style={{ animationDuration: `${i / 2 + 0.5}s` }}
            >
              <div className={this.props.theme.animatelinespan}>
                <div className={this.props.theme.font}>
                  <u>{dream.story_title}</u>{" "}
                </div>
                <div className="nittifont">
                  Posted by: {dream.displayname},{" "}
                  <Moment subtract={{ hours: 6 }} fromNow>
                    {dream.post_date}
                  </Moment>.
                </div>
                <div>{dream.likes} Likes </div>
              </div>
              <div className="linespan"> </div>
            </div>
          </label>
        ) : (
          <label
            className="slideLeft"
            style={{ animationDuration: `${i / 2 + 0.5}s` }}
            htmlFor={`slide__${i}`}
            onClick={() => {
              toDisplay(dream.post_id)
            }}
          >
            <div>
              <div className={this.props.theme.animatelinespan}>
                <div className={this.props.theme.font}>
                  <u>{dream.story_title}</u>{" "}
                </div>
                <div className="nittifont">
                  Posted by: {dream.displayname},{" "}
                  <Moment subtract={{ hours: 6 }} fromNow>
                    {dream.post_date}
                  </Moment>.
                </div>
                <div>{dream.likes} Likes </div>
              </div>
              <div className="linespan"> </div>
            </div>
          </label>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { getAllPosts, toDisplay })(Sidebar)
