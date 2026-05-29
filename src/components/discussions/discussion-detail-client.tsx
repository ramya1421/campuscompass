"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import { ThumbsUp } from "lucide-react";
import type { CommentNode } from "@/types";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type DiscussionPayload = {
  id: string;
  title: string;
  content: string;
  category: string;
  likesCount: number;
  createdAt: string;
  user: { id: string; name: string | null; image: string | null; bio?: string | null };
  college: { id: string; name: string; slug: string } | null;
  comments: CommentNode[];
};

function CommentTree({
  comments,
  onReply,
}: {
  comments: CommentNode[];
  onReply: (parentId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
          <div className="mb-2 flex items-center gap-2">
            <Avatar name={comment.user.name} />
            <div>
              <p className="text-sm font-medium">{comment.user.name}</p>
              <p className="text-xs text-slate-500">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => onReply(comment.id)}
          >
            Reply
          </Button>
          {comment.replies.length ? (
            <div className="mt-4 border-l border-slate-200 pl-4 dark:border-slate-700">
              <CommentTree comments={comment.replies} onReply={onReply} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function DiscussionDetailClient({
  initial,
}: {
  initial: DiscussionPayload;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [discussion, setDiscussion] = useState(initial);
  const [content, setContent] = useState("");
  const [parentId, setParentId] = useState<string | undefined>();

  async function submitComment() {
    if (!session?.user) {
      toast.error("Login required");
      router.push("/login");
      return;
    }
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await apiClient.post(`/discussions/${discussion.id}/comments`, {
        content,
        parentId,
      });
      toast.success("Comment posted");
      router.refresh();
      setContent("");
      setParentId(undefined);
    } catch {
      toast.error("Failed to post comment");
    }
  }

  async function likeDiscussion() {
    if (!session?.user) {
      toast.error("Login required");
      return;
    }
    try {
      const response = await apiClient.post<ApiResponse<{ liked: boolean }>>(
        `/discussions/${discussion.id}/like`,
      );
      const liked = response.data.data?.liked;
      setDiscussion((prev) => ({
        ...prev,
        likesCount: prev.likesCount + (liked ? 1 : -1),
      }));
    } catch {
      toast.error("Could not like discussion");
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{discussion.title}</CardTitle>
          <p className="text-sm text-slate-500">
            by {discussion.user.name} • {discussion.category}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">{discussion.content}</p>
          <Button variant="outline" onClick={likeDiscussion}>
            <ThumbsUp className="h-4 w-4" />
            {discussion.likesCount} likes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add a comment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {parentId ? (
            <p className="text-xs text-blue-600">Replying to a comment</p>
          ) : null}
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Share your thoughts..."
          />
          <Button onClick={submitComment}>Post comment</Button>
        </CardContent>
      </Card>

      <CommentTree
        comments={discussion.comments}
        onReply={(id) => setParentId(id)}
      />
    </div>
  );
}
