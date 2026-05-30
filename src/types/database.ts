export type AuthMethod = 'wallet' | 'email';
export type PostSubject = 'math' | 'physics' | 'chemistry' | 'programming' | 'biology' | 'general';
export type PostStatus = 'draft' | 'published' | 'archived';
export type PostVisibility = 'public';
export type StorageProvider = 'ipfs';
export type VoteValue = -1 | 1;

export type UserRow = {
  id: string;
  email: string | null;
  wallet_address: string | null;
  auth_method: AuthMethod;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  university: string | null;
  faculty: string | null;
  course: string | null;
  created_at: string;
  updated_at: string;
};

export type PostRow = {
  id: string;
  author_id: string;
  author_username: string;
  title: string;
  description: string;
  subject: PostSubject;
  visibility: PostVisibility;
  status: PostStatus;
  vote_score: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
};

export type PostFileRow = {
  id: string;
  post_id: string;
  storage_provider: StorageProvider;
  ipfs_cid: string;
  gateway_url: string | null;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  display_order: number;
  created_at: string;
};

export type VoteRow = {
  id: string;
  post_id: string;
  user_id: string;
  vote_value: VoteValue;
  created_at: string;
  updated_at: string;
};

export type SavedPostRow = {
  user_id: string;
  post_id: string;
  created_at: string;
};

export type CommentRow = {
  id: string;
  post_id: string;
  user_id: string;
  author_username: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type FeedPost = PostRow & {
  files: PostFileRow[];
};
