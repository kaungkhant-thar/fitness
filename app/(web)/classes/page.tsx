import { sanityFetch } from "@/sanity/lib/live";
import { ACTIVITIES_QUERY } from "@/sanity/lib/queries/activity";
import { SEARCH_SESSIONS_QUERY } from "@/sanity/lib/queries/session";
import SessionCard from "@/components/sessions/SessionCard";
import { ClassSession, SEARCH_SESSIONS_QUERYResult } from "@/sanity.types";

interface PageProps {
  searchParams: Promise<{
    q?: string;
    venue?: string;
    category?: string;
    tier?: string;
  }>;
}

export default async function ClassesPage({ searchParams }: PageProps) {
  const activities = await sanityFetch({
    query: ACTIVITIES_QUERY,
  });

  const sessions = await sanityFetch({
    query: SEARCH_SESSIONS_QUERY,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Classes</h1>

      {sessions.data.length === 0 ? (
        <p className="text-gray-600">No sessions available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.data.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
