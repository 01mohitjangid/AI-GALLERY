'use client'
import React, { useState } from 'react'
import UploadImages from './ImageUpload'
import { Input } from './ui/input'
import { useMutation } from '@tanstack/react-query'
import { ImageUploadRequest } from '@/lib/validators/imageUpload'
import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { set } from 'zod'
type Props = {}

const AddImage = (props: Props) => {
    const { toast } = useToast()
    const [personName, setPersonName] = useState<string>('')
    const [allImages, setAllImages] = useState<string[]>([]);
    const { mutate: uploadImage, isLoading: isUploading } = useMutation({
        mutationKey: ['images'],
        mutationFn: async () => {
            const payload: ImageUploadRequest = {
                personName,
                images: allImages,
            }
            const { data } = await axios.post('/api/uploadImage', payload)
            return data as ImageUploadRequest
        },
        onError: async (err) => {
            setPersonName('')
            setAllImages([])
            if (err instanceof AxiosError) {
                if (err.response?.status === 409) {
                    return toast({
                        title: 'Lineup Already Exists',
                        description: 'A Lineup with the same name already exists for this map and site.',
                        variant: 'destructive',
                    })
                }

                else if (err.response?.status === 422) {
                    return toast({
                        title: 'Upload Validation Error',
                        description: 'An Error Occured while Validating Please try again.',
                        variant: 'destructive'
                    })
                }
            }
            return toast({
                title: 'Error Uploading Image',
                description: 'An Error Occured while Uploading Please try again.',
                variant: 'destructive'
            })
        },
        onSuccess:async () =>{
            setPersonName('')
            setAllImages([])
            return toast({
                title: 'Image Upload Success',
                description: 'Image Uploaded Successfully.',
            })
            
        }
    })
    

    return (
        <div className='flex flex-col gap-4'>
            {allImages.length>=1 && <div className="flex gap-1 flex-wrap max-w-xl border p-2 rounded-xl">
            {allImages.map((img) => (
                <Image key={img} src={img} alt='preview' width={500} height={500} className='w-24 h-24 rounded-xl' />
            ))}
            </div>}
            <UploadImages allImages={allImages} setAllImages={setAllImages} />
            {/* <Input placeholder='Name of Person' value={personName} onChange={e => setPersonName(e.target.value)} /> */}
            {/* <Button onClick={() => uploadImage()} disabled={isUploading} isLoading={isUploading}>Upload</Button> */}
        </div>
    )
}

export default AddImage