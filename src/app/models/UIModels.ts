export interface User {
    id: string;
    fullName: string;
    email?: string;
    username: string;
    bio?: string;
    avatarUrl?: string;
    location?: string;
    website?: string;
  }

  export interface Post {
    username: string;
    userId: string;
    fullName: string;
    createdAt: string;
    avatarUrl: string;
    text: string;
    id: string;
  }