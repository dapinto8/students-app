export type OrderConcept = 'MONTHLY';
export type OrderStatus = 'DUE' | 'PAID' | 'OUTSTANDING';

export class Order {
  id: string;
  concept: OrderConcept;
  name: string;
  price: number;
  priceCurrency: string;
  due: Date;
  status: OrderStatus;
  interest: number;
  payin: {
    id: string;
    created: Date;
  };

  constructor(data: any) {
    this.id = data.id;
    this.concept = data.concept;
    this.name = data.name;
    this.price = data.price;
    this.priceCurrency = data.price_currency;
    this.due = data.due;
    this.status = data.status;
    this.interest = data.interest;
    this.payin = data.payin;
  }
}
