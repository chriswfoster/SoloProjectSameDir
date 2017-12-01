import React, { Component } from "react"

import { connect } from "react-redux"
import {
  getUserInfo,
  typeTitle,
  typeAid,
  typeInfluence,
  typeStory
} from "../../ducks/reducer"
import axios from "axios"

import "./NewPost.css"

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slider: this.props.theme.popupboxes.concat(' ', "newpostbackground newpostbackgroundhider")
    }

    this.createPost = this.createPost.bind(this)
  }

  componentDidMount() {
    // axios.get('/api/me')
    // .then(response => {
    // })
    this.props.getUserInfo()
  }

  createPost() {
    axios
      .post("/api/post", {
        story_title: this.props.type_title,
        story_text: this.props.type_story,
        influence: this.props.type_dreamaid,
        back_story: this.props.type_life,
        user_id: this.props.user.user_id
      })
      .then(response => {
        return response.data
      })
  }

  slideInFunction() {
    this.state.slider === this.props.theme.popupboxes.concat(' ', "newpostbackground newpostbackgroundhider")
      ? this.setState({ slider: this.props.theme.popupboxes.concat(' ', "newpostbackground sliderIn") })
      : this.setState({ slider: this.props.theme.popupboxes.concat(' ', "newpostbackground newpostbackgroundhider") })
  }

  render() {
    const { typeTitle, typeAid, typeInfluence, typeStory } = this.props
    console.log(this.props)
    return (
      <div>
          
          <div className="spinzheight">
          <div className={this.props.theme.newpostgif} alt="New Post"/>
        <div
          className={this.props.theme.yournewpostbutton.concat(' ', this.props.theme.font, ' ', "yournewpost")}
          onClick={() => this.slideInFunction()}
        > 
          NEW POST
        </div>
        </div>
        {/*  -------   NEW POST BUTTON ABOVE  ------   */}

        <div className={this.state.slider}>

        <div className={this.props.theme.closexborder} onClick={() => this.slideInFunction()}></div>

          <div className="newpostflexorganizer">
            <div className="newposttitleflex">
              <div className={this.props.theme.fancytitleline.concat(' ', "newposttitleline")} />
              <p className={this.props.theme.font.concat(' ', "newpostdreamnotesfont")}>NEW POST</p>
              <div className={this.props.theme.fancytitleline.concat(' ', "newposttitleline")} />            </div>

            <div className="spantext">
              <span className={this.props.theme.font}>TITLE DREAM:</span>
              <br />
              <input
                className={this.props.theme.inputboxes.concat(' ', "titletext")}
                onChange={e => typeTitle(e.target.value)}
              />
            </div>

            <div className="spantext">
              <span className={this.props.theme.font}> DESCRIBE THE DREAM: </span>{" "}
              <br />
              <textarea
                className={this.props.theme.inputboxes.concat(' ', "storytext")}
                onChange={e => typeStory(e.target.value)}
              />
            </div>

            <div className="organizeinfluenceboxes">
              <div className="influencespandivs">
                <span className={this.props.theme.font}>SLEEP OR DREAM AID:</span>
                <br />
                <textarea
                  className={this.props.theme.inputboxes.concat(' ', "influencetext")}
                  onChange={e => typeAid(e.target.value)}
                />
              </div>

              <div className="influencespandivs">
                <span className={this.props.theme.font}>REAL LIFE INFLUENCE:</span>
                <br />
                <textarea
                  className={this.props.theme.inputboxes.concat(' ', "influencetext")}
                  onChange={e => typeInfluence(e.target.value)}
                />
              </div>
            </div>

            <div onClick={this.createPost} className={this.props.theme.button.concat(' ', "spantext")}>
              CREATE POST
            </div>
          </div>

          {/*  ---------- END OF CENTER PIECE ----  */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {
  getUserInfo,
  typeTitle,
  typeAid,
  typeInfluence,
  typeStory
})(NewPost)
