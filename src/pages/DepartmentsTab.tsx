import React from "react";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Department = { id: number; label: string; short_code: string; type: string };

type EditDepartmentSheetProps = {
  dept: Department;
  updateDepartment: (id: number, label: string, shortCode: string, type: string) => void;
};

function EditDepartmentSheet({ dept, updateDepartment }: EditDepartmentSheetProps) {
  const [editLabel, setEditLabel] = React.useState(dept.label);
  const [editShortCode, setEditShortCode] = React.useState(dept.short_code);
  const [editType, setEditType] = React.useState(dept.type);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TableRow className="hover:bg-[#182B42] cursor-pointer border-[#314E67]">
          <TableCell>{dept.label}</TableCell>
          <TableCell>{dept.short_code}</TableCell>
          <TableCell>
            <div
              className={`w-min pt-1.5 pb-1.5 pl-2 pr-2 text-center content-center rounded-md border text-white
                ${dept.type === "police" ? "bg-[#1A4374] border-[#2670AF]" : ""}
                ${dept.type === "fire" ? "bg-[#741a1a] border-[#af2626]" : ""}
                ${dept.type === "dispatch" ? "bg-[#1a744f] border-[#32b027]" : ""}
              `}
            >
              {dept.type.charAt(0).toUpperCase() + dept.type.slice(1)}
            </div>
          </TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent className="bg-[#0C1622] text-white border-[#314E67]">
        <SheetHeader>
          <SheetTitle className="text-white">Edit department</SheetTitle>
          <SheetDescription className="text-[#d9d9d9]">
            Make changes to <span className="font-medium">{dept.label}</span> here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="dept-label">Label</Label>
            <Input
              id="dept-label"
              className="bg-[#0F1B2A] border-[#314E67]"
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="dept-code">Code</Label>
            <Input
              id="dept-code"
              className="bg-[#0F1B2A] border-[#314E67]"
              value={editShortCode}
              onChange={(e) => setEditShortCode(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="dept-type">Type</Label>
            <Select value={editType} onValueChange={setEditType}>
              <SelectTrigger className="w-full bg-[#0F1B2A] border-[#314E67]">
                <SelectValue placeholder="Select a department type" />
              </SelectTrigger>
              <SelectContent id="dept-type">
                <SelectGroup>
                  <SelectLabel>Department Types</SelectLabel>
                  <SelectItem value="police">Police</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="dispatch">Dispatch</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter className="flex flex-row">
          <SheetClose asChild>
            <Button
              className="cursor-pointer bg-[#0B63AF] hover:bg-[#084982] border-2 border-[#084982]"
              type="submit"
              onClick={() => updateDepartment(dept.id, editLabel, editShortCode, editType)}
            >
              Save
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="cursor-pointer bg-[#182B42] hover:bg-[#314E67] border-2 border-[#314E67] text-white hover:text-white"
              variant="outline"
            >
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function DepartmentsTab() {
  const [departments, setDepartments] = useState<
    { id: number; label: string; short_code: string; type: string }[]
  >([]);
  const [newLabel, setNewLabel] = useState("");
  const [newShortCode, setNewShortCode] = useState("");
  const [newType, setNewType] = useState("");

  async function loadDepartments() {
    const { data: departmentsData, error } = await supabase
      .from("departments")
      .select("id, label, short_code, type")
      .order("type", { ascending: false })
      .order("label", { ascending: false });

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

  useEffect(() => {
    loadDepartments();
  }, []);

  function refreshDepartments() {
    loadDepartments();
    toast("Refreshed!");
  }

  async function createDepartment(label: string, shortCode: string, type: string) {
    if (!label.trim() || !shortCode.trim() || !type.trim()) {
      toast("All fields are required to create a department.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase.from("departments").insert({
      label: label,
      short_code: shortCode,
      type: type,
    });

    if (error) {
      toast(`Error creating department: ${error.message}`);
    }

    toast("Department created!");
    loadDepartments();
  }

  async function updateDepartment(id: number, label: string, shortCode: string, type: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase
      .from("departments")
      .update({
        label: label,
        short_code: shortCode,
        type: type,
      })
      .eq("id", id);

    if (error) {
      toast(`Error updating department: ${error.message}`);
    }

    toast("Changes saved!");
    loadDepartments();
  }

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="flex flex-col h-full w-full p-5 gap-3">
        <div className="flex flex-row justify-between">
          <span className="font-bold select-none">Departments</span>
          <div className="flex flex-row gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="self-center bg-[#0F1B2A] hover:bg-[#182B42] cursor-pointer border rounded-md border-[#314E67]"
              onClick={refreshDepartments}
            >
              <RefreshCw color="white" />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-[#0F1B2A] hover:bg-[#182B42] cursor-pointer border rounded-md border-[#314E67]">
                  New Department
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-[#0C1622] text-white border-[#314E67]">
                <SheetHeader>
                  <SheetTitle className="text-white">Department Creation</SheetTitle>
                  <SheetDescription className="text-[#d9d9d9]">
                    Create a new department here.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="dept-label">Label</Label>
                    <Input
                      id="dept-label"
                      className="bg-[#0F1B2A] border-[#314E67]"
                      defaultValue=""
                      onChange={(e) => setNewLabel(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="dept-code">Code</Label>
                    <Input
                      id="dept-code"
                      className="bg-[#0F1B2A] border-[#314E67]"
                      defaultValue=""
                      onChange={(e) => setNewShortCode(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="dept-type">Type</Label>
                    <Select onValueChange={setNewType}>
                      <SelectTrigger className="w-full bg-[#0F1B2A] border-[#314E67]">
                        <SelectValue placeholder="Select a department type" />
                      </SelectTrigger>
                      <SelectContent id="dept-type">
                        <SelectGroup>
                          <SelectLabel>Department Types</SelectLabel>
                          <SelectItem value="police">Police</SelectItem>
                          <SelectItem value="fire">Fire</SelectItem>
                          <SelectItem value="dispatch">Dispatch</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter className="flex flex-row">
                  <SheetClose asChild>
                    <Button
                      className="cursor-pointer bg-[#0B63AF] hover:bg-[#084982] border-2 border-[#084982]"
                      type="submit"
                      onClick={() => createDepartment(newLabel, newShortCode, newType)}
                    >
                      Create
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="cursor-pointer bg-[#182B42] hover:bg-[#314E67] border-2 border-[#314E67] text-white hover:text-white"
                      variant="outline"
                    >
                      Close
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="bg-[#0C1622] overflow-hidden w-full h-full rounded-md border border-[#314E67]">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#0C1622] border-[#314E67] select-none">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Short Code</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <EditDepartmentSheet
                      key={dept.id}
                      dept={dept}
                      updateDepartment={updateDepartment}
                    />
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
                  <TableCell colSpan={3} className="bg-[#0C1622] select-none">
                    Total: {departments.length} department
                    {departments.length !== 1 && "s"}
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
