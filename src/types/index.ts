export interface NavItem {
  label: string;
  path: string;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  category?: string;
}

export interface Store {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
  products: Product[];
}

export interface CompanyInfo {
  name: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: number;
  employees: number;
  image: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface ImageConfig {
  key: string;
  url: string;
  alt: string;
}
