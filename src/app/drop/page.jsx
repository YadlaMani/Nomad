"use client";
import React, { useState } from "react";
import { AutosizeTextarea } from "@/components/ui/resizeTextArea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTextFile } from "@/actions";
import { useRouter } from "next/navigation";
import RetroGrid from "@/components/ui/retro-grid";
import { toast } from "react-toastify"; // Import toast from react-toastify

const Page = () => {
  const router = useRouter();
  const [text, setText] = useState("");
  const [textName, setTextName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [textNameError, setTextNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  async function handleSave() {
    toast("Saving text..."); // Show toast when the button is clicked
    let hasError = false;

    // Clear previous errors
    setTextNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Input validation for text name
    if (/\s/.test(textName)) {
      setTextNameError("Text name should not contain spaces.");
      toast.error("Text name should not contain spaces."); // Show error toast
      hasError = true;
    }

    // Input validation for password
    if (password.length < 1) {
      setPasswordError("Password must be at least 1 character long.");
      toast.error("Password must be at least 1 character long."); // Show error toast
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      toast.error("Passwords do not match."); // Show error toast
      hasError = true;
    }

    if (hasError) return;

    // Handle saving text
    const res = await addTextFile(text, textName, password);
    if (res.success) {
      toast.success("Text saved successfully!"); // Show success toast
      router.push("/"); // Redirect to the homepage
    } else {
      toast.error(res.message); // Show error toast if saving fails
    }
  }

  return (
    <div className="flex flex-col items-center justify-start h-full p-6 bg-gray-50 w-full max-w-4xl mx-auto">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-800">
        Drop the text here
      </h1>

      {/* Save Text Button placed at the top */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-6 w-full sm:w-auto">
            Save Text
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Text</DialogTitle>
            <DialogDescription>
              Save your text here to retrieve later. Ensure the text name has no
              spaces and the password is at least 1 character long.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Text Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  value={textName}
                  onChange={(e) => setTextName(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter text name"
                />
                {textNameError && (
                  <p className="text-red-500 text-xs mt-1">{textNameError}</p>
                )}
              </div>
            </div>

            {/* Password input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <div className="col-span-3">
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="text-sm text-blue-500"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
                {passwordError && (
                  <p className="text-red-500 text-xs mt-1">{passwordError}</p>
                )}
              </div>
            </div>

            {/* Confirm Password input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Confirm Password
              </Label>
              <div className="col-span-3">
                <Input
                  id="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="text-sm text-blue-500"
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </button>
                {confirmPasswordError && (
                  <p className="text-red-500 text-xs mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save Text
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Text Area takes remaining space */}
      <div className="flex-grow w-full mb-6">
        <AutosizeTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text you want to store"
          className="w-full min-h-[150px] border border-gray-300 p-3 text-base rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <RetroGrid />
    </div>
  );
};

export default Page;
