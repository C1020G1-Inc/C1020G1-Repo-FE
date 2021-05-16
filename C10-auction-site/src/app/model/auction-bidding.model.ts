import {Product} from './Product';

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

export interface AuctionDetail {
  accountId: number;
  accountName: string;
  auctionId: number;
  price: number;
  status: string;
  timeAuction: Date;
}

export interface HistoryAuction {
  auctions: Array<AuctionDetail>;
  currentStep: number;
}

export interface AuctionSubmit {
  productId: number;
  timeAuction: Date;
  price: number;
}

export interface ProductImage {
  productImageId: number;
  image : string;
}

export interface TransactionDTO {
  transactionId: number;
  product: Product;
  status: string;
  transactionTime: Date;
  auction: AuctionDetail;
  images: Array<ProductImage>;
}
