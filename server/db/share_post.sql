INSERT INTO dream_share (post_id) SELECT $1
WHERE NOT EXISTS (SELECT * FROM dream_share WHERE post_id = $1)