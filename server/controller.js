module.exports = {
  createPost: (req, res, next) => {
    const dbInstance = req.app.get("db")
    console.log(req.body)
    const { story_title, story_text, influence, back_story, user_id } = req.body

    dbInstance
      .create_post(story_title, story_text, influence, back_story, user_id)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  sharePost: (req, res, next) => {
    const dbInstance = req.app.get("db")
    console.log(req.body)
    const { post_id } = req.body

    dbInstance
      .share_post(post_id)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  getAllYourPosts: (req, res, next) => {
    const dbInstance = req.app.get("db")
    const { params } = req

    dbInstance
      .read_your_posts(params.id)
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send())
  },

  getAllPosts: (req, res, next) => {
    const dbInstance = req.app.get("db")

    dbInstance
      .get_all_posts()
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send())
  },

  editStory: (req, res, next) => {
    console.log(req.body)
    const dbInstance = req.app.get("db")
    const { post_id, story_text } = req.body

    dbInstance
      .update_story(post_id, story_text)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  editInfluence: (req, res, next) => {
    console.log(req.body)
    const dbInstance = req.app.get("db")
    const { post_id, influence } = req.body

    dbInstance
      .update_influence(post_id, influence)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  editBackstory: (req, res, next) => {
    console.log(req.body)
    const dbInstance = req.app.get("db")
    const { post_id, back_story } = req.body

    dbInstance
      .update_backstory(post_id, back_story)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  getAllComments: (req, res, next) => {
    const dbInstance = req.app.get("db")
    const { params } = req

    dbInstance
      .get_all_comments(params.id)
      .then(response => res.status(200).send(response))
      .catch(() => res.status(500).send())
  },

  likePost: (req, res, next) => {
    const dbInstance = req.app.get("db")
    console.log(req.body)
    const { post_id, user_id } = req.body

    dbInstance
      .add_like(post_id, user_id)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  },

  postComment: (req, res, next) => {
    const dbInstance = req.app.get("db")
    console.log(req.body)
    const { comment_text, user_id, post_id } = req.body

    dbInstance
      .post_comment(comment_text, user_id, post_id)
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send())
  }

}
