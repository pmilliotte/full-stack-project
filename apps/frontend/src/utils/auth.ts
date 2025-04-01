import { createClient, User } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const auth = {
  /**
   * Get the current authentication state
   */
  getUser: async (): Promise<User | undefined> => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || session === null) {
        throw error;
      }

      return session.user;
    } catch (error) {
      return;
    }
  },

  getBearerToken: async (): Promise<string | undefined> => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || session === null) {
        throw error;
      }

      return session.access_token;
    } catch (error) {
      return undefined;
    }
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data.user;
  },

  /**
   * Sign out the current user
   */
  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  /**
   * Register a new user
   */
  signUp: async (email: string, password: string, name?: string): Promise<User | null> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error) {
      throw error;
    }
    return data.user;
  },

  /**
   * Reset password
   */
  resetPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw error;
    }
  },

  /**
   * Update password
   */
  updatePassword: async (_oldPassword: string, newPassword: string): Promise<void> => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
  },
};
