import React, { Component } from "react"
import "./home.css"
import { getAllPosts, getUserInfo } from "../../ducks/reducer"
import { connect } from "react-redux"
import Poster from "./Poster"
import HomeNav from "./HomeNav"
import Navbutton from "./Navbutton/Navbutton"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    this.props.getAllPosts()
    this.props.getUserInfo()
  }

  handleLogin() {
    window.location.href = "http://localhost:80/login"
  }

  render() {
    return (
      <div className={this.props.theme.background}>
        <HomeNav />
        <Poster />
        <Navbutton />
      </div>
    )
  }
}
const mapStateToProps = state => state

export default connect(mapStateToProps, { getAllPosts, getUserInfo })(Home)
