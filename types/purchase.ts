export interface Purchase {
  id: string;
  name: string;
  amount: number;
  dateOfPurchase: string; // ISO date string
}

export interface PurchaseWithDuration extends Purchase {
  duration: {
    years: number;
    months: number;
    days: number;
  };
}
