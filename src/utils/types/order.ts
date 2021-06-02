export interface Order {
  __typename: "Order";
  _id: string;
  createdAt: number | string;
  updatedAt: number | string;
  grossAmount: number;
  items: OrderItem[];
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
  shippingDetails: ShippingDetails;
}

export interface ShippingDetails {
  address: string;
  city: string;
  country: string;
  email: string;
  fullname: string;
  phoneNumber?: string;
  postalCode: string;
  state: string;
}

export interface OrderItem {
  _id: string;
  name: string;
  quantity: number;
  price: number;
}
