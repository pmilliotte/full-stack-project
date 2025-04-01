import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { LoadingButton } from '~/components/LoadingButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useBreadcrumb } from '~/lib/hooks/useBreadcrumb';
import { trpc } from '~/utils/trpc';

const createUserSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().min(1, "L'email est requis").email("L'adresse email n'est pas valide"),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export const Mutation = (): React.ReactElement => {
  useBreadcrumb([
    {
      label: 'Mutation',
    },
  ]);

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const createUser = trpc.users.create.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success('Utilisateur créé avec succès !');
    },
    onError: () => {
      toast.error("Une erreur s'est produite");
    },
  });

  const onSubmit = (data: CreateUserFormData): void => {
    void createUser.mutate(data);
  };

  return (
    <div className="container mx-auto flex h-full max-w-2xl items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Créer un utilisateur</CardTitle>
          <CardDescription>Créer un nouvel utilisateur dans le système</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              noValidate
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                void form.handleSubmit(onSubmit)(e);
              }}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                Icon={User}
                className="w-full"
                isLoading={createUser.isPending}
                label="Créer un utilisateur"
                type="submit"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
