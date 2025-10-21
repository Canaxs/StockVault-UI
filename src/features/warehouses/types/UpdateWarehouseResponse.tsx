export type UpdateWarehouseResponse = {
  id: number;
  name: string;
  location: string;
  maxCapacity: number;
  currentCapacity: number;
  updatedDate: Date;
};
