import { defineQuery } from "next-sanity";

export const ACTIVITIES_QUERY = defineQuery(`*[_type == 'activity']`);
