import type {
  College,
  Comment,
  Course,
  Discussion,
  Review,
  User,
} from "@/generated/prisma/client";

export type CollegeListItem = Pick<
  College,
  | "id"
  | "slug"
  | "name"
  | "city"
  | "state"
  | "imageUrl"
  | "rating"
  | "feesMin"
  | "feesMax"
  | "placementPercent"
  | "type"
>;

export type CollegeDetail = College & {
  courses: Course[];
  reviews: (Review & { user: Pick<User, "id" | "name" | "image"> })[];
  _count: {
    discussions: number;
    reviews: number;
  };
};

export type DiscussionWithMeta = Discussion & {
  user: Pick<User, "id" | "name" | "image">;
  college: Pick<College, "id" | "name" | "slug"> | null;
  _count: { comments: number };
};

export type CommentNode = Comment & {
  user: Pick<User, "id" | "name" | "image">;
  replies: CommentNode[];
};

export type Paginated<T> = {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PredictorResult = {
  collegeId: string;
  name: string;
  slug: string;
  state: string;
  city: string;
  matchScore: number;
  probability: "High" | "Medium" | "Reach";
  reason: string;
};
