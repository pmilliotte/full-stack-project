import { z } from 'zod';

export const helloInput = z.object({ name: z.string().optional() });
export const echoInput = z.object({ message: z.string() });

export type HelloInput = z.infer<typeof helloInput>;
export type EchoInput = z.infer<typeof echoInput>;
