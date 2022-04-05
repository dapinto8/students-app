import { Guardian } from './guardian.model';
import { School } from './school.model';

export class Student {
  id: string;
  firstName: string;
  lastName: string;
  guardian: Guardian;
  cohort: string;
  school: School;
  monthlyGrantType: null;
  monthlyGrantValue: null;
  inscriptionGrantValue: null;
  inscriptionGrantType: null;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.guardian = new Guardian(data.guardian);
    this.cohort = data.cohort;
    this.school = new School(data.school);
    this.monthlyGrantType = data.monthly_grant_type;
    this.monthlyGrantValue = data.monthly_grant_value;
    this.inscriptionGrantValue = data.inscription_grant_value;
    this.inscriptionGrantType = data.inscription_grant_type;
  }
}
