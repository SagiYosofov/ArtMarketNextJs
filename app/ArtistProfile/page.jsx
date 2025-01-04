"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import MyArtworksComponent from './myArtworksComponent'
import { useRouter } from 'next/navigation'

const ArtistProfilePage = () => {
  const { user, dbUpdate, setDbUpdate } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user data is available in localStorage
    const storedUser = localStorage.getItem("user");
    
    if (!storedUser && !user) {
      router.push('/Login');
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Artist Profile Page</h2>
      <h1>Welcome, {user.firstName} {user.lastName}!</h1>
      <div className="my-4">
        <h3 className="text-xl mb-4">My Artworks</h3>
        <MyArtworksComponent artistID={user.id} />
      </div>
    </div>
  )
}

export default ArtistProfilePage