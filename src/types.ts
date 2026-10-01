export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string | null;
}

export interface PostDetail {
  desc: string;
  utilities: string;
  pet: string;
  income: string;
  size: number;
  school: number;
  bus: number;
  restaurant: number;
}

export interface Post {
  id: string | number;
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  city?: string;
  latitude: number;
  longitude: number;
  type?: string;
  property?: string;
  postdetail?: PostDetail;
  user?: Pick<User, "id" | "username" | "avatar">;
  isSaved?: boolean;
}

export interface SavedPost {
  post: Post;
}

export interface ChatUser extends Pick<User, "id" | "username" | "avatar"> {}

export interface Message {
  id: string | number;
  chatId?: string;
  text: string;
  userId: string;
  createdAt?: string | Date;
}

export interface Chat {
  id: string;
  users: ChatUser[];
  lastMessage?: string;
  messages?: Message[];
}

export interface ProfileLoaderData {
  posts: Post[];
  chats: Chat[];
  savedposts: SavedPost[];
}

export interface AuthContextValue {
  currentUser: User | null;
  updateUser: (user: User | null) => void;
}