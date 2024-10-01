export interface UserDB {
  id: number;
  name: string;
  department: string;
  password: string;
  age: string;
  avatar: string;
  email: string;
  sign: string;
}
export interface partDB {
  id: number;
  Part_No: number;
  name: string;
  manufacturingDate: Date;
  openingShots: number;
  totalShots: number;
  customerName: object;
  historyOfPart: object;
  avgMeantimeBWFailure: number;
  totalCost: number;
}
