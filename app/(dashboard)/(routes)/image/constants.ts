import z from 'zod';

export const formSchema = z.object({
  prompt: z.string().trim().min(1, { message: 'Prompt is required' }),
  amount: z.string().min(1),
  resolution: z.string().min(1)
});

export const amountOptions = [
  {
    value: "1",
    label: "1 photo" // Fixed typo here
  },
  {
    value: "2",
    label: "2 photos" // Fixed typo here
  },
  {
    value: "3",
    label: "3 photos" // Fixed typo here
  },
  {
    value: "4",
    label: "4 photos" // Fixed typo here
  },
  {
    value: "5",
    label: "5 photos" // Fixed typo here
  }
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256" // Fixed typo here
  },
  {
    value: "512x512",
    label: "512x512" // Fixed typo here
  },
  {
    value: "1024x1024",
    label: "1024x1024" // Fixed typo here
  }
];
