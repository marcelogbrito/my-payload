import { getPayload } from "payload";
import payloadConfig from "../../payload.config";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

    export const createTodo = async (formData: FormData) => {
        'use server'
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const completed = formData.get('completed') ? true : false as boolean;
        const media = formData.get('media') as File | null;

        const payload = await getPayload({ config: payloadConfig });

          // use rest api to get the media uploaded and pass id
  // to the payload create todo
  const mediaFormData = new FormData()
  if (media) {
    mediaFormData.append('file', media);
  }
  mediaFormData.append(
    '_payload',
    JSON.stringify({
      alt: 'ALT: ' + title,
    }),
  )

  const mediaResponse = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_API}/media`, {
    method: 'POST',
    body: mediaFormData,
  })

  const mediaData = await mediaResponse.json()

  if (!mediaData?.doc?.id) {
    throw new Error('Failed to upload media')
  }
  const mediaId = mediaData.doc.id
        const todo = await payload.create({
            collection: 'todos',
            data: {
                title,
                description,
                completed,
                media: mediaId,
            },
        });

        revalidatePath('/')
        redirect("/")
    };