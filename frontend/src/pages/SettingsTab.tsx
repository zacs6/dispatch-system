import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsTab() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [callsign, setCallsign] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    async function loadUserProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user session:", userError.message);
        return;
      }

      if (!user) {
        console.log("No user session found");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("first_name, last_name, department, callsign")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Error fetching user profile:", profileError.message);
        return;
      }

      if (profileData) {
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
        setDepartment(profileData.department || "");
        setCallsign(profileData.callsign || "");
      } else {
        console.log("No profile found for this user");
        setFirstName("");
        setLastName("");
        setDepartment("");
        setCallsign("");
      }
    }

    loadUserProfile();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        department: department,
        callsign: callsign,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    }
  }

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="bg-[#0C1622] flex flex-col gap-2.5 ml-2 mr-2 h-[96%] w-[98%] p-3 border border-[#314E67] rounded-md">
        <span className="font-bold">Settings</span>
        <div className="flex flex-col w-[20%]">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              First Name
              <Input
                className="bg-[#0F1B2A] border border-[#314E67] p-1 mt-1 rounded-md"
                type="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.currentTarget.value)}
              />
            </div>
            <div>
              Last Name
              <Input
                className="bg-[#0F1B2A] border border-[#314E67] p-1 mt-1 rounded-md"
                type="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.currentTarget.value)}
              />
            </div>
            <div>
              Department
              <Input
                className="bg-[#0F1B2A] border border-[#314E67] p-1 mt-1 rounded-md"
                type="department"
                placeholder="DSPD"
                value={department}
                onChange={(e) => setDepartment(e.currentTarget.value)}
              />
            </div>
            <div>
              Callsign
              <Input
                className="bg-[#0F1B2A] border border-[#314E67] p-1 mt-1 rounded-md"
                type="callsign"
                placeholder="123"
                value={callsign}
                onChange={(e) => setCallsign(e.currentTarget.value)}
              />
            </div>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
