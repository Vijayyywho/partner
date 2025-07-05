import React from 'react';
import { User, UserRole, ClientData, ProjectStatus, TaskStatus, TicketStatus, Service, AddOnRequest, ApprovalStatus } from './types';
import { DesignIcon, DroneIcon, MarketingIcon, PhotoIcon, UploadIcon, VideoIcon } from './components/icons';

// --- USER AUTHENTICATION ---
export const MOCK_USERS: User[] = [
  { id: 'admin-01', email: 'admin@kpm.com', name: 'KPM Admin', role: UserRole.Admin },
  { id: 'client-01', email: 'client@example.com', name: 'Rajesh', role: UserRole.Client, clientDataId: 'c1' },
  { id: 'client-02', email: 'jane@acme.com', name: 'Jane Doe', role: UserRole.Client, clientDataId: 'c2' },
];

// --- PENDING APPROVALS ---
export const MOCK_APPROVAL_REQUESTS: AddOnRequest[] = [
    {
        id: 'req-01',
        clientId: 'c2',
        clientName: 'Jane Doe',
        clientCompany: 'Acme Corp',
        requestedItems: [
            { service: { id: 's5', name: 'Photoshoot', icon: PhotoIcon, description: "On-location professional photography.", rate: 4000, unit: 'Day' }, quantity: 1 },
            { service: { id: 's6', name: 'Videography', icon: VideoIcon, description: "On-location professional videography.", rate: 6000, unit: 'Day' }, quantity: 1 },
        ],
        totalAmount: 10000,
        status: ApprovalStatus.Pending,
        requestDate: new Date('2024-06-18T10:00:00Z').toISOString()
    }
];


