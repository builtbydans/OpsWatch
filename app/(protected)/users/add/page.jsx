"use client";

import { useState, useEffect } from "react";
import { addDriver } from "./actions";
import { createClient } from "@/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
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
    <div className="container mx-auto px-6 py-10">
      <div className="p-6 w-3xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <MoveLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl mb-4">Add New User</h1>

        <div className="flex gap-2">
          <Button
            variant={userType === "Driver" ? "default" : "outline"}
            onClick={() => setUserType("Driver")}
          >
            Add Driver
          </Button>

          <Button
            variant={userType === "Client" ? "default" : "outline"}
            onClick={() => setUserType("Client")}
          >
            Add Client
          </Button>
        </div>

        {/* Server Action is directly passed to form */}
        <Card className="bg-neutral-900 p-6 w-full max-w-2xl mt-5 rounded-2xl">
          <form
            action={async (formData) => {
              await addDriver(formData);

              setFirstName("");
              setLastName("");
              setBaseId("");
              setSelectedBase(null);
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
        </Card>
      </div>

      <Card className="bg-neutral-900 p-6 mt-8 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Current Drivers</h2>

        {drivers.length === 0 ? (
          <p className="text-gray-400">No drivers yet.</p>
        ) : (
          <ul className="space-y-1 text-gray-200">
            {drivers.map((d) => (
              <li key={d.id}>
                {d.first_name} {d.last_name}
                {" — "}
                {bases.find((b) => b.id === d.base_id)?.name ?? "Unknown Base"}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default Add;
