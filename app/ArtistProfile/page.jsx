"use client";

import React, { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import MyArtworksComponent from './myArtworksComponent'
import { useRouter } from 'next/navigation'
import dbArtworks from '../Artworks/dbArtworks.json'

const ArtistProfilePage = () => {
  const { user, dbUpdate, setDbUpdate } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userArtworks, setUserArtworks] = useState([]);
  
  useEffect(() => {
    const checkAuth = () => {
      // Move localStorage check inside useEffect
      const storedUser = localStorage.getItem("user");
      
      if (!storedUser && !user) {
        router.push('/Login');
      } else {
        if(user?.artistData){
          const filteredArtworks = dbArtworks.artworks.filter(
            artwork => artwork.artistId === user.artistData.id
          );
          setUserArtworks(filteredArtworks);
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, router]); // Add router to dependencies

  // Show loading state during initial render and client-side auth check
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userArtworks.map(artwork => (
            <MyArtworksComponent 
              key={artwork.id}
              artworkID={artwork.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistProfilePage