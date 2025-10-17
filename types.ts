
import { LucideIcon } from 'lucide-react';

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface AppInfo {
  id: string;
  name: string;
  Icon: LucideIcon;
  isEssential: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  avatarUrl: string;
}
