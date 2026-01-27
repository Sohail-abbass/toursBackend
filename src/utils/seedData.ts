import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from '../models/Tour';
import Package from '../models/Package';
import Destination from '../models/Destination';
import User from '../models/User';

dotenv.config();

// Seed data from db.json
const toursData = [
  {
    title: "03 Days Tour - Neelum Valley",
    slug: "neelum-valley-3-days",
    location: "Neelum Valley, Kashmir",
    days: 3,
    nights: 2,
    price: 14000,
    image: "/home3.jpg",
    gallery: ["/home3.jpg", "/package/skardu.jpg", "/mountain2.jpg"],
    shortDescription: "Explore the stunning beauty of Neelum Valley",
    fullDescription: "Experience the breathtaking beauty of Neelum Valley with this 3-day tour. Visit pristine locations, enjoy crystal-clear streams, and immerse yourself in the natural paradise of Kashmir.",
    highlights: [
      "Visit Keran and Sharda",
      "Explore Arang Kel",
      "Neelum River views",
      "Local cuisine experience"
    ],
    inclusions: [
      "Transportation",
      "2 Nights Hotel Stay",
      "Breakfast",
      "Guided Tours"
    ],
    exclusions: [
      "Lunch & Dinner",
      "Personal Expenses",
      "Travel Insurance"
    ],
    itinerary: [
      { day: 1, title: "Arrival & Keran Visit", description: "Arrive in Muzaffarabad, drive to Keran, enjoy scenic views of the Neelum River" },
      { day: 2, title: "Sharda & Arang Kel", description: "Visit Sharda University ruins, hike to Arang Kel meadows" },
      { day: 3, title: "Return Journey", description: "Morning at leisure, return to Muzaffarabad" }
    ],
    solo: 14000,
    couple: 31500,
    deluxe: 45000,
    featured: true,
    status: 'active'
  },
  {
    title: "05 Days Tour - Hunza Valley",
    slug: "hunza-valley-5-days",
    location: "Hunza Valley, Gilgit-Baltistan",
    days: 5,
    nights: 4,
    price: 21000,
    image: "/home1.jpg",
    gallery: ["/home1.jpg", "/package/honza.jpg", "/home6.jpg"],
    shortDescription: "Discover the enchanting Hunza Valley",
    fullDescription: "Embark on a 5-day journey through Hunza Valley, home to ancient forts, stunning glaciers, and warm hospitality.",
    highlights: [
      "Baltit & Altit Forts",
      "Attabad Lake boat ride",
      "Passu Cones view",
      "Eagle's Nest sunset",
      "Local Hunza cuisine"
    ],
    inclusions: [
      "Private Transportation",
      "4 Nights Hotel Stay",
      "Daily Breakfast",
      "Sightseeing Tours",
      "Professional Guide"
    ],
    exclusions: [
      "Lunch & Dinner",
      "Entrance Fees",
      "Personal Shopping"
    ],
    itinerary: [
      { day: 1, title: "Islamabad to Hunza", description: "Depart early morning via Karakoram Highway" },
      { day: 2, title: "Karimabad Exploration", description: "Visit Baltit Fort, Altit Fort, explore local bazaar" },
      { day: 3, title: "Attabad Lake & Passu", description: "Boat ride at Attabad Lake, visit Passu Cones" },
      { day: 4, title: "Eagle's Nest & Duikar", description: "Watch sunset from Eagle's Nest" },
      { day: 5, title: "Return Journey", description: "Morning shopping, return to Islamabad" }
    ],
    solo: 21000,
    couple: 52000,
    deluxe: 90000,
    featured: true,
    status: 'active'
  },
  {
    title: "04 Days Tour - Skardu Valley",
    slug: "skardu-valley-4-days",
    location: "Skardu, Gilgit-Baltistan",
    days: 4,
    nights: 3,
    price: 18000,
    image: "/home2.jpg",
    gallery: ["/home2.jpg", "/package/gilgitt.jpg", "/package/skardu.jpg"],
    shortDescription: "Gateway to K2 and stunning lakes",
    fullDescription: "Explore Skardu, the gateway to some of world's highest peaks.",
    highlights: ["Shangrila Resort", "Satpara Lake", "Shigar Fort", "Katpana Desert", "Local culture"],
    inclusions: ["Transportation", "3 Nights Accommodation", "Breakfast", "Sightseeing", "Guide Services"],
    exclusions: ["Meals (Lunch/Dinner)", "Personal Expenses", "Optional Activities"],
    itinerary: [
      { day: 1, title: "Arrival in Skardu", description: "Flight to Skardu, check-in, visit Kharpocho Fort" },
      { day: 2, title: "Shangrila & Satpara", description: "Visit Shangrila Resort, Satpara Lake" },
      { day: 3, title: "Shigar Valley", description: "Explore Shigar Fort, Cold Desert" },
      { day: 4, title: "Departure", description: "Morning at leisure, flight back" }
    ],
    solo: 18000,
    couple: 42000,
    deluxe: 75000,
    featured: true,
    status: 'active'
  },
  {
    title: "06 Days Tour - Swat & Kalam",
    slug: "swat-kalam-6-days",
    location: "Swat Valley, KPK",
    days: 6,
    nights: 5,
    price: 25000,
    image: "/home3.jpg",
    gallery: ["/home3.jpg", "/mountain1.jpg", "/mountain2.jpg"],
    shortDescription: "Switzerland of Pakistan adventure",
    fullDescription: "Discover Swat Valley, known as the Switzerland of Pakistan.",
    highlights: ["Malam Jabba Ski Resort", "Mahodand Lake", "Kalam Valley", "Buddhist Stupas", "Mingora Bazaar"],
    inclusions: ["Private Transport", "5 Nights Hotels", "All Breakfasts", "Sightseeing Tours", "Professional Guide"],
    exclusions: ["Lunch & Dinner", "Ski Equipment", "Personal Shopping"],
    itinerary: [
      { day: 1, title: "Islamabad to Swat", description: "Drive to Mingora" },
      { day: 2, title: "Malam Jabba", description: "Visit Malam Jabba Ski Resort" },
      { day: 3, title: "Kalam Valley", description: "Drive to Kalam, explore Ushu Forest" },
      { day: 4, title: "Mahodand Lake Trek", description: "Full day at Mahodand Lake" },
      { day: 5, title: "Buddhist Sites", description: "Visit Buddhist stupas" },
      { day: 6, title: "Return", description: "Drive back to Islamabad" }
    ],
    solo: 25000,
    couple: 58000,
    deluxe: 95000,
    featured: true,
    status: 'active'
  }
];

