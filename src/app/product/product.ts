export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: RatingProps;
}

interface RatingProps {
  rate: number;
  count: number;
}

export interface IProductResponse {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
