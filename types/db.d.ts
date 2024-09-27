import { Comment, Post, Subgroup, User, Vote } from "@prisma/client";

export type ExtendedPost = Post & {
  subgroup: Subgroup;
  votes: Vote[];
  author: User;
  comments: Comment[];
};
