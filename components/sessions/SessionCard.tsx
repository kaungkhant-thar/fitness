import { SEARCH_SESSIONS_QUERYResult } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { User, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Session = SEARCH_SESSIONS_QUERYResult[number];

interface SessionCardProps {
  session: Session;
}

// Tier color mapping
const TIER_COLORS: Record<string, string> = {
  basic: "bg-slate-100 text-slate-700 dark:bg-slate-900/50 dark:text-slate-300",
  standard: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  premium: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  elite: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
};

export default function SessionCard({ session }: SessionCardProps) {
  const imageUrl = session.activity?.images?.[0]?.asset?.url;
  const sessionDate = session.startTime ? new Date(session.startTime) : null;
  const tierLevel = session.activity?.tierLevel || "basic";
  const isFullyBooked = session.maxCapacity
    ? (session.maxCapacity ?? 0) <= 0
    : false;
  const isCancelled = session.status === "cancelled";

  return (
    <Link href={`/classes/${session._id}`}>
      <Card
        className={`group gap-0 overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl`}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={session.activity?.name ?? "Class"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Tier Badge */}
          <Badge
            className={`absolute left-3 top-3 border-0 ${TIER_COLORS[tierLevel] || TIER_COLORS.basic}`}
          >
            {tierLevel.charAt(0).toUpperCase() + tierLevel.slice(1)}
          </Badge>

          {/* Status Badge */}
          {isCancelled ? (
            <Badge
              variant="destructive"
              className="absolute right-3 top-3 border-0"
            >
              Cancelled
            </Badge>
          ) : isFullyBooked ? (
            <Badge
              variant="destructive"
              className="absolute right-3 top-3 border-0"
            >
              Fully Booked
            </Badge>
          ) : session.maxCapacity && session.maxCapacity <= 5 ? (
            <Badge className="absolute right-3 top-3 border-0 bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300">
              {session.maxCapacity} spots left
            </Badge>
          ) : null}
        </div>

        {/* Content */}
        <CardContent className="p-4 !px-4">
          <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
            {session.activity?.name || "Unnamed Activity"}
          </h3>

          <div className="mt-2 space-y-1.5">
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span>{session.activity?.instructor || "TBA"}</span>
              {session.activity?.duration && (
                <>
                  <span className="mx-1">•</span>
                  <Clock className="h-3.5 w-3.5" />
                  <span>{session.activity.duration} min</span>
                </>
              )}
            </p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="truncate">
                {session.venue?.name || "Venue TBA"}
              </span>
            </p>
          </div>

          {/* Date/Time */}
          {sessionDate && (
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div className="text-sm font-semibold text-primary">
                {format(sessionDate, "EEE, MMM d")}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {format(sessionDate, "h:mm a")}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
