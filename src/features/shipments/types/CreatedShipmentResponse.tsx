export type CreatedShipmentResponse = {
  id: number;
  productId: number;
  warehouseId: number;
  customerId: number;
  quantity: number;
  deliveryStatus: string;
  notes: string;
};
