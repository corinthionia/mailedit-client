import { supabase } from '@/libs/supabase';

export const signInWithGoogle = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:3000',
    },
  });

  try {
    return data;
  } catch (e: unknown) {
    console.log(e);
  }
};

export const getSession = async () => {
  const authInfo = await supabase.auth.getSession();
  const session = authInfo.data.session;

  return session;
};

export const logout = () => {
  return supabase.auth.signOut();
};
