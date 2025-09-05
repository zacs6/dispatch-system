import supabase from "../utils/supabase";

export async function loadUserProfile(userId: string) {
  const { data: profileData, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, department, callsign")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    return null;
  }

  return profileData;
}
