import axios from "axios"
// Action Constants
const REQ_USER = "REQ_USER"
const GET_ALL_YOUR_POSTS = "GET_ALL_YOUR_POSTS"

const GET_ALL = "GET_ALL"
const TYPE_TITLE = "TYPE_TITLE"
const TYPE_DREAMAID = "TYPE_DREAMAID"
const TYPE_LIFE = "TYPE_LIFE"
const TYPE_STORY = "TYPE_STORY"
const DISPLAY_POST = "DISPLAY_POST"
const TYPE_COMMENT = "TYPE_COMMENT"
const DARK_THEME = "DARK_THEME"
const RETRO_THEME = "RETRO_THEME"

//Initial State

const initialState = {
  user: {},
  allposts: [],
  allyourposts: [],
  type_title: "",
  type_dreamaid: "",
  type_life: "",
  type_story: "",
  type_comment: "",
  story_text: "",
  influence: "",
  back_story: "",
  display_post: {},
  theme: {
    background: "global_retro_bodybackground",
    navz: "global_retro_navz",
    font: "global_retro_font",
    sidebartext: "global_retro_pinktext",
    titletext: "global_retro_title_text",
    button: "global_retro_button",
    loginbuttons: "global_retro_loginbuttons",
    closexborder: "global_retro_x_circle",
    inputboxes: "global_retro_inputboxes",
    popupboxes: "global_retro_popupboxes",
    fancytitleline: "global_retro_fancy_title_line",
    yournewpostbutton: "global_retro_yournewpost_button",
    newpostgif: "global_retro_spiralspin_gif",
    animatelinespan: "global_retro_animatelinespan",
    plusbutton: "global_retro_plusbutton",
    homebutton: "global_retro_homebutton",
    yourbutton: "global_retro_yourbutton",
    darkbutton: "global_retro_darkbutton",
    retrobutton: "global_retro_retrobutton"
  }
  //or can give it null as a starter value
}

//Reducer

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQ_USER + "_PENDING": //pending tag is applied by redux promise middleware
      return Object.assign({}, state, { isLoading: true })
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      })

    case GET_ALL + "_PENDING": //pending tag is applied by redux promise middleware
      return Object.assign({}, state, { isLoading: true })
    case GET_ALL + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        allposts: action.payload
      })
    case GET_ALL_YOUR_POSTS + "_PENDING":
      return Object.assign({}, state, { isLoading: true })
    case GET_ALL_YOUR_POSTS + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        allyourposts: action.payload
      })
    case DARK_THEME:
      return Object.assign({}, state, { theme: action.payload })
    case RETRO_THEME:
      return Object.assign({}, state, { theme: action.payload })

    case TYPE_TITLE:
      return Object.assign({}, state, { type_title: action.payload })
    case TYPE_DREAMAID:
      return Object.assign({}, state, { type_dreamaid: action.payload })
    case TYPE_LIFE:
      return Object.assign({}, state, { type_life: action.payload })
    case TYPE_STORY:
      return Object.assign({}, state, { type_story: action.payload })
    case TYPE_COMMENT:
      return Object.assign({}, state, { type_comment: action.payload })

    case DISPLAY_POST:
      return Object.assign({}, state, { display_post: action.payload })
    default:
      return state
  }
}

//Action Creators
export function getUserInfo() {
  return {
    type: REQ_USER,
    payload: axios.get("/api/me").then(response => {
      return getAllYourPosts(response.data.user_id) && response.data
    })
  }
}

export function getAllYourPosts(userid) {
  return {
    type: GET_ALL_YOUR_POSTS,
    payload: axios.get(`/api/getyourposts/${userid}`).then(response => {
      return response.data
    })
  }
}

export function getAllPosts() {
  return {
    type: GET_ALL,
    payload: axios.get(`/api/getallposts/`).then(response => response.data)
  }
}

export function typeTitle(title) {
  return {
    type: TYPE_TITLE,
    payload: title
  }
}

export function typeAid(dreamaid) {
  return {
    type: TYPE_DREAMAID,
    payload: dreamaid
  }
}

export function typeInfluence(lifeinf) {
  return {
    type: TYPE_LIFE,
    payload: lifeinf
  }
}

export function typeStory(story) {
  return {
    type: TYPE_STORY,
    payload: story
  }
}

export function toDisplay(postid) {
  console.log(postid)
  return {
    type: DISPLAY_POST,
    payload: postid
  }
}

export function typeComment(comment) {
  console.log(comment)
  return {
    type: TYPE_COMMENT,
    payload: comment
  }
}

export function darkTheme() {
  return {
    type: DARK_THEME,
    payload: {
      background: "global_dark_bodybackground",
      navz: "global_dark_navz",
      font: "global_dark_font",
      sidebartext: "global_dark_sidebartext",
      titletext: "global_dark_title_text",
      button: "global_dark_button",
      loginbuttons: "global_dark_loginbuttons",
      closexborder: "global_dark_x_circle",
      inputboxes: "global_dark_inputboxes",
      popupboxes: "global_dark_popupboxes",
      fancytitleline: "global_dark_fancy_title_line",
      yournewpostbutton: "global_dark_yournewpost_button",
      newpostgif: "global_dark_eye_gif",
      animatelinespan: "global_dark_animatelinespan",
      plusbutton: "global_dark_plusbutton",
      homebutton: "global_dark_homebutton",
      yourbutton: "global_dark_yourbutton",
      darkbutton: "global_dark_darkbutton",
      retrobutton: "global_dark_retrobutton"
    }
  }
}

export function retroTheme() {
  return {
    type: RETRO_THEME,
    payload: {
      background: "global_retro_bodybackground",
      navz: "global_retro_navz",
      font: "global_retro_font",
      sidebartext: "global_retro_pinktext",
      titletext: "global_retro_title_text",
      button: "global_retro_button",
      loginbuttons: "global_retro_loginbuttons",
      closexborder: "global_retro_x_circle",
      inputboxes: "global_retro_inputboxes",
      popupboxes: "global_retro_popupboxes",
      fancytitleline: "global_retro_fancy_title_line",
      yournewpostbutton: "global_retro_yournewpost_button",
      newpostgif: "global_retro_spiralspin_gif",
      animatelinespan: "global_retro_animatelinespan",
      plusbutton: "global_retro_plusbutton",
      homebutton: "global_retro_homebutton",
      yourbutton: "global_retro_yourbutton",
      darkbutton: "global_retro_darkbutton",
      retrobutton: "global_retro_retrobutton"
    }
  }
}
