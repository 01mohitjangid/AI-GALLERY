import {z} from 'zod'

export const ImageUploadValidator = z.object({
    images:z.array(z.string()),
    personName:z.string().trim(),
})

export type ImageUploadRequest = z.infer<typeof ImageUploadValidator>
