import { Badge } from "@/components/ui/badge";

type UnitType = {
  id: string;
  callsign: string;
  role: string;
  first_name: string;
  last_name: string;
  status: string;
};

export default function UnitCard({ id, callsign, role, first_name, last_name, status }: UnitType) {
  return (
    <div
      className="flex justify-between bg-[#0F1B2A] border border-[#314E67] p-3 rounded-md"
      key={id}
    >
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="bg-[#0B63AF] text-white">
          {callsign} | DSPD
        </Badge>
        <span>
          {role} {last_name}
        </span>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <Badge variant="secondary" className="bg-[#0B63AF] text-white">
          {status}
        </Badge>
        <span className="text-[#6B96BC]">Blue Ave</span>
      </div>
    </div>
  );
}
