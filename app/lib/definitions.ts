export type Topic = {
  id: number;
  title: string;
  description: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  category: string;
  likes: string;
  dislikes: string;
  userLikeStatus: "LIKE" | "DISLIKE";
  createdAt: Date;
  postedBy: User;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  gender: "MALE" | "FEMALE";
};

export type Comment = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  content: string;
  userLikeStatus: string;
  likes: string;
  dislikes: string;
  authorId: number;
};
export type Categories = [
  "GENERAL",
  "TECHNOLOGY",
  "SPORTS",
  "ENTERTAINMENT",
  "HEALTH",
  "EDUCATION"
];
