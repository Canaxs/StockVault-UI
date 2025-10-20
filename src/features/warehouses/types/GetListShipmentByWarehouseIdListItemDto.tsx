export type GetListShipmentByWarehouseIdListItemDto = {
  id: number;
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  customerName: string;
  quantity: number;
  deliveryStatus: string;
  createdDate: Date;
};