const packagesData = [
  {
    title: "Northern Adventure – 7 Days",
    slug: "northern-adventure-7-days",
    duration: { days: 7, nights: 6 },
    price: 30000,
    currency: "PKR",
    description: "Explore Hunza, Skardu and Gilgit in one unforgettable northern adventure.",
    mainImage: "/home1.jpg",
    gallery: ["/package/gilgitt.jpg", "/package/honza.jpg", "/package/skardu.jpg"],
    destinations: [
      { name: "Hunza", stayDays: 3, image: "/package/gilgitt.jpg" },
      { name: "Skardu", stayDays: 2, image: "/package/honza.jpg" },
      { name: "Gilgit", stayDays: 2, image: "/package/skardu.jpg" }
    ],
    itinerary: [
      { day: 1, title: "Islamabad → Gilgit", activities: ["Early morning departure", "Flight to Gilgit", "Hotel check-in"], meals: ["Lunch", "Dinner"], stay: "Gilgit" },
      { day: 2, title: "Gilgit → Hunza", activities: ["Drive towards Hunza Valley", "Rakaposhi viewpoint", "Visit Altit Fort"], meals: ["Breakfast", "Dinner"], stay: "Hunza" }
    ],
    accommodation: { hotelCategory: "3-4 Star Hotels", roomType: "Sharing basis", totalNights: 6, cities: ["Gilgit", "Hunza", "Skardu"] },
    transport: { mode: "Coaster/Prado", fuelIncluded: true, driver: true, airportTransfers: true },
    includes: ["Hotel accommodation", "Daily breakfast", "Private transport", "Fuel & toll taxes", "Driver allowance", "Sightseeing tours"],
    excludes: ["Personal expenses", "Travel insurance", "Extra meals", "Any activity not mentioned"],
    idealFor: ["Families", "Couples", "Friends"],
    status: 'active'
  },
  {
    title: "KPK Explorer – 5 Days",
    slug: "kpk-explorer-5-days",
    duration: { days: 5, nights: 4 },
    price: 22000,
    currency: "PKR",
    description: "Discover Swat Valley, Malam Jabba ski resort and historic Mingora.",
    mainImage: "/home3.jpg",
    gallery: ["/package/gilgitt.jpg", "/package/honza.jpg", "/package/skardu.jpg"],
    destinations: [
      { name: "Swat Valley", stayDays: 2, image: "/package/gilgitt.jpg" },
      { name: "Malam Jabba", stayDays: 2, image: "/package/honza.jpg" },
      { name: "Mingora", stayDays: 1, image: "/package/skardu.jpg" }
    ],
    accommodation: { hotelCategory: "3 Star Hotels", roomType: "Sharing basis", totalNights: 4 },
    transport: { mode: "Private Hiace", fuelIncluded: true, driver: true },
    includes: ["Hotel stay", "Breakfast included", "Sightseeing tours", "Transport with fuel", "Professional guide"],
    excludes: ["Lunch & dinner", "Personal expenses", "Ski equipment rental"],
    idealFor: ["Adventure Seekers", "Families", "Nature Lovers"],
    status: 'active'
  },
  {
    title: "Skardu & Deosai Plains – 6 Days",
    slug: "skardu-deosai-tour-6-days",
    duration: { days: 6, nights: 5 },
    price: 35000,
    currency: "PKR",
    description: "Experience the majestic beauty of Skardu and Deosai National Park.",
    mainImage: "/home2.jpg",
    gallery: ["/package/skardu.jpg", "/package/gilgitt.jpg", "/package/honza.jpg"],
    destinations: [
      { name: "Skardu City", stayDays: 2, image: "/package/skardu.jpg" },
      { name: "Deosai Plains", stayDays: 2, image: "/package/gilgitt.jpg" },
      { name: "Shangrila", stayDays: 2, image: "/package/honza.jpg" }
    ],
    accommodation: { hotelCategory: "4 Star Hotels", roomType: "Double/Twin", totalNights: 5 },
    transport: { mode: "4x4 Jeeps", fuelIncluded: true, driver: true, airportTransfers: true },
    includes: ["Luxury accommodation", "All meals", "4x4 Jeep transport", "Professional guide", "Entry fees to parks"],
    excludes: ["Personal expenses", "Travel insurance", "Tips for staff"],
    idealFor: ["Photographers", "Nature Lovers", "Luxury Travelers"],
    status: 'active'
  }
];

