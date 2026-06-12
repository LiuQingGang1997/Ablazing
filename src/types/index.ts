export interface NavItem {
  label: string;
  path: string;
}

export interface Brand {
  id: number;
  name: string;
  logoUrl?: string;
  slogan?: string;
  introduction?: string;
  promoImageUrl?: string;
  mobilePromoImageUrl?: string;
  promoVideoUrl?: string;
  mobilePromoVideoUrl?: string;
  detailDescription?: string;
  foundedYear?: number;
  metrics?: { value: string; label: string }[];
  highlights?: { title: string; description: string }[];
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
  mobilePosition?: string;
  desktopPosition?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
  category?: string;
  coverImageUrl?: string;
  brandId?: number;
  brandName?: string;
  typeId?: number;
  typeName?: string;
  categoryId?: number;
  categoryName?: string;
  seriesId?: number;
  seriesName?: string;
  sceneId?: number;
  sceneName?: string;
  parameters?: Record<string, string>;
  summary?: string;
  detailDescription?: string;
  detailImages?: string[];
  model?: string;
  tag?: string;
  weightKg?: number;
  weightLb?: number;
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
