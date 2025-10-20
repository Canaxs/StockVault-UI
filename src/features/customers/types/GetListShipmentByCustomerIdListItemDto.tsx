export type GetListShipmentByCustomerIdListItemDto = {
  id: number;
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  customerName: string;
  quantity: number;
  deliveryStatus: string;
  notes: string;
};
