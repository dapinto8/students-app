import { HttpClient } from '@core/interfaces/http-client.interface';
import { Order } from '@core/models/order.model';
import { Student } from '@core/models/student.model';

export class StudentService {
  constructor(private http: HttpClient) {}

  async getStudents(): Promise<Student[]> {
    const { data } = await this.http.get(`/v1/students`);
    const students = data.map((student: any) => new Student(student));
    return students;
  }

  async getStudent(id: string): Promise<Student> {
    const { data } = await this.http.get(`/v1/students/${id}`);
    return new Student(data);
  }

  async getStudentOrders(id: string): Promise<Order[]> {
    const { data } = await this.http.get(`/v1/students/${id}/orders`);
    const orders = data.map((order: any) => new Order(order));
    return orders;
  }
}