const destinationsData = [
  {
    name: "Skardu Valley",
    slug: "skardu-valley",
    region: "Gilgit-Baltistan",
    shortDescription: "Gateway to some of the world's highest peaks and pristine lakes",
    fullDescription: "Skardu Valley, located in Gilgit-Baltistan, is a paradise for adventure seekers and nature lovers.",
    mainImage: "/package/gilgitt.jpg",
    gallery: ["/package/gilgitt.jpg", "/package/skardu.jpg", "/home2.jpg"],
    attractions: ["Shangrila Resort", "Deosai National Park", "Satpara Lake", "Shigar Fort", "Mantoka Waterfall", "Katpana Desert"],
    bestTimeToVisit: "April to October",
    activities: ["Trekking", "Camping", "Photography", "Boating", "Jeep Safari"],
    altitude: "2,228 meters",
    temperature: "Summer: 15-25°C, Winter: -10 to 10°C",
    featured: true,
    status: 'active'
  },
  {
    name: "Fairy Meadows",
    slug: "fairy-meadows",
    region: "Gilgit-Baltistan",
    shortDescription: "A piece of heaven at the base of Nanga Parbat",
    fullDescription: "Fairy Meadows is a breathtaking alpine meadow located at the base of Nanga Parbat.",
    mainImage: "/package/honza.jpg",
    gallery: ["/package/honza.jpg", "/home3.jpg", "/mountain1.jpg"],
    attractions: ["Nanga Parbat Base Camp", "Beyal Camp", "Raikot Glacier", "Alpine Meadows", "Tato Village"],
    bestTimeToVisit: "May to September",
    activities: ["Trekking", "Camping", "Mountain Climbing", "Photography", "Stargazing"],
    altitude: "3,300 meters",
    temperature: "Summer: 10-20°C, Winter: Below 0°C",
    featured: true,
    status: 'active'
  },
  {
    name: "Swat Valley",
    slug: "swat-valley",
    region: "Khyber Pakhtunkhwa",
    shortDescription: "The Switzerland of Pakistan with lush green valleys",
    fullDescription: "Swat Valley, often called the 'Switzerland of Pakistan', is a picturesque valley in KPK.",
    mainImage: "/home3.jpg",
    gallery: ["/home3.jpg", "/package/skardu.jpg", "/mountain2.jpg"],
    attractions: ["Malam Jabba Ski Resort", "Kalam Valley", "Mahodand Lake", "Mingora City", "Buddhist Stupas"],
    bestTimeToVisit: "March to October",
    activities: ["Skiing", "Hiking", "River Rafting", "Fishing", "Cultural Tours"],
    altitude: "980 meters",
    temperature: "Summer: 20-30°C, Winter: 0-15°C",
    featured: true,
    status: 'active'
  },
  {
    name: "Naran Valley",
    slug: "naran-valley",
    region: "Khyber Pakhtunkhwa",
    shortDescription: "Spectacular valley with Lake Saif ul Malook",
    fullDescription: "Naran Valley is one of Pakistan's most popular tourist destinations.",
    mainImage: "/home5.jpg",
    gallery: ["/home5.jpg", "/package/gilgitt.jpg", "/home4.jpg"],
    attractions: ["Lake Saif ul Malook", "Lalazar", "Babusar Pass", "Lulusar Lake", "Ansoo Lake"],
    bestTimeToVisit: "May to September",
    activities: ["Hiking", "Jeep Safari", "Boating", "Photography", "Horse Riding"],
    altitude: "2,409 meters",
    temperature: "Summer: 15-25°C, Winter: -5 to 10°C",
    featured: true,
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tours_db';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Tour.deleteMany({});
    await Package.deleteMany({});
    await Destination.deleteMany({});

    // Seed Tours
    console.log('🚀 Seeding Tours...');
    await Tour.insertMany(toursData);
    console.log(`   ✓ ${toursData.length} tours created`);

    // Seed Packages
    console.log('📦 Seeding Packages...');
    await Package.insertMany(packagesData);
    console.log(`   ✓ ${packagesData.length} packages created`);

    // Seed Destinations
    console.log('🗺️  Seeding Destinations...');
    await Destination.insertMany(destinationsData);
    console.log(`   ✓ ${destinationsData.length} destinations created`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const existingAdmin = await User.findOne({ email: 'admin@tours.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin',
        email: 'admin@tours.com',
        password: 'admin123',
        role: 'admin',
        isActive: true
      });
      console.log('   ✓ Admin user created (admin@tours.com / admin123)');
    } else {
      console.log('   ✓ Admin user already exists');
    }

    console.log('\n✨ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

