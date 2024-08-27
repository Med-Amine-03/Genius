'use client';

import z, { string } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Code, MessageSquare } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/Heading';
import { cn } from '@/lib/utils';
import { formSchema } from './constants';
import ReactMarkdown from 'react-markdown'
import { Empty } from '@/components/Empty';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Loader } from '@/components/Loader';
import { UserAvatar } from '@/components/User-avatar';
import { BotAvatar } from '@/components/Bot-avatar';

export default function CodePage() {
  const router = useRouter();

  
  const [messages, setMessages] = useState([]);

 
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  
  const isLoading = form.formState.isSubmitting;

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!values.prompt.trim()) {
      toast.error('Please enter a valid message.');
      return;
    }

    try {
      
      const userMessage = {
        role: 'user',
        content: values.prompt,
      };

      
      const newMessages = [...messages, userMessage];

      
      console.log('Sending Messages:', newMessages);

      
      const response = await axios.post('/api/code', {
        messages: newMessages,
      });

      
      console.log('API Response:', response.data);

      
      setMessages((current) => [
        ...current,
        userMessage,
        { role: 'assistant', content: response.data.content },
      ]);

      // Reset form input
      form.reset();
    } catch (error) {
      
      if (error?.response?.status === 401) {
        toast.error('Unauthorized. Please log in.');
      } else if (error?.response?.status === 400) {
        toast.error('Invalid input. Please check your message format.');
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      // Refresh the page
      router.refresh();
    }
  };

  const isMessagesEmpty = messages.length === 0;

  return (
    <div>
      
      <Heading
        title="Code Generation"
        icon={Code}
        bgColor="bg-green-700/10"
        iconColor="text-green-700"
        description="generate code using this tool."
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
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        disabled={isLoading}
                        placeholder="Simple toggle button using the react hooks."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              
              <Button
                disabled={isLoading}
                className="w-full col-span-12 lg:col-span-2"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {isMessagesEmpty && !isLoading && (
            <div>
              <Empty label='No conversation started' />
            </div>
          )}

          {messages.length > 0 && !isMessagesEmpty && (
            <div className='flex flex-col-reverse gap-y-4'>
              {messages.map((item, index) => (
                <div
                  key={index}
                  className={cn("p-8 w-full  items-center gap-x-8 rounded-lg",
                    item.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                  )}>
                  {item.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="w-full p-2 my-2 overflow-auto rounded-lg bg-black/10">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="p-1 rounded-lg bg-black/10" {...props} />
                    ),
                  }}
                  className="overflow-hidden text-sm leading-7"
                >
                  {item.content || ''}
                </ReactMarkdown>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
