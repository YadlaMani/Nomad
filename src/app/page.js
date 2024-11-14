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
import GradualSpacing from "@/components/ui/gradual-spacing";
import BlurIn from "@/components/ui/blur-in";
import RetroGrid from "@/components/ui/retro-grid";
import ShimmerButton from "@/components/ui/shimmer-button";

export default function Home() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <GradualSpacing
            className="font-display text-center text-4xl font-bold -tracking-widest text-black dark:text-white md:text-7xl md:leading-[5rem]"
            text="Drop Your Text, Retrieve It Anytime"
          />
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <BlurIn
            word="No accounts needed — just a name and password. Simple, secure, and nomadic."
            className="text-lg md:text-xl lg:text-2xl font-medium text-black dark:text-white leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <ShimmerButton
            className="shadow-2xl w-full sm:w-auto bg-red-600"
            onClick={handleDropText}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Drop Text
            </span>
          </ShimmerButton>

          <ShimmerButton
            className="shadow-2xl w-full sm:w-auto"
            onClick={handleRetrieve}
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Retrieve Text
            </span>
          </ShimmerButton>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Retrieve Text
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filename" className="text-sm font-medium">
                Filename
              </Label>
              <Input
                id="filename"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="Enter filename"
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
                required
              />
            </div>
            <DialogFooter className="sm:justify-start gap-2">
              <Button type="submit" className="w-full sm:w-auto">
                Retrieve
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Reset
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <RetroGrid />
    </div>
  );
}
