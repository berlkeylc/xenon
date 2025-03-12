export interface User {
    id: string;
    displayName: string;
    email?: string;
    username: string;
    bio?: string;
    photoURL?: string;
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