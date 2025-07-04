import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

import UnitCard from "@/components/UnitCard";
import CallCard from "@/components/CallCard";

type UnitType = {
  id: string;
  callsign: string;
  role: string;
  first_name: string;
  last_name: string;
  status: string;
};

type CallType = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function DashboardTab() {
  const [units, setUnits] = useState<UnitType[]>([]);
  const [calls, setCalls] = useState<CallType[]>([]);

  useEffect(() => {
    async function getUnits() {
      const { data: units, error } = await supabase.from("profiles").select();
      if (error) {
        console.error("Failed to fetch units", error);
        return;
      }
      setUnits(units);
    }

    getUnits();
  }, []);

  useEffect(() => {
    async function getCalls() {
      const { data: calls, error } = await supabase.from("calls").select();
      if (error) {
        console.error("Failed to fetch calls", error);
        return;
      }
      setCalls(calls);
    }

    getCalls();
  }, []);

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="bg-[#0C1622] flex flex-col gap-2.5 ml-2 h-[96%] w-[26%] p-3 border border-[#314E67] rounded-md">
        All Units
        <div>
          {units.map((unit) => (
            <UnitCard key={unit.id} {...unit} />
          ))}
        </div>
      </div>
      <div className="bg-[#0C1622] flex flex-col gap-2.5 h-[96%] w-[26%] p-3 border border-[#314E67] rounded-md">
        Recent Calls
        <div>
          {calls.map((call) => (
            <CallCard key={call.id} {...call} />
          ))}
        </div>
      </div>
      <div className="bg-[#0C1622] flex flex-col gap-2.5 mr-2 h-[96%] w-[45%] p-3 border border-[#314E67] rounded-md">
        Call Management
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">
            <h1>Call Type</h1>
            <input type="text" className="bg-[#0F1B2A] border border-[#314E67] p-1 rounded-md" />
          </div>
          <div className="flex flex-col">
            <h1>Address</h1>
            <input type="text" className="bg-[#0F1B2A] border border-[#314E67] p-1 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
