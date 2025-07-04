import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import supabase from "@/utils/supabase";

type CallType = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  attached_units: string[];
  address: string;
  call_code: string;
};

export default function CallCard({
  id,
  title,
  // description,
  // status,
  // created_at,
  // updated_at,
  attached_units,
  address,
  call_code,
}: CallType) {
  const [unitCallsigns, setUnitCallsigns] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchCallsigns() {
      if (!attached_units || attached_units.length === 0) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, callsign")
        .in("id", attached_units);

      if (error) {
        console.error("Error fetching callsigns:", error.message);
        return;
      }

      if (data) {
        const newCallsigns: Record<string, string> = {};
        data.forEach((profile) => {
          newCallsigns[profile.id] = profile.callsign;
        });
        setUnitCallsigns(newCallsigns);
      }
    }
    fetchCallsigns();
  }, [attached_units]);

  return (
    <div
      className="flex justify-between bg-[#0F1B2A] border border-[#314E67] p-3 rounded-md"
      key={id}
    >
      <div className="flex flex-col gap-2">
        <span>{title || "TBD"}</span>
        <span className="text-[#6B96BC]">{address || "TBD"}</span>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Badge variant="secondary" className="bg-[#0BAF7B] text-white">
          {call_code || "TBD"}
        </Badge>
        <div className="flex flex-row gap-1">
          {attached_units.map((unitUuid) => (
            <Badge key={unitUuid} variant="secondary" className="bg-[#0B63AF] text-white">
              {unitCallsigns[unitUuid] || "TBD"}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
