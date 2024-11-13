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
    let hasError = false;

    // Clear previous errors
    setTextNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Input validation for text name
    if (/\s/.test(textName)) {
      setTextNameError("Text name should not contain spaces.");
      hasError = true;
    }

    // Input validation for password
    if (password.length < 1) {
      setPasswordError("Password must be at least 1 character long.");
      hasError = true;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;
    else {
      console.log("Hello");
      const res = await addTextFile(text, textName, password);
      if (res.success) {
        console.log("Text saved sucessfuly");
        router.push("/");
      } else {
        console.log(res.message);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-50">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        Drop the text here
      </h1>
      <div className="w-3/4 mb-4">
        <AutosizeTextarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the text you wanna store"
          className="w-full min-h-[150px] border border-gray-300 p-3 text-base rounded-md shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-4">
            Save Text
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Text</DialogTitle>
            <DialogDescription>
              Saving your text, which can be retrieved later. Ensure the text
              name has no spaces and the password is at least 1 character long.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
    </div>
  );
};

export default Page;