// --- ALL CLIENT DATA ---
export const MOCK_CLIENTS_DATA: ClientData[] = [
  // Client 1: Kumar Real Estate
  {
    id: 'c1',
    clientInfo: { name: "Rajesh", company: "Kumar Real Estate" },
    projectStatus: ProjectStatus.Running,
    contract: {
      planName: "Premium Marketing Package",
      startDate: "2023-11-15",
      endDate: "2024-08-15",
      services: [
          "Social Media Management (10 Posts/month)",
          "Reels Creation & Editing (10 Reels/month)",
          "Story Management (15 Stories/month)",
          "Performance Marketing Campaigns",
          "Monthly Analytics Reports",
          "WhatsApp Support",
          "Dedicated Account Manager"
        ],
      monthlyDeliverables: { posts: 10, reels: 10, stories: 15 },
      paymentStatus: "Paid",
      totalAddOnCharges: 450,
    },
    kpi: { leadsGenerated: 45, adsSpent: 25000, totalReach: 125000, engagement: '8.5%' },
    tasks: [
      { id: 'c1-t1', name: 'June Content Calendar', type: 'Report', status: TaskStatus.Completed, dueDate: '2024-06-05', completedDate: '2024-06-04' },
      { id: 'c1-t2', name: 'Reel: Luxury Villa Tour', type: 'Reel', status: TaskStatus.Completed, dueDate: '2024-06-08', completedDate: '2024-06-07' },
      { id: 'c1-t3', name: 'Facebook Ad Campaign Setup', type: 'Campaign Setup', status: TaskStatus.InProgress, dueDate: '2024-06-15' },
      { id: 'c1-t4', name: 'Post: Behind the Scenes', type: 'Post', status: TaskStatus.Pending, dueDate: '2024-06-22' },
    ],
    deliverablesCompleted: { posts: 7, reels: 8, stories: 12 },
    invoices: [
      { id: 'INV-2023-12', date: 'Dec 1, 2023', amount: 25000, status: 'Paid' },
      { id: 'INV-2023-11', date: 'Nov 1, 2023', amount: 25000, status: 'Paid' },
    ],
    supportTickets: [
      { id: 'TKT-001', subject: 'Social Media Post Approval', date: 'Dec 10, 2023', status: TicketStatus.Resolved },
      { id: 'TKT-002', subject: 'Campaign Performance Query', date: 'Dec 8, 2023', status: TicketStatus.InProgress },
    ],
    addOnRequests: [
        {
            id: 'req-c1-01',
            clientId: 'c1',
            clientName: 'Rajesh',
            clientCompany: 'Kumar Real Estate',
            requestedItems: [{ service: { id: 's3', name: 'Graphic Designing', icon: DesignIcon, description: "Custom graphic design for your brand.", rate: 450, unit: 'Creative' }, quantity: 1 }],
            totalAmount: 450,
            status: ApprovalStatus.Approved,
            requestDate: new Date('2024-05-20T14:00:00Z').toISOString()
        }
    ]
  },
  // Client 2: Acme Corp
  {
    id: 'c2',
    clientInfo: { name: "Jane Doe", company: "Acme Corp" },
    projectStatus: ProjectStatus.RenewalDue,
    contract: {
      planName: "Standard Growth Package",
      startDate: "2024-01-20",
      endDate: "2024-07-20",
      services: [
          "Social Media Management (8 Posts/month)",
          "Reels Creation & Editing (4 Reels/month)",
          "Monthly Analytics Reports",
          "Email Support",
        ],
      monthlyDeliverables: { posts: 8, reels: 4, stories: 10 },
      paymentStatus: "Paid",
      totalAddOnCharges: 0,
    },
    kpi: { leadsGenerated: 22, adsSpent: 15000, totalReach: 88000, engagement: '6.2%' },
    tasks: [
      { id: 'c2-t1', name: 'Q2 Strategy Review', type: 'Report', status: TaskStatus.Completed, dueDate: '2024-06-01', completedDate: '2024-06-01' },
      { id: 'c2-t2', name: 'Post: Product Launch', type: 'Post', status: TaskStatus.InProgress, dueDate: '2024-06-18' },
      { id: 'c2-t3', name: 'Reel: How-to Guide', type: 'Reel', status: TaskStatus.Pending, dueDate: '2024-06-25' },
    ],
    deliverablesCompleted: { posts: 4, reels: 2, stories: 5 },
    invoices: [
      { id: 'ACME-06', date: 'Jun 1, 2024', amount: 18000, status: 'Paid' },
      { id: 'ACME-05', date: 'May 1, 2024', amount: 18000, status: 'Paid' },
    ],
    supportTickets: [
      { id: 'ACME-T1', subject: 'Request for new ad creative', date: 'June 5, 2024', status: TicketStatus.Pending },
    ],
    addOnRequests: [
        {
            id: 'req-01',
            clientId: 'c2',
            clientName: 'Jane Doe',
            clientCompany: 'Acme Corp',
            requestedItems: [
                { service: { id: 's5', name: 'Photoshoot', icon: PhotoIcon, description: "On-location professional photography.", rate: 4000, unit: 'Day' }, quantity: 1 },
                { service: { id: 's6', name: 'Videography', icon: VideoIcon, description: "On-location professional videography.", rate: 6000, unit: 'Day' }, quantity: 1 },
            ],
            totalAmount: 10000,
            status: ApprovalStatus.Pending,
            requestDate: new Date('2024-06-18T10:00:00Z').toISOString()
        }
    ]
  },
];


// --- SHARED DATA ---
export const MOCK_SERVICES: Service[] = [
    { id: 's1', name: 'Social Media Upload', icon: UploadIcon, description: "Per creative upload to your social media profiles.", rate: 200, unit: 'Creative' },
    { id: 's2', name: 'Performance Marketing', icon: MarketingIcon, description: "Full campaign setup and management.", rate: 12000, unit: 'Fixed' },
    { id: 's3', name: 'Graphic Designing', icon: DesignIcon, description: "Custom graphic design for your brand.", rate: 450, unit: 'Creative' },
    { id: 's4', name: 'Reels / Video Editing', icon: VideoIcon, description: "Professional editing for short-form video.", rate: 650, unit: 'Reel' },
    { id: 's5', name: 'Photoshoot', icon: PhotoIcon, description: "On-location professional photography.", rate: 4000, unit: 'Day' },
    { id: 's6', name: 'Videography', icon: VideoIcon, description: "On-location professional videography.", rate: 6000, unit: 'Day' },
    { id: 's7', name: 'Drone Shoot', icon: DroneIcon, description: "Aerial footage for stunning visuals.", rate: 12000, unit: 'Day' },
];

export const MOCK_RENEWAL_PLANS = [
    { name: 'Monthly', price: 25000, highlighted: false },
    { name: 'Quarterly', price: 67500, saving: 'Save 10%', highlighted: true },
    { name: 'Yearly', price: 240000, saving: 'Save 20%', highlighted: false },
];