import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { auth } from '~/utils/auth';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "L'email est requis").email('Adresse email invalide'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = (): React.ReactElement => {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData): Promise<void> => {
    try {
      await auth.resetPassword(data.email);
      toast.success(
        'Si un compte existe avec cet email, vous recevrez les instructions de réinitialisation du mot de passe.'
      );
    } catch (error) {
      form.setError('root', {
        message: 'Échec de la réinitialisation du mot de passe',
      });
      toast.error('Échec de la réinitialisation du mot de passe');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-center">
            Entrez votre email pour réinitialiser votre mot de passe
          </CardDescription>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="text-sm text-destructive text-center">
                  {form.formState.errors.root.message}
                </div>
              )}

              <Button className="w-full" type="submit">
                Réinitialiser le mot de passe
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Vous vous souvenez de votre mot de passe ?{' '}
            <Link className="font-medium text-primary hover:text-primary/90" to="/login">
              Se connecter
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
