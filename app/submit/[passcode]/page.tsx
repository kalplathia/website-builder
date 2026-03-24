"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Status = "loading" | "valid" | "invalid" | "used" | "submitting" | "success";

const industries = [
  "Technology",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Food & Beverage",
  "Real Estate",
  "Legal",
  "Marketing",
  "Construction",
  "Consulting",
  "Other",
];

export default function SubmitPage() {
  const { passcode } = useParams<{ passcode: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [clientName, setClientName] = useState("");

  // Form state
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function validate() {
      try {
        const res = await fetch(
          `/api/invites/validate?passcode=${passcode}`
        );
        const data = await res.json();

        if (data.valid) {
          setStatus("valid");
          setClientName(data.clientName);
          setEmail(data.clientEmail);
        } else if (res.status === 410) {
          setStatus("used");
          setErrorMsg(data.error);
        } else {
          setStatus("invalid");
          setErrorMsg(data.error);
        }
      } catch {
        setStatus("invalid");
        setErrorMsg("Failed to validate invite");
      }
    }

    validate();
  }, [passcode]);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!businessName) return;

    setStatus("submitting");

    try {
      // Upload logo first if present
      let logoUrl = "";
      if (logoFile) {
        const formData = new FormData();
        formData.append("logo", logoFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          logoUrl = uploadData.url;
        }
      }

      // Submit site data
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          businessName,
          description,
          industry,
          email,
          phone,
          address,
          logo: logoUrl,
          template: "starter",
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Submission failed");
        setStatus("valid");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("valid");
    }
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin text-3xl mb-3">&#9696;</div>
          <p className="text-sm text-muted-foreground">
            Validating your invite...
          </p>
        </div>
      </div>
    );
  }

  // Invalid or used
  if (status === "invalid" || status === "used") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">
            {status === "used" ? "\u2713" : "\u2717"}
          </div>
          <h1 className="text-xl font-bold mb-2">
            {status === "used"
              ? "Invite Already Used"
              : "Invalid Invite"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {errorMsg ||
              "This invite link is not valid. Please contact the person who shared it with you."}
          </p>
        </div>
      </div>
    );
  }

  // Success
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl mx-auto mb-6">
            &#10003;
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Submission Received!
          </h1>
          <p className="text-muted-foreground">
            Thank you, <span className="font-medium">{clientName}</span>. Your
            website for <span className="font-semibold">{businessName}</span>{" "}
            is being set up. We&apos;ll be in touch once it&apos;s ready.
          </p>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Website Builder</h1>
          <p className="text-muted-foreground mt-1">
            Welcome, {clientName}. Tell us about your business.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errorMsg}
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Logo Upload */}
              <div>
                <Label>Business Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center transition-colors overflow-hidden",
                      logoPreview
                        ? "border-primary"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl text-gray-300">+</span>
                    )}
                  </button>
                  <div className="text-sm text-muted-foreground">
                    <p>Click to upload your logo</p>
                    <p className="text-xs">PNG, JPG, WebP, or SVG. Max 5MB.</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div>
                <Label htmlFor="businessName">
                  Business Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Acme Corporation"
                  required
                  className="mt-1.5"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us what your business does, your key services, and what makes you unique..."
                  rows={4}
                  className="mt-1.5 resize-none"
                />
              </div>

              {/* Industry & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Industry</Label>
                  <Select value={industry} onValueChange={(v) => setIndustry(v ?? "")}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@business.com"
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Phone & Address row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State"
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={status === "submitting" || !businessName}
              >
                {status === "submitting" ? (
                  <>
                    <span className="animate-spin mr-2">&#9696;</span>
                    Submitting...
                  </>
                ) : (
                  "Submit My Business Details"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your information will be used to generate your website.
        </p>
      </div>
    </div>
  );
}
