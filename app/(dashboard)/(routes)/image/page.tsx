'use client';

import z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Download, ImageIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/Heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Loader } from '@/components/Loader';
import { Empty } from '@/components/Empty';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
});

export default function ImagePage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.prompt.trim()) {
      toast.error('Please enter a valid prompt.');
      return;
    }

    try {
      setImages([]);
      const response = await axios.post('/api/image', values);
      const imageSrc = response.data.imageSrc;
      setImages([imageSrc]);
      form.reset();
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error('Unauthorized. Please log in.');
      } else if (error?.response?.status === 400) {
        toast.error('Invalid input. Please check your prompt.');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };

  const downloadImage = (base64Image) => {
    const byteString = atob(base64Image.split(',')[1]);
    const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    const blob = new Blob([ab], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'generated-image.png';
    link.click();
    URL.revokeObjectURL(blobUrl); 
  };
  

  return (
    <div>
      <Heading
        icon={ImageIcon}
        title="Image Generation"
        bgColor="bg-pink-700/10"
        iconColor="text-pink-700"
        description="Turn your prompt into an image."
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="p-0 m-0">
                      <Input
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss Alps"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                className="w-full col-span-12 "
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="p-20">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No images generated." />
          )}
          <div className=" h-full w-full flex justify-center items-center ">
            {images.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg w-[500px] h-full lg:w-[700px]">
                <div className="relative aspect-square">
                  <Image fill src={image} alt="Generated Image" />
                </div>
                <div className="p-2">
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => downloadImage(image)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
