import React, { Component } from "react"
import { Link } from "react-router-dom"

import { darkTheme, retroTheme } from "../../../ducks/reducer"
import { connect } from "react-redux"

import "./navbutton.css"
class Navbutton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      plusbutton: this.props.theme.plusbutton.concat(
        " ",
        "navbuttoncircle navbuttonbouncer"
      ),
      homebutton: this.props.theme.homebutton.concat(
        " ",
        "navbuttonhomeicon navbuttonbouncer"
      ),
      yourpagebutton: this.props.theme.yourbutton.concat(
        " ",
        "navbuttonyourpageicon navbuttonbouncer"
      ),
      darkbutton: this.props.theme.darkbutton.concat(
        " ",
        "navbuttondarkicon navbuttonbouncer"
      ),
      retrobutton: this.props.theme.retrobutton.concat(
        " ",
        "navbuttonretroicon navbuttonbouncer"
      )
    }
  }

  expander() {
    this.state.plusbutton ===
      this.props.theme.plusbutton.concat(
        " ",
        "navbuttoncircle navbuttonbouncer"
      ) ||
    this.state.plusbutton ===
      this.props.theme.plusbutton.concat(
        " ",
        "navbuttoncircle navbuttonrollerreverse"
      )
      ? this.setState({
          plusbutton: this.props.theme.plusbutton.concat(
            " ",
            "navbuttoncircle navbuttonroller"
          ),
          homebutton: this.props.theme.homebutton.concat(
            " ",
            "navbuttonhomeicon navbuttonmovehome"
          ),
          yourpagebutton: this.props.theme.yourbutton.concat(
            " ",
            "navbuttonyourpageicon navbuttonmoveyourpage"
          ),
          darkbutton: this.props.theme.darkbutton.concat(
            " ",
            "navbuttondarkicon navbuttonmovedark"
          ),
          retrobutton: this.props.theme.retrobutton.concat(
            " ",
            "navbuttonretroicon navbuttonmoveretro"
          )
        })
      : this.setState({
          plusbutton: this.props.theme.plusbutton.concat(
            " ",
            "navbuttoncircle navbuttonrollerreverse"
          ),
          homebutton: this.props.theme.homebutton.concat(
            " ",
            "navbuttonhomeicon navbuttonmovehomereverse"
          ),
          yourpagebutton: this.props.theme.yourbutton.concat(
            " ",
            "navbuttonyourpageicon navbuttonmoveyourpagereverse"
          ),
          darkbutton: this.props.theme.darkbutton.concat(
            " ",
            "navbuttondarkicon navbuttonmovedarkreverse"
          ),
          retrobutton: this.props.theme.retrobutton.concat(
            " ",
            "navbuttonretroicon navbuttonmoveretroreverse"
          )
        })
  }

  render() {
    return (
      <div onClick={() => this.expander()}>
        <div className={this.state.plusbutton}>
          <img
            src={require("../../../Retrothemecontents/whiteplus.png")}
            alt="Expand."
          />
        </div>
        <Link to="/" className={this.state.homebutton}>
          {" "}
          <img
            src={require("../../../Retrothemecontents/home_icon.png")}
            alt="HOME"
          />
        </Link>
        <Link to="/yourpage" className={this.state.yourpagebutton}>
          {" "}
          <img
            src={require("../../../Retrothemecontents/yourpage_icon.png")}
            alt="Your Page"
          />{" "}
        </Link>
        <div
          className={this.state.darkbutton}
          onClick={() => this.props.darkTheme()}
        >
          <img
            src={require("../../../Darkthemecontents/dark_theme_button.png")}
            alt="Dark Theme"
          />
        </div>
        <div
          className={this.state.retrobutton}
          onClick={() => this.props.retroTheme()}
        >
          <img
            src={require("../../../Retrothemecontents/retro.png")}
            alt="Retro Theme"
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { darkTheme, retroTheme })(Navbutton)
