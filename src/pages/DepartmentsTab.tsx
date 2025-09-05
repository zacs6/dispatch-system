import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DepartmentsTab() {
  const [departments, setDepartments] = useState<
    { label: string; short_code: string; type: string }[]
  >([]);

  useEffect(() => {
    async function loadDepartments() {
      const { data: departmentsData, error } = await supabase
        .from("departments")
        .select("label, short_code, type");

      if (error) {
        console.error("Error getting departments:", error.message);
        return;
      }

      if (departmentsData) {
        setDepartments(departmentsData);
      } else {
        setDepartments([]);
      }
    }

    loadDepartments();
  }, []);

  const openNewDeptMenu = () => {
    console.log("new department menu opened!");
  };

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="flex flex-col h-full w-full p-5 gap-3">
        <div className="flex flex-row justify-between">
          <span className="font-bold">Departments</span>
          <Button
            onClick={() => openNewDeptMenu()}
            className="bg-[#0F1B2A] hover:bg-[#182B42] cursor-pointer border rounded-md border-[#314E67]"
          >
            New Department
          </Button>
        </div>

        <div className="flex flex-col items-center">
          <Table className="bg-[#0C1622] h-full w-full border border-[#314E67] rounded-md">
            <TableHeader>
              <TableRow className="hover:bg-[#0C1622] border-[#314E67]">
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Short Code</TableHead>
                <TableHead className="text-white">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.length > 0 ? (
                departments.map((dept, i) => (
                  <TableRow key={i} className="hover:bg-[#182B42] cursor-pointer">
                    <TableCell className="font-medium">{dept.label}</TableCell>
                    <TableCell>{dept.short_code}</TableCell>
                    <TableCell>{dept.type}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-400">
                    No departments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter className="border-[#314E67]">
              <TableRow>
                <TableCell colSpan={3} className="bg-[#0C1622]">
                  Total: {departments.length} department
                  {departments.length !== 1 && "s"}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
