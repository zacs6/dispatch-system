import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type Report = {
  title: string;
  content: string;
  location: string;
  statements: {
    name: string;
    message: string;
  }[];
  attached_units: number[];
};

export default function ReportTab(id: number) {
  const [report, setReport] = useState<{ id: number; data: Report }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");

  async function loadReport(id: number) {
    const { data: reportData, error } = await supabase
      .from("reports")
      .select("id, data")
      .eq("id", id);

    if (error) {
      console.error("Error getting report:", error.message);
      return;
    }

    if (reportData) {
      setReport(reportData);
    } else {
      setReport([]);
    }
  }

  async function saveReport(id: number, title: string, content: string, location: string) {
    console.log(id, title, content, location);
  }

  useEffect(() => {
    loadReport(1);
  }, []);

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="flex flex-col h-full w-full p-5 gap-3">
        <div className="flex flex-row gap-3 h-full">
          <div className="flex flex-col gap-3 w-full h-full">
            <Button
              onClick={() => saveReport(id, title, content, location)}
              className="bg-green-700 w-[4vw]"
            >
              Save
            </Button>
            <Input
              id="report-title"
              className="bg-[#0C1622] border-[#314E67] h-[7vh]"
              value={report[0]?.data.title || ""}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              id="report-content"
              className="resize-none bg-[#0C1622] border-[#314E67] h-full"
              value={report[0]?.data.content || ""}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-[30%] p-3 gap-3 h-full bg-[#0C1622] border border-[#314E67] rounded-md">
            <div className="mb-3">
              <Label htmlFor="report-location">Location</Label>
              <Input
                id="report-location"
                className="bg-[#0C1622] border-[#314E67] mt-3"
                value={report[0]?.data.location || ""}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="attached-units">Attached Units</Label>
              <div id="attached-units" className="flex flex-row gap-1">
                {report[0]?.data.attached_units?.map((unit) => (
                  <Badge key={unit} variant="secondary" className="bg-[#0B63AF] text-white">
                    {unit || "TBD"}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
