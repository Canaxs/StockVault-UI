export type CreatedWarehouseResponse = {
  id: number;
  name: string;
  location: string;
  maxCapacity: number;
  currentCapacity: number;
  createdDate: Date;
};
