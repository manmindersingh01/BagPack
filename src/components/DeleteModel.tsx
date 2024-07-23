"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../fitebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
export function DeleteModel() {
  const { user } = useUser();
  const [isDeleteModelOpen, setIsDeleteModelOpen, fileId, setFileId] = useAppStore((state) => [
    state.isDeleteModelOpen,
    state.setIsDeleteModelOpen,
    state.fileId,
    state.setFileId,
  ]);

  async function deleteFile() {
    const toastId = toast.loading("Deleting the file...")
    if (!user || !fileId) {
      console.error("User or fileId is missing");
      return;
    }

    console.log("Deleting file with ID:", fileId);

    try {
      const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
      await deleteObject(fileRef);
      console.log("File successfully deleted!");

      await deleteDoc(doc(db, "users", user.id, "files", fileId));
      toast.success("File deleted successfully", {
        id: toastId,

      })
      console.log("Document successfully deleted!");

      setIsDeleteModelOpen(false);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  }

  return (
    <Dialog
      open={isDeleteModelOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModelOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {/* <Button variant="outline">Delete File</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant="ghost"
            onClick={() => setIsDeleteModelOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={deleteFile}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
