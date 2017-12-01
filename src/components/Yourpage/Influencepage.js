import React, { Component } from "react"
import { connect } from "react-redux"
import "./yourpage.css"
import {
  getUserInfo,
  getAllYourPosts,
  typeStory,
  typeInfluence,
  typeAid
} from "../../ducks/reducer"
import axios from "axios"


class Influencepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      influencepopup: "yourpopup__hide",
      baseclass: "yourpopup__hide",
      posttopopup: null
    }
  }

  editInfluence(postid) {
    console.log(postid)
    axios
      .put("/api/editInfluence", {
        post_id: postid,
        influence: this.props.type_dreamaid
      })
      .then(response => {
        return response.data
      })
  }

  editBackstory(postid) {
    axios
      .put("/api/editBackstory", {
        post_id: postid,
        back_story: this.props.type_life
      })
      .then(response => {
        return response.data
      })
  }

  popInfluence(i) {
    console.log(this.state)

    this.state.influencepopup === "yourpopup__hide" &&
    this.state.posttopopup === null
      ? this.setState({
          baseclass: "basereveal",
          influencepopup: this.props.theme.popupboxes.concat(' ', "yourpopup__inner"),
          posttopopup: i
        })
      : this.setState({
          influencepopup: "yourpopup__hide",
          baseclass: "yourpopup__hide",
          posttopopup: null
        })
  }

  render(props) {
    const { typeAid, typeInfluence, dream, i } = this.props
    return (
      <div>
        <div className={this.state.baseclass}>
          <label
            onClick={() => this.popInfluence(i)}
            className="yourpopup__bg"
          />
          <div className={this.state.influencepopup}>
           
              <label
                onClick={() => this.popInfluence(i)}
                className={this.props.theme.closexborder}
              >
              </label>
      
<center>
            <h3 className={this.props.theme.font}>
              TITLE : "{dream.story_title}"
            </h3>
</center>
            <div className="yourpopup__textbox">
              <textarea
                className={this.props.theme.inputboxes.concat(
                  " ",
                  "yourpoptextboxes2"
                )}
                onChange={e => typeAid(e.target.value)}
                defaultValue={dream.influence}
              />
              <div
                className="yoursavebuttonalignment"
                onClick={() => this.editInfluence(dream.post_id)}
              >
                <p
                  className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                >
                  SAVE DREAM/SLEEP AID
                </p>
                
                <p
                className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                  onClick={() => window.location.reload()}
                >
                  CLOSE
                </p>
              
              </div>
              <textarea
                className={this.props.theme.inputboxes.concat(
                  " ",
                  "yourpoptextboxes3"
                )}
                onChange={e => typeInfluence(e.target.value)}
                defaultValue={dream.back_story}
              />
              <div className="yoursavebuttonalignment">
                <div
                  className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                  onClick={() => this.editBackstory(dream.post_id)}
                >
                  SAVE BACKSTORY
                </div>
              
                <label
                className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                  onClick={() => window.location.reload()}
                >
                  CLOSE
                </label>
         
              </div>
              
            </div>
          </div>
        </div>

        <label
          onClick={() =>
            typeStory(dream.story_text) && this.popInfluence(dream.post_id)
          }
        >
          <div
            className={this.props.theme.button.concat(
              " ",
              this.props.theme.font
            )}
          >
            INFLUENCE
          </div>
        </label>
      </div>
    )
  }
}
const mapStateToProps = state => state
export default connect(mapStateToProps, {
  getUserInfo,
  getAllYourPosts,
  typeStory,
  typeInfluence,
  typeAid
})(Influencepage)
