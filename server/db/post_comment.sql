INSERT INTO dream_comments (comment_text, user_id, post_id, comment_date)
VALUES ($1, $2, $3, now())