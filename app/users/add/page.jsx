"use client";

import { useState, useEffect } from "react";
import { addDriver } from "./actions";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const Add = () => {
  const [userType, setUserType] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const isDriver = userType === "Driver";
  const [bases, setBases] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [baseId, setBaseId] = useState("");
  const [selectedBase, setSelectedBase] = useState("");

  useEffect(() => {
    const fetchBases = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("bases").select("*").order("name");

      setBases(data ?? []);
    };

    fetchBases();
  }, []);

  const [reloadDrivers, setReloadDrivers] = useState(0);

  useEffect(() => {
    const fetchDrivers = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("drivers")
        .select("*")
        .order("first_name");
      setDrivers(data ?? []);
    };

    fetchDrivers();
  }, [reloadDrivers]);

  return (
    <div className="m-5">
      <div className="p-6 w-3xl bg-neutral-900 rounded-2xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl mb-4">Add New User</h1>

        <Button className="mr-3" onClick={() => setUserType("Client")}>
          Add New Client
        </Button>
        <Button onClick={() => setUserType("Driver")}>Add New Driver</Button>

        {/* Server Action is directly passed to form */}
        <form
          className="space-y-4"
          action={async (formData) => {
            await addDriver(formData);
            setReloadDrivers((prev) => prev + 1);
          }}
        >
          <Input
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="hidden"
            name="role"
            value={isDriver ? "DRIVER" : "CLIENT"}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Select
            value={baseId}
            onValueChange={(id) => {
              setBaseId(id);
              setSelectedBase(bases.find((b) => b.id === id));
            }}
            name="base_id"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select depot" />
            </SelectTrigger>

            <SelectContent>
              {bases.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedBase && (
            <>
              <Input disabled value={selectedBase.business_phone} />
              <Input disabled value={selectedBase.address} />
              <Input disabled value={selectedBase.postcode} />
            </>
          )}

          <input type="hidden" name="first_name" value={firstName} />
          <input type="hidden" name="last_name" value={lastName} />
          <input type="hidden" name="base_id" value={baseId} />

          <Button type="submit">
            {isDriver ? "Create New Driver" : "Create New Client"}
          </Button>
        </form>
      </div>
      <div>
        <h1>List of Drivers</h1>

        {drivers.map((driver) => {
          const base = bases.find((b) => b.id === driver.base_id);

          return (
            <p key={driver.id}>
              {driver.first_name} {driver.last_name} —{" "}
              {base?.name || "Unknown Base"}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Add;
