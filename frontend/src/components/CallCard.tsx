import { Badge } from "@/components/ui/badge";

type CallType = {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function CallCard({
  id,
  title,
  description,
  status,
  created_at,
  updated_at,
}: CallType) {
  return (
    <div
      className="flex justify-between bg-[#0F1B2A] border border-[#314E67] p-3 rounded-md"
      key={id}
    >
      <div className="flex flex-col gap-2">
        <span>{title}</span>
        <span className="text-[#6B96BC]">Red Ave / Blue St</span>
      </div>
      <div className="flex flex-col gap-2 items-end">
        <Badge variant="secondary" className="bg-[#0BAF7B] text-white">
          10-10
        </Badge>
        <div className="flex flex-row gap-1">
          <Badge variant="secondary" className="bg-[#0B63AF] text-white">
            TBD
          </Badge>
          <Badge variant="secondary" className="bg-[#0B63AF] text-white">
            864
          </Badge>
        </div>
      </div>
    </div>
  );
}
