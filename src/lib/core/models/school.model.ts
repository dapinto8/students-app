export class School {
  id: string;
  name: string;
  logo: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.logo = data.logo;
    this.country = data.country;
    this.city = data.city;
    this.address = data.address;
    this.zipCode = data.zip_code;
  }
}
