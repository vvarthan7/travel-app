import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL environment variable is required but not set."
  );
}

if (!supabaseKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY environment variable is required but not set."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchUsersData = async (page, limit = 8) => {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await supabase
    .from("users")
    .select("*", { count: "exact" }) // Get the total count for pagination info
    .range(start, end); // Use the range method for pagination

  if (error) {
    throw new Error(error.message);
  }

  return { data, count };
};
