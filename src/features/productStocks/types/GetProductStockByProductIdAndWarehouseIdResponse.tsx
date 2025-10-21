export type GetProductStockByProductIdAndWarehouseIdResponse = {
  id: number;
  productId: number;
  productName: string;
  warehouseId: number;
  warehouseName: string;
  quantity: number;
  createdDate: Date;
};
