import { defineQuery } from "next-sanity";

export const SEARCH_SESSIONS_QUERY = defineQuery(`*[
    _type == "classSession"] {
    _id,
    startTime,
    maxCapacity,
    status,
    activity-> {
        _id,
        name,
        instructor,
        duration,
        tierLevel,
        images[] {
            asset-> {
                url
            }
        }
    },
    venue-> {
        _id,
        name,
        address {
            fullAddress
        }
    }
}`);
