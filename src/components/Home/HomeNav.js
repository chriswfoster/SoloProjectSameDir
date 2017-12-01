import React, { Component } from "react"
import "./home.css"
import { getAllPosts } from "../../ducks/reducer"
import { connect } from "react-redux"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  handleLogin() {
    window.location.href = "http://localhost:80/login"
  }
  handleLogout() {
    window.location.href = "http://localhost:80/logout"
  }

  render() {
    return (
      <div>
        <div className={this.props.theme.navz.concat(" ", "navz ")}>
          <p className={this.props.theme.font.concat(" ", "dreamnotesfont")}>
            {" "}
            DREAM NOTES{" "}
          </p>
          <div>
            {!this.props.user.user_id ? (
              <div className="loginbuttons">
                <button
                  onClick={this.handleLogin}
                  className={this.props.theme.loginbuttons}
                >
                  LOGIN
                </button>
                <button
                  onClick={this.handleLogin}
                  className={this.props.theme.loginbuttons}
                >
                  REGISTER
                </button>
              </div>
            ) : (
              <p
                onClick={this.handleLogout}
                className={this.props.theme.loginbuttons.concat(
                  " ",
                  "loginbutton"
                )}
              >
                LOGOUT
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, { getAllPosts })(Home)
