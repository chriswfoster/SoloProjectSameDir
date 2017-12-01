import React, { Component } from "react"
import { connect } from "react-redux"
import { typeComment } from "../../ducks/reducer"
import axios from "axios"
import Moment from "react-moment"

import "./comments.css"

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allcomments: []
    }
  }

  componentDidMount(dreamid) {
    axios
      .get(`/api/getallcomments/${this.props.display_post}`)
      .then(response => {
        this.setState({ allcomments: response.data })
      })
    // getAllComments(this.props.edit_me)
  }

  render(props) {
    const { typeComment} = this.props
    const commentlist =
      this.state.allcomments.length > 0 ? (
        this.state.allcomments.map((comment, i) => (
          <div key={i} className="centerposts">
            <div className={this.props.theme.font}>
              Comment by: {comment.nickname}{", "}
              <Moment subtract={{ hours: 6 }} fromNow>
                {comment.comment_date}
              </Moment>{" "}
            </div>
            <div className="commentboxes">
              {i % 2 === 0 ? (
                <div
                  className={this.props.theme.inputboxes.concat(
                    " ",
                    "commentalignleft"
                  )}
                >
                  {comment.comment_text}
                </div>
              ) : (
                <div
                  className={this.props.theme.inputboxes.concat(
                    " ",
                    "commentalignright"
                  )}
                >
                  {comment.comment_text}
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={this.props.theme.font}>'NO COMMENTS HERE'</div>
      )
    return (
      <div>
        {commentlist}
        <div className="centerposts">
          {!this.props.user.user_id ? (
            <div>
              <button
                onClick={this.handleLogin}
                className={this.props.theme.button}
              >
                LOGIN TO COMMENT
              </button>
            </div>
          ) : (
            <textarea
              className={this.props.theme.inputboxes.concat(" ", "postboxes")}
              defaultValue="Type your comment"
              onChange={e => typeComment(e.target.value)}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { typeComment })(Comments)
