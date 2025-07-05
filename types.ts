import { ComponentType } from 'react';

export enum View {
  Dashboard = "Dashboard",
  Progress = "Progress",
  Contract = "Contract",
  Payments = "Payments",
  Support = "Support",
  Store = "Add-Ons",
}

export enum AdminView {
  Clients = "Clients",
  Approvals = "Approvals",
  Settings = "Settings",
}

export enum UserRole {
  Admin = "Admin",
  Client = "Client",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clientDataId?: string; // Associates a client user with their specific data
}

export interface Client {
  name: string;
  company: string;
}

export enum ProjectStatus {
  Running = "Running",
  Paused = "Paused",
  RenewalDue = "Renewal Due Soon",
  Completed = "Completed",
}

export interface Contract {
  planName: string;
  startDate: string;
  endDate: string;
  services: string[];
  monthlyDeliverables: {
    posts: number;
    reels: number;
    stories: number;
  };
  paymentStatus: "Paid" | "Unpaid";
  totalAddOnCharges: number;
}

export interface Kpi {
  leadsGenerated: number;
  adsSpent: number;
  totalReach: number;
  engagement: string;
}

export enum TaskStatus {
  Completed = "Completed",
  InProgress = "In Progress",
  Pending = "Pending",
}

export interface Task {
  id: string;
  name: string;
  type: "Post" | "Reel" | "Campaign Setup" | "Report";
  status: TaskStatus;
  dueDate: string;
  completedDate?: string;
}

export interface Service {
  id: string;
  name: string;
  icon: ComponentType<{ className?: string }>;
  description: string;
  rate: number;
  unit: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending';
}

export interface RenewalPlan {
    name: string;
    price: number;
    saving?: string;
    highlighted: boolean;
}

export enum TicketStatus {
    Resolved = 'Resolved',
    InProgress = 'In Progress',
    Pending = 'Pending'
}

export interface SupportTicket {
    id: string;
    subject: string;
    date: string;
    status: TicketStatus;
}

export enum ApprovalStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

export interface AddOnRequest {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  requestedItems: CartItem[];
  totalAmount: number;
  status: ApprovalStatus;
  requestDate: string;
}


// A new structure to hold all data for a single client
export interface ClientData {
  id: string;
  clientInfo: Client;
  contract: Contract;
  kpi: Kpi;
  tasks: Task[];
  deliverablesCompleted: { posts: number; reels: number; stories: number; };
  invoices: Invoice[];
  supportTickets: SupportTicket[];
  projectStatus: ProjectStatus;
  addOnRequests: AddOnRequest[];
}

export type DeliverableType = 'posts' | 'reels' | 'stories';