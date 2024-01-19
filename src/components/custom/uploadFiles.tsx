import { firebase_storage } from "@/firebase/config"
import { cn } from "@/lib/utils"
import {
  TaskState,
  UploadTask,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import React, { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { File, X } from "lucide-react"

const AcceptedFiles = ({ file }: { file: File }) => {
  const [currFile, setCurrFile] = useState<File | null>(file)
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadUrl] = useState("")

  const uploadTask = useRef<UploadTask>()

  const storageRef = ref(firebase_storage, `images/${currFile?.name}`)

  useEffect(() => {
    setProgress(0)
    if (!currFile) return

    uploadTask.current = uploadBytesResumable(storageRef, currFile)
    uploadTask.current.on(
      "state_changed",
      (snap) => {
        const progress = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        )
        setProgress(progress)
      },
      (error) => {
        // Handle unsuccessful uploads
        setProgress(0)
        console.log(error)
      },
      () => {
        if (!uploadTask.current) return
        getDownloadURL(uploadTask.current.snapshot.ref).then((downloadURL) => {
          setDownloadUrl(downloadURL)
        })
      }
    )
  }, [currFile])

  const handleDelete = async () => {
    if (uploadTask.current && state === "running") uploadTask.current?.cancel()
    if (downloadURL) await deleteObject(storageRef)
    setCurrFile(null)
    setDownloadUrl("")
  }
  const state = uploadTask.current?.snapshot.state

  if (!currFile && !downloadURL) return null

  return (
    <div
      className={cn(
        "w-28 h-28 bg-muted border rounded-md capitalize text-center flex items-center justify-center text-muted-foreground text-sm relative overflow-hidden group",
        state === "running"
          ? "animate-pulse hover:animate-none"
          : state === "error"
          ? "bg-destructive/30"
          : null
      )}
    >
      <Button
        type="button"
        variant={"outline"}
        className="p-0 w-6 h-6 absolute top-0 right-0 invisible group-hover:visible"
        onClick={() => handleDelete()}
      >
        <X className="h-5 w-5" />
      </Button>

      {downloadURL ? (
        currFile?.type.includes("image") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={downloadURL} alt={currFile.name} className="object-cover" />
        ) : (
          <File className="w-8 h-8 text-muted-foreground" />
        )
      ) : state === "success" ? null : state === "running" ? (
        `${progress}%`
      ) : (
        state
      )}
    </div>
  )
}

export default AcceptedFiles
