"use client";
import React, { useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../fitebase";
import { useUser } from "@clerk/nextjs";
export function RenameModel() {
  const { user } = useUser();
  const [newFileName, setNewFileName] = useState("");
  const [isRenameModelOpen, setIsRenameModelOpen, fileId, fileName] = useAppStore((state) => [
    state.isRenameModelOpen,
    state.setIsRenameModelOpen,
    state.fileId,
    state.fileName,
  ]);

  const handleRename = async () => {
    const toastid = toast.loading("Renaming...")
    if (fileId && newFileName && user) {

      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        fileName: newFileName,
      })

      toast.success("Renamed successfully", {
        id: toastid,

      })
      // Close the model after renaming
      setIsRenameModelOpen(false);
      setNewFileName("");
    }
  };

  const handleClose = () => {
    setIsRenameModelOpen(false);
    setNewFileName("");
  };

  return (
    <Dialog open={isRenameModelOpen} onOpenChange={setIsRenameModelOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename File</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder={`Rename ${fileName}`}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRename}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
