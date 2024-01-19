import { Accept, ErrorCode, FileError, useDropzone } from "react-dropzone"
import { UploadCloud } from "lucide-react"
import { bytesToSize } from "@/lib/file"
import AcceptedFiles from "./uploadFiles"

type Props = {
  selected: string[]
  setSelected: () => void
  accept: Accept
  message: string
  maxSize: number
  maxFiles: number
}

export default function Dropzone({
  selected,
  setSelected,
  accept = { "image/png": [".png", ".jpg", ".jpeg", "webp"] },
  maxSize = 1024 * 1024 * 100,
  maxFiles = 100,
  message = "Drop files here",
}: Props) {
  const { getRootProps, getInputProps, fileRejections, acceptedFiles } =
    useDropzone({
      accept,
      maxSize,
      maxFiles,
    })

  const handleError = (e: FileError) => {
    switch (e.code) {
      case ErrorCode.FileTooLarge:
        return `Max file size ${bytesToSize(maxSize)} allowed`
      default:
        return e.message
    }
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className="flex justify-center border-2 border-dashed rounded-lg p-8 text-muted-foreground hover:text-foregorund hover:border-primary/70 cursor-pointer"
      >
        <input {...getInputProps()} />
        <div>
          <div className="flex justify-center flex-col items-center text-center">
            <UploadCloud className="w-8 h-8" />
            <p className="">{message}</p>
          </div>
        </div>
      </div>

      {fileRejections.map(({ file, errors }) => (
        <div
          key={file.path}
          className="bg-destructive/20 border border-destructive/70 rounded-md text-sm px-2 py-2 space-y-2"
        >
          <p className="font-semibold leading-none">
            {file.path} - {bytesToSize(file.size)}
          </p>
          {errors.map((e, i) => (
            <p key={i} className="flex space-x-2 my-0 leading-none">
              <span>-</span> <span key={e.code}> {handleError(e)} </span>
            </p>
          ))}
        </div>
      ))}
      <div className="flex flex-wrap gap-4 ">
        {acceptedFiles.map((file, i) => (
          <AcceptedFiles file={file} key={i} />
        ))}
      </div>
    </div>
  )
}
