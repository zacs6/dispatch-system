import { useEffect } from "react";
import supabase from "../../utils/supabase";

export default function DashboardPage() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        window.location.href = "/login";
      }
    });
  });

  return <div>Dashboard Placeholder</div>;
}
