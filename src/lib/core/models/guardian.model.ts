export class Guardian {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  taxId: string;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.email = data.email;
    this.phone = data.phone;
    this.taxId = data.tax_id;
  }
}
