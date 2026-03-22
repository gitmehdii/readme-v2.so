import { supabase } from './supabase'

export async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: 'read:user user:email',
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
