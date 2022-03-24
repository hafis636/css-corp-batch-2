export enum ProductCategoryEnum {
  MensClothing = "men's clothing",
  Jewelry = 'jewelry',
  Electronics = 'electronics',
  WomansClothing = "women's clothing",
}

export type RatingType = {
  rate: number;
  count: number;
};
export type OfferType = {
  name: string;
  offercode: string;
  offerFunc: (param: number) => void;
  invalid?: number;
}
export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ProductCategoryEnum;
  image: string;
  rating: RatingType;
  qty: number;
};
