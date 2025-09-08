import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { loadUserProfile } from "../lib/profile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const profileData = await loadUserProfile(user.id);

      if (profileData) {
        setFirstName(profileData.first_name || "");
        setLastName(profileData.last_name || "");
      }
    }

    fetchProfile();
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error?.message);
    } else {
      navigate("/auth");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-[50px] w-[50px] rounded-full bg-[#0F1B2A] border border-[#314E67] cursor-pointer text-center content-center">
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#0F1B2A] border-[#314E67] text-white mr-5"
        align="start"
      >
        <DropdownMenuItem className="cursor-pointer focus:bg-[#264263] focus:text-white transition duration-300 ease-in-out">
          Your Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-[#264263] focus:text-white transition duration-300 ease-in-out">
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-[#314E67]" />
        <DropdownMenuItem
          className="cursor-pointer focus:bg-[#264263] focus:text-white transition duration-300 ease-in-out"
          onClick={() => handleLogout()}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
