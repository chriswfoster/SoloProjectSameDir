SELECT dc.comment_id, dc.comment_text, dc.user_id, dc.post_id, dc.comment_date, du.auth_id, du.displayname, du.nickname
FROM dream_comments dc
JOIN dream_user du ON dc.user_id = du.user_id
WHERE dc.post_id = $1
ORDER BY comment_id desc limit 10