import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, ThumbsUp } from "lucide-react";
import type { DiscussionWithMeta } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export function DiscussionCard({ discussion }: { discussion: DiscussionWithMeta }) {
  return (
    <Card className="transition hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={discussion.user.name} />
            <div>
              <p className="text-sm font-medium">{discussion.user.name}</p>
              <p className="text-xs text-slate-500">
                {formatDistanceToNow(new Date(discussion.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <Badge variant="secondary">{discussion.category}</Badge>
        </div>
        <CardTitle className="text-lg">
          <Link href={`/discussions/${discussion.id}`} className="hover:text-blue-600">
            {discussion.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
          {discussion.content}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" /> {discussion.likesCount}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> {discussion._count.comments}
          </span>
          {discussion.college ? (
            <span className="truncate">@ {discussion.college.name}</span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
