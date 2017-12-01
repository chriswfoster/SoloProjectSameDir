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

class Editpage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editpopup: "yourpopup__hide",
        baseclass: "yourpopup__hide",
      posttopopup: null
    }
  }

  editStory(postid) {
    console.log(postid)
    axios
      .put("/api/editStory", {
        post_id: postid,
        story_text: this.props.type_story
      })
      .then(response => {
        return response.data
      })
  }

  popEdit(i) {
    console.log(this.state)

    this.state.editpopup === "yourpopup__hide" &&
    this.state.posttopopup === null
      ? this.setState({
          baseclass: "basereveal",
          editpopup: this.props.theme.popupboxes.concat(' ', "yourpopup__inner"),
          posttopopup: i
        })
      : this.setState({ editpopup: "yourpopup__hide", baseclass: "yourpopup__hide", posttopopup: null })
  }

  render(props) {
    const { typeStory, dream, i } = this.props
    return (
      <div>
      
        <div className={this.state.baseclass}>
          <label onClick={() => this.popEdit(i)} className="yourpopup__bg" />
          <div  className={this.state.editpopup}>
    
              <label
                onClick={() => this.popEdit(i)}
                className={this.props.theme.closexborder}
              >
          
              </label>
           
            <div className="yourpopup__textbox">
              <center>
                <h3 className={this.props.theme.font}>
                  TITLE : "{dream.story_title}"{" "}
                </h3>
              </center>
              <textarea
                className={this.props.theme.inputboxes.concat(
                  " ",
                  "yourpoptextboxes"
                )}
                onChange={e => typeStory(e.target.value)}
                defaultValue={dream.story_text}
              />
              <div className="yoursavebuttonalignment">
                <div
                  className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                  onClick={() => this.editStory(dream.post_id)}
                >
                  SAVE
                </div>
                <label
                  className={this.props.theme.button.concat(
                    " ",
                    this.props.theme.font
                  )}
                  onClick={() => window.location.reload()}
                >
                  {" "}
                  CLOSE{" "}
                </label>
              </div>
            </div>
          </div>
        </div>
        <label
          onClick={() =>
            typeStory(dream.story_text) &&
            this.popEdit(dream.post_id)
          }
        >
          <div
            className={this.props.theme.button.concat(
              " ",
              this.props.theme.font
            )}
          >
            EDIT
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
})(Editpage)