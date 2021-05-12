export interface Category {
  id: number;
  categoryName: string;
}

export interface ProductStatus {
  id: number;
  statusName: string;
}

export interface AccountSimple {
  accountId: number;
  accountName: string;
}

export interface Image {
  id: number;
  image: string;
}

export interface ProductDetail {
  productId: number;
  productName: string;
  price: number;
  category: Category;
  priceStep: number;
  serviceFee: number;
  quantity: number;
  lastPrice: number;
  description: string;
  productStatus: ProductStatus;
  registerTime: Date;
  auctionTime: number;
  endTime: Date;
  account: AccountSimple;
  images: Array<Image>;
}
