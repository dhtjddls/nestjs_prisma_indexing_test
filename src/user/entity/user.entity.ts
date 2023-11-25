import { MOCK_DATA } from '@prisma/client';
export class user implements MOCK_DATA {
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  ip_address: string;
  id: number;
}
