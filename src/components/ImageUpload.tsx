'use client'
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "./ui/use-toast";

type Props = {
  allImages:string[]
  setAllImages: React.Dispatch<React.SetStateAction<string[]>>
}

const UploadImages = (
  {allImages , setAllImages}: Props) => {
    const {toast} = useToast()
  return (

    <UploadButton

      endpoint="imageUploader"

      onClientUploadComplete={(res) => {
        // Do something with the response
        if(!res) return console.log('no response')
        setAllImages((prevImages) => [...prevImages, res[0].url])

      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        return toast({
          title: 'Error Uploading Image',
          description: error.message,
          variant: 'destructive'
        })
      }}
    />
      )
}

export default UploadImages