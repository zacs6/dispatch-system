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

type Unit = {
  id: number;
  first_name: string;
  last_name: string;
  callsign: string;
  department: string;
};

type EditUnitSheetProps = {
  unit: Unit;
  updateUnit: (
    id: number,
    firstName: string,
    lastName: string,
    callsign: string,
    department: string
  ) => void;
};

function EditUnitSheet({ unit, updateUnit }: EditUnitSheetProps) {
  const [firstName, setFirstName] = useState(unit.first_name);
  const [lastName, setLastName] = useState(unit.last_name);
  const [callsign, setCallsign] = useState(unit.callsign);
  const [department, setDepartment] = useState(unit.department);
  const [departments, setDepartments] = useState<{ short_code: string; type: string }[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    if (sheetOpen && departments.length === 0) {
      async function fetchDepartments() {
        const { data, error } = await supabase.from("departments").select("short_code, type");
        if (!error && data) setDepartments(data);
      }
      fetchDepartments();
    }
  }, [sheetOpen, departments.length]);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <TableRow className="hover:bg-[#182B42] cursor-pointer border-[#314E67]">
          <TableCell>{unit.first_name}</TableCell>
          <TableCell>{unit.last_name}</TableCell>
          <TableCell>{unit.callsign}</TableCell>
          <TableCell>
            <div
              className={`w-min pt-1.5 pb-1.5 pl-2 pr-2 text-center content-center rounded-md border text-white
                ${
                  unit.department === "JMUPD" ||
                  unit.department === "HPD" ||
                  unit.department === "RCSO"
                    ? "bg-[#1A4374] border-[#2670AF]"
                    : ""
                }
                ${
                  unit.department === "RCFR" || unit.department === "HFD"
                    ? "bg-[#741a1a] border-[#af2626]"
                    : ""
                }
                ${unit.department === "HRECC" ? "bg-[#1a744f] border-[#32b027]" : ""}
              `}
            >
              {unit.department}
            </div>
          </TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent className="bg-[#0C1622] text-white border-[#314E67]">
        <SheetHeader>
          <SheetTitle className="text-white">Edit department</SheetTitle>
          <SheetDescription className="text-[#d9d9d9]">
            Make changes to{" "}
            <span className="font-medium">
              {unit.first_name} {unit.last_name}
            </span>{" "}
            here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              className="bg-[#0F1B2A] border-[#314E67]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              className="bg-[#0F1B2A] border-[#314E67]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="callsign">Callsign</Label>
            <Input
              id="callsign"
              className="bg-[#0F1B2A] border-[#314E67]"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full bg-[#0F1B2A] border-[#314E67]">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent id="department">
                <SelectGroup>
                  <SelectLabel>Departments</SelectLabel>
                  {departments.map((dept) => (
                    <SelectItem key={dept.short_code} value={dept.short_code}>
                      {dept.short_code} ({dept.type.charAt(0).toUpperCase() + dept.type.slice(1)})
                    </SelectItem>
                  ))}
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
              onClick={() => updateUnit(unit.id, firstName, lastName, callsign, department)}
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

export default function UnitsTab() {
  const [units, setUnits] = useState<
    { id: number; first_name: string; last_name: string; callsign: string; department: string }[]
  >([]);

  async function loadUnits() {
    const { data: unitsData, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, callsign, department")
      .order("department", { ascending: false })
      .order("callsign", { ascending: false });

    if (error) {
      console.error("Error getting units:", error.message);
      return;
    }

    if (unitsData) {
      setUnits(unitsData);
    } else {
      setUnits([]);
    }
  }

  useEffect(() => {
    loadUnits();
  }, []);

  function refreshUnits() {
    loadUnits();
    toast("Refreshed!");
  }

  async function updateUnit(
    id: number,
    firstName: string,
    lastName: string,
    callsign: string,
    department: string
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: firstName,
        last_name: lastName,
        callsign: callsign,
        department: department,
      })
      .eq("id", id);

    if (error) {
      toast(`Error updating unit: ${error.message}`);
    }

    toast("Changes saved!");
    loadUnits();
  }

  return (
    <div className="flex flex-row justify-around items-center h-[calc(100vh-6.25rem)]">
      <div className="flex flex-col h-full w-full p-5 gap-3">
        <div className="flex flex-row justify-between">
          <span className="font-bold select-none">Units</span>
          <div className="flex flex-row gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="self-center bg-[#0F1B2A] hover:bg-[#182B42] cursor-pointer border rounded-md border-[#314E67]"
              onClick={refreshUnits}
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
                  <TableHead className="text-white">First Name</TableHead>
                  <TableHead className="text-white">Last Name</TableHead>
                  <TableHead className="text-white">Callsign</TableHead>
                  <TableHead className="text-white">Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.length > 0 ? (
                  units.map((unit) => (
                    <EditUnitSheet key={unit.id} unit={unit} updateUnit={updateUnit} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-400">
                      No units found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="border-[#314E67]">
                <TableRow>
                  <TableCell colSpan={3} className="bg-[#0C1622] select-none">
                    Total: {units.length} unit
                    {units.length !== 1 && "s"}
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
