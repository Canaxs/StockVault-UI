export type CreateShipmentRequest = {
  productId: number;
  warehouseId: number;
  customerId: number;
  quantity: number;
  notes: string;
};
