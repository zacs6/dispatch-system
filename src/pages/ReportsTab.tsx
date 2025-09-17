import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

export default function ReportsTab() {
  const [reports, setReports] = useState<{ id: number; data: Report }[]>([]);

  async function loadReports() {
    const { data: reportsData, error } = await supabase
      .from("reports")
      .select("id, data")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error getting reports:", error.message);
      return;
    }

    if (reportsData) {
      setReports(reportsData);
    } else {
      setReports([]);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  function refreshReports() {
    loadReports();
    toast("Refreshed!");
  }

  function openReport(id: number) {
    console.log(`Report ${id} opened!`);
  }

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="flex flex-col h-full w-full p-5 gap-3">
        <div className="flex flex-row justify-between">
          <span className="font-bold select-none">Reports</span>
          <div className="flex flex-row gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="self-center bg-[#0F1B2A] hover:bg-[#182B42] cursor-pointer border rounded-md border-[#314E67]"
              onClick={refreshReports}
            >
              <RefreshCw color="white" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-[#0C1622] overflow-hidden w-full h-full rounded-md border border-[#314E67]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#0C1622] border-[#314E67] select-none">
                  <TableHead className="text-white">Title</TableHead>
                  <TableHead className="text-white">Units</TableHead>
                  <TableHead className="text-white">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <TableRow
                      key={report.id}
                      onClick={() => openReport(report.id)}
                      className="hover:bg-[#182B42] cursor-pointer border-[#314E67]"
                    >
                      <TableCell>{report.data.title}</TableCell>
                      <TableCell>
                        <div className="flex flex-row gap-1">
                          {report.data.attached_units.map((unit) => (
                            <Badge
                              key={unit}
                              variant="secondary"
                              className="bg-[#0B63AF] text-white"
                            >
                              {unit || "TBD"}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{report.data.location}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-400">
                      No reports found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="border-[#314E67]">
                <TableRow>
                  <TableCell colSpan={3} className="bg-[#0C1622] select-none">
                    Total: {reports.length} report
                    {reports.length !== 1 && "s"}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
