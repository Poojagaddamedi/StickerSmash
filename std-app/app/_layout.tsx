import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../lib/auth';
import { supabase } from '@/lib/supabase';


function ProtectedLayout() {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    async function checkUserProfile() {
      if (!session?.user) {
        setIsCheckingProfile(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setHasProfile(!!data);
      setIsCheckingProfile(false);
    }

    checkUserProfile();
  }, [session]);

  useEffect(() => {
    if (isLoading || isCheckingProfile) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)';
    const inWelcomeScreen = segments[1] === 'welcome';
    const inAccountScreen = segments[1] === 'account';

    if (!session && !inPublicGroup) {
      router.replace('/sign-in');
    } else if (session && !inAuthGroup) {
      if (!hasProfile) {
        router.replace('/welcome');
      } else {
        router.replace('/home');
      }
    } else if (session && hasProfile && inWelcomeScreen) {
      router.replace('/home');
    }
  }, [session, segments, isLoading, hasProfile, isCheckingProfile]);

  if (isLoading || isCheckingProfile) {
    return null;
  }

  return <Slot />;
}

// Root layout
export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedLayout />
    </AuthProvider>
  );
}
