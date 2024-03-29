import { supabase } from '@/libs/supabase';

export const signInWithGoogle = async () => {
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
      },
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

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const logout = () => {
  return supabase.auth.signOut();
};
