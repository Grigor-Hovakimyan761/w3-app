# Data Model: Supabase + IPFS

## Storage split

Supabase is the app database. It stores users, posts, votes, saved posts, comments, and the IPFS CID for each uploaded file.

IPFS stores the actual uploaded material: PDF, image, presentation, or other academic file. The app never puts private user data on IPFS.

## Upload flow

1. The user fills the upload form.
2. The attached file is uploaded to IPFS through a backend/Edge Function.
3. IPFS returns a CID.
4. The app creates a row in `posts`.
5. The app creates one or more rows in `post_files` with the CID and file metadata.
6. Feed and detail pages read `posts` and `post_files` from Supabase.

## Tables

- `users`: private user profile linked to `auth.users`.
- `posts`: searchable post metadata, author snapshot, score, and comment count.
- `post_files`: IPFS CIDs and file metadata for each post.
- `votes`: one vote per user per post.
- `saved_posts`: user's saved post list.
- `comments`: comments on public posts.

## Access rules

- Public users can read published public posts, files, and comments.
- Authenticated users can create posts, comments, votes, and saved posts for themselves.
- Users can read and update only their own private `users` row.
- Authors can update or delete their own posts and files.
- IPFS files are public in this MVP. Private files would require encryption before upload.

## Next implementation step

Add the Supabase client and replace mock post data with reads from `posts` and `post_files`. After that, wire `UploadPost` to upload a file and save the returned CID.
