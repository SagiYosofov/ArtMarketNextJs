import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Artist } from '../models/Artist.js';
import { Artwork } from '../models/Artwork.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadMockData() {
  const artistDataPath = join(__dirname, '..', 'app', 'Artists', 'mockData.json');
  const artworkDataPath = join(__dirname, '..', 'app', 'Artworks', 'mockArtworks.json');
  
  const [artistData, artworkData] = await Promise.all([
    readFile(artistDataPath, 'utf-8'),
    readFile(artworkDataPath, 'utf-8')
  ]);

  return {
    artists: JSON.parse(artistData).artists,
    artworks: JSON.parse(artworkData).artworks
  };
}

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedDatabase() {
  try {
    // Load environment variables
    const mongoUri = process.env.MONGODB_URI;
    process.env.MONGODB_URI = mongoUri;

    // Connect to MongoDB
    await connectToDatabase();
    
    // Load mock data
    const { artists, artworks } = await loadMockData();
    
    // Clear existing data
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Artwork.deleteMany({});
    
    console.log('Creating users and artists...');
    // Create users and artists from mock data
    for (const artistData of artists) {
      // Create user first
      const names = artistData.fullName.split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ');
      
      const user = await User.create({
        username: artistData.fullName.toLowerCase().replace(/\s+/g, '_'),
        password: '123',
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        country: artistData.country,
        isVerified: true,
        userType: 'ARTIST'
      });

      // Create artist with reference to user
      await Artist.create({
        id: artistData.id,
        username: user.username,
        picture: artistData.picture,
        bio: artistData.bio,
        artworkIds: artistData.artworkIds,
        amountOfSoldArts: 0,
        bank_account_number: `BANK-${artistData.id}`
      });
    }

    console.log('Creating artworks...');
    // Create artworks
    for (const artworkData of artworks) {
      await Artwork.create({
        artwork_id: artworkData.id,
        artist_id: artworkData.artistId,
        title: artworkData.title,
        artist_name: artworkData.artistName,
        description: artworkData.description,
        medium: artworkData.medium,
        dimensions: artworkData.dimensions,
        picture: artworkData.picture,
        price: artworkData.price
      });
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

// Run the seeding function
seedDatabase();