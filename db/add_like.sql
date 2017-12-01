INSERT INTO dream_likes (post_id, user_id) SELECT $1, $2
WHERE NOT EXISTS (SELECT * FROM dream_likes WHERE post_id = $1 AND user_id = $2)