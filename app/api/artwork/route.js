// import { connectToDatabase } from '../../../lib/mongodb';

// export async function GET() {
//   const db = await connectToDatabase();
//   const artworks = await db.collection('art').find({}).toArray();

//   // Log the data fetched from the database
//   console.log('Fetched artworks:', artworks);

//   // Convert MongoDB ObjectId to string
//   const serializedArtworks = artworks.map(item => ({
//     ...item,
//     _id: item._id.toString(), // Convert ObjectId to string
//   }));

//   // Return data as JSON response
//   return new Response(JSON.stringify(serializedArtworks), {
//     status: 200,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }