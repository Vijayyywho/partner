import React from 'react';
import { SupportTicket, TicketStatus } from '../types';
import { ChevronDownIcon, ClockIcon, MailIcon, PhoneIcon } from './icons';

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
        <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-bold text-[#233D5B]">{title}</h2>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const TicketStatusBadge: React.FC<{ status: TicketStatus }> = ({ status }) => {
    const styles: Record<TicketStatus, string> = {
        [TicketStatus.Resolved]: 'bg-green-100 text-green-700',
        [TicketStatus.InProgress]: 'bg-blue-100 text-blue-700',
        [TicketStatus.Pending]: 'bg-amber-100 text-amber-700',
    };
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
            {status}
        </span>
    );
};

const Support: React.FC<{ tickets: SupportTicket[] }> = ({ tickets }) => {
    const whatsappMessage = encodeURIComponent("Hi KPM Team, I need help with...");
    const whatsappLink = `https://wa.me/919876543210?text=${whatsappMessage}`; // Replace with actual number

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Support Center</h1>
        <p className="text-slate-500">We're here to help. Get in touch or track your requests.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card title="Create Support Ticket">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
                        <input type="text" id="subject" className="w-full p-2 border border-slate-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" placeholder="Brief description of your issue" />
                    </div>
                     <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                        <div className="relative">
                            <select id="priority" className="w-full p-2 border border-slate-300 rounded-md appearance-none focus:ring-cyan-500 focus:border-cyan-500 bg-white">
                                <option>Medium</option>
                                <option>High</option>
                                <option>Low</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message *</label>
                        <textarea id="message" rows={4} className="w-full p-2 border border-slate-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500" placeholder="Describe your issue in detail..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-3 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-700">Submit Ticket</button>
                </form>
            </Card>

            <Card title="Recent Tickets">
                <div className="space-y-4">
                    {tickets.map(ticket => (
                        <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-50 rounded-lg">
                            <div>
                                <p className="font-semibold text-slate-800">{ticket.subject}</p>
                                <p className="text-sm text-slate-500 flex items-center"><ClockIcon className="w-4 h-4 mr-1.5"/>{ticket.id} • {ticket.date}</p>
                            </div>
                            <div className="mt-2 sm:mt-0">
                                <TicketStatusBadge status={ticket.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card title="Quick Support">
                <div className="space-y-3">
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-3"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 6.555 0 11.895 5.335 11.895 11.891 0 6.556-5.34 11.89-11.895 11.89-1.995 0-3.888-.521-5.613-1.474l-6.351 1.654z"/></svg>
                        WhatsApp Support
                    </a>
                    <a href="tel:+919876543210" className="w-full flex items-center p-4 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-semibold">
                        <PhoneIcon className="w-5 h-5 mr-3" />
                        Call Support: +91 98765 43210
                    </a>
                    <a href="mailto:support@kpmdigital.com" className="w-full flex items-center p-4 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-semibold">
                        <MailIcon className="w-5 h-5 mr-3"/>
                        Email: support@kpmdigital.com
                    </a>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;