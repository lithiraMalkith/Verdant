export type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: "Villa" | "Apartment" | "Penthouse" | "Cottage" | "Estate";
  image: string;
  description: string;
};

export const properties: Property[] = [
  {
    id: "p-001",
    title: "Cedar Hollow Villa",
    location: "Aspen, Colorado",
    price: 2450000,
    beds: 5, baths: 4, area: 4200,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    description: "A serene cedar-clad villa nestled in the pines, with floor-to-ceiling glass framing the mountains.",
  },
  {
    id: "p-002",
    title: "The Greenhouse Loft",
    location: "Brooklyn, NY",
    price: 1280000,
    beds: 2, baths: 2, area: 1850,
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    description: "Industrial loft wrapped in living walls and warm oak floors.",
  },
  {
    id: "p-003",
    title: "Moss & Stone Cottage",
    location: "Cotswolds, UK",
    price: 685000,
    beds: 3, baths: 2, area: 1600,
    type: "Cottage",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80",
    description: "Storybook cottage with mossy stone walls and a private herb garden.",
  },
  {
    id: "p-004",
    title: "Skyline Conservatory",
    location: "Singapore",
    price: 3950000,
    beds: 4, baths: 5, area: 3800,
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80",
    description: "Penthouse with a wrap-around conservatory and panoramic skyline views.",
  },
  {
    id: "p-005",
    title: "Fernwood Estate",
    location: "Kandy, Sri Lanka",
    price: 1750000,
    beds: 6, baths: 5, area: 5200,
    type: "Estate",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
    description: "Heritage tea estate surrounded by misty hills and emerald canopies.",
  },
  {
    id: "p-006",
    title: "Willow Bay Residence",
    location: "Lake Como, Italy",
    price: 4200000,
    beds: 5, baths: 6, area: 4800,
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    description: "Lakeside villa with willow gardens and a private boathouse.",
  },
];

export const agents = [
  { name: "Amara Lin",      title: "Principal Broker",   region: "North America", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
  { name: "Idris Okafor",   title: "Heritage Specialist", region: "Europe",       photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
  { name: "Sora Tanaka",    title: "Urban Portfolio",     region: "Asia Pacific", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
  { name: "Helena Costa",   title: "Coastal & Lakeside",  region: "Mediterranean", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
];
