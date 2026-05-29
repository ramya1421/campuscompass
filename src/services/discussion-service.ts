import { prisma } from "@/lib/prisma";
import type { CommentNode } from "@/types";

export async function listDiscussions(params: {
  q?: string;
  category?: string;
  collegeId?: string;
  page?: number;
  limit?: number;
}) {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const where = {
    ...(params.category ? { category: params.category as never } : {}),
    ...(params.collegeId ? { collegeId: params.collegeId } : {}),
    ...(params.q
      ? {
          OR: [
            { title: { contains: params.q, mode: "insensitive" as const } },
            { content: { contains: params.q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.discussion.findMany({
      where,
      orderBy: [{ likesCount: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: { select: { id: true, name: true, image: true } },
        college: { select: { id: true, name: true, slug: true } },
        _count: { select: { comments: true } },
      },
    }),
    prisma.discussion.count({ where }),
  ]);

  return { items, page, limit, total, totalPages: Math.ceil(total / limit) };
}

export function buildCommentTree(
  comments: Array<{
    id: string;
    discussionId: string;
    userId: string;
    parentId: string | null;
    content: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: Date;
    user: { id: string; name: string | null; image: string | null };
  }>,
): CommentNode[] {
  const map = new Map<string, CommentNode>();

  comments.forEach((comment) => {
    map.set(comment.id, { ...comment, replies: [] });
  });

  const roots: CommentNode[] = [];

  map.forEach((comment) => {
    if (comment.parentId) {
      const parent = map.get(comment.parentId);
      if (parent) parent.replies.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
}

export async function getDiscussionDetail(id: string) {
  const discussion = await prisma.discussion.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, image: true, bio: true } },
      college: { select: { id: true, name: true, slug: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });

  if (!discussion) return null;

  return {
    ...discussion,
    comments: buildCommentTree(discussion.comments),
  };
}
