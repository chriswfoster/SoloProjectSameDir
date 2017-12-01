SELECT dp.post_id, dp.story_text, dp.influence, dp.back_story, dp.user_id, dp.story_title, dp.post_date, du.displayname, du.nickname ,(select COUNT(*) FROM dream_likes WHERE dream_likes.post_id = dp.post_id)AS likes
FROM dream_posts dp
JOIN dream_user du on dp.user_id = du.user_id
ORDER BY dp.post_id desc limit 20