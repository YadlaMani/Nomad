"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchFileInfo } from "@/actions";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");
  const [theme, setTheme] = useState("light");

  function handleDropText() {
    router.push("/drop");
  }

  function handleRetrieve() {
    setIsDialogOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetchFileInfo(filename, password);

    if (res.success) {
      localStorage.setItem("fileData", res.text);

      router.push("/view");
    } else {
      console.log(res.message);
    }
  }

  function handleReset() {
    setFilename("");
    setPassword("");
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen space-y-4",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      )}
    >
      <Button onClick={handleDropText}>Drop Text</Button>
      <Button onClick={handleRetrieve}>Retrieve Text</Button>
      <Button onClick={toggleTheme}>
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Retrieve Text</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Enter filename"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <Button type="submit">Retrieve</Button>
              <Button type="button" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <img
        src="https://images.alphacoders.com/787/787043.jpg"
        alt="background"
      />
    </div>
  );
}
