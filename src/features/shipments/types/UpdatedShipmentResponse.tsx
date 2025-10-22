export type UpdatedShipmentResponse = {
  id: number;
  productId: number;
  warehouseId: number;
  customerId: number;
  quantity: number;
  deliveryStatus: number;
  notes: string;
  updatedDate: Date;
};
