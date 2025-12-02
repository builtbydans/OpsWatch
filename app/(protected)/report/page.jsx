"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, Camera } from "lucide-react";

export default function ReportPage() {
  const supabase = createClient();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (!error) {
      setIncidents(data);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!title || !description || !category || !reporterEmail) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from("incidents")
      .insert({
        title,
        description,
        category,
        location,
        reporter_name: reporterName,
        reporter_email: reporterEmail,
        status: "open",
      })
      .select();

    if (error) {
      console.error("Error creating incident:", error);
      alert("Failed to submit report. Please try again.");
    } else {
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setReporterName("");
      setReporterEmail("");

      // Refresh incidents list
      fetchIncidents();
      alert("Incident reported successfully!");
    }

    setSubmitting(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4" />;
      case "in_progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "in_progress":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      safety: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      maintenance: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      quality: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      equipment: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      other: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Report Incident</h1>
          <p className="text-gray-400 mt-1">
            Submit a new incident report and track existing ones
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Report Form */}
          <Card className="bg-[#1a1a1a]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                New Report
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below to report an incident
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the incident"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-[#0a0a0a]  focus:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="bg-[#0a0a0a] ">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a1a] ">
                      <SelectItem value="safety">Safety Issue</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="quality">Quality Control</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Where did this occur?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-[#0a0a0a]  focus:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the incident"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-[#0a0a0a]  focus:border-gray-600 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporterName">Your Name</Label>
                  <Input
                    id="reporterName"
                    placeholder="John Doe"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="bg-[#0a0a0a]  focus:border-gray-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reporterEmail">Your Email *</Label>
                  <Input
                    id="reporterEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={reporterEmail}
                    onChange={(e) => setReporterEmail(e.target.value)}
                    className="bg-[#0a0a0a]  focus:border-gray-600"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="bg-[#1a1a1a] ">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription className="text-gray-400">
                Latest reports from your organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-400">
                  Loading incidents...
                </div>
              ) : incidents.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  No incidents reported yet. Submit the first one!
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="p-4 bg-[#0a0a0a] border  rounded-lg hover: transition-colors"
                    >
                      {incident.reporter_email && (
                        <span className="text-sm text-gray-400 line-clamspan-2 mb-2">
                          Reported by: {incident?.reporter_name} (
                          {incident.reporter_email})
                        </span>
                      )}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {incident.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            incident.status
                          )} flex items-center gap-1 shrink-0`}
                        >
                          {getStatusIcon(incident.status)}
                          <span className="capitalize text-xs">
                            {incident.status?.replace("_", " ")}
                          </span>
                        </Badge>
                      </div>

                      {incident.category && (
                        <Badge
                          variant="outline"
                          className={`${getCategoryColor(
                            incident.category
                          )} mb-2 text-xs`}
                        >
                          {incident.category}
                        </Badge>
                      )}

                      {incident.description && (
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {incident.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        {incident.location && (
                          <span>📍 {incident.location}</span>
                        )}
                        <span>
                          {new Date(incident.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
