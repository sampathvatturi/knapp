export interface InvoicesModel {
  invoice_details_id: number;
  invoice_item: string;
  quantity: number;
  amount: number;
  trnsx_type: string;
  tax: number;
  total: number;
  created_date: Date;
  created_by:number;
  update_date: Date;
  update_by: number;
}
