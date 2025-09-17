import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../utils/supabase";
import { loadUserProfile } from "@/lib/profile";

import { Navbar } from "@/components/Navbar";
import TabsBar from "@/components/TabsBar";
import UserMenu from "@/components/UserMenu";
import TabRenderer from "./TabRenderer";
import logo from "../assets/DispatchSystemLogo.svg";

export default function AppLayout() {
  const [department, setDepartment] = useState("DS");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/auth");
      } else {
        setLoading(false);
      }
    });

    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const profileData = await loadUserProfile(user.id);

      if (profileData) {
        setDepartment(profileData.department || "DS");
      }
    }

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-muted" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row bg-[#0C1622] text-white h-25 w-full border-b border-[#314E67]">
        <div className="flex flex-row">
          <div className="flex flex-row w-[273px] select-none">
            <img src={logo} alt="Logo" className="h-[65%] w-[65%] self-center" />
            <div className="flex flex-col w-60 ml-[-20px] self-center">
              <h1 className="text-[#0B63AF] text-[17px] font-bold">Dispatch System</h1>
              <h1 className="text-[#6B96BC]">{department}</h1>
            </div>
          </div>
          <TabsBar />
        </div>
        <div className="ml-auto self-center mr-5">
          <UserMenu />
        </div>
      </div>
      <div className="flex flex-row h-[calc(100vh-6.25rem)]">
        <div className="bg-[#0C1622] text-white h-full w-80 border-r border-[#314E67] flex flex-col justify-between">
          <Navbar />
        </div>
        <div className="bg-[#0F1B2A] text-white h-full w-full">
          <TabRenderer />
        </div>
      </div>
    </div>
  );
}
