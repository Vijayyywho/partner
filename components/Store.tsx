import React from 'react';
import { Service } from '../types';
import { AddIcon } from './icons';

interface StoreProps {
  services: Service[];
  onAddToCart: (service: Service) => void;
}

const ServiceCard: React.FC<{ service: Service; onAddToCart: (service: Service) => void; }> = ({ service, onAddToCart }) => {
  const { icon: Icon } = service;
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="flex-1 mb-4">
        <div className="flex items-center space-x-4 mb-3">
            <div className="p-3 bg-cyan-100 rounded-full text-cyan-600">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#233D5B]">{service.name}</h3>
        </div>
        <p className="text-slate-500 text-sm mb-4">{service.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-slate-800">
          ₹{service.rate.toLocaleString('en-IN')}
          <span className="text-sm font-normal text-slate-500"> / {service.unit}</span>
        </p>
        <button 
          onClick={() => onAddToCart(service)}
          className="flex items-center justify-center px-4 py-2 bg-cyan-50 text-cyan-700 font-semibold rounded-lg hover:bg-cyan-100 transition-colors"
        >
          <AddIcon className="w-5 h-5 mr-1" />
          Add
        </button>
      </div>
    </div>
  );
};

const Store: React.FC<StoreProps> = ({ services, onAddToCart }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#233D5B]">Add-On Services</h1>
        <p className="text-slate-500">Enhance your project with our on-demand services.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Store;