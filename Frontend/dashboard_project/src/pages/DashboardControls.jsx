import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Default state values
const DEFAULT_STATE = {
  header: {
    title: 'Welcome to My Dashboard',
    imageUrl: ''
  },
  navbar: {
    links: [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about' },
      { label: 'Contact', url: '/contact' }
    ]
  },
  footer: {
    email: 'contact@example.com',
    phone: '+1234567890',
    address: '123 Main St, City'
  }
};

export default function Dashboard() {
  // Initialize state with proper defaults and null checks
  const [components, setComponents] = useState(() => {
    try {
      const savedData = localStorage.getItem('dashboardData');
      return savedData ? JSON.parse(savedData) : DEFAULT_STATE;
    } catch (error) {
      console.error('Error loading saved data:', error);
      return DEFAULT_STATE;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Safely update components state
  const updateComponents = (updater) => {
    setComponents(prev => {
      const currentState = prev || DEFAULT_STATE;
      const updated = typeof updater === 'function' 
        ? updater(currentState) 
        : updater;
      return { ...DEFAULT_STATE, ...currentState, ...updated };
    });
  };

  // Handler functions with null checks
  const handleHeaderUpdate = (newHeader) => {
    updateComponents(prev => ({
      ...prev,
      header: { ...(prev?.header || {}), ...newHeader }
    }));
  };

  const handleNavbarUpdate = (index, field, value) => {
    updateComponents(prev => {
      const currentLinks = prev?.navbar?.links || DEFAULT_STATE.navbar.links;
      const newLinks = [...currentLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prev,
        navbar: {
          ...(prev?.navbar || {}),
          links: newLinks
        }
      };
    });
  };

  const handleFooterUpdate = (field, value) => {
    updateComponents(prev => ({
      ...prev,
      footer: { ...(prev?.footer || {}), [field]: value }
    }));
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dashboardData', JSON.stringify(components));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [components]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // Destructure with fallbacks to prevent undefined errors
  const { 
    header = DEFAULT_STATE.header, 
    navbar = DEFAULT_STATE.navbar, 
    footer = DEFAULT_STATE.footer 
  } = components || {};

  return (
    <div className="min-h-screen flex flex-col bg-blue-300 w-screen">
      <Header 
        title={header.title} 
        imageUrl={header.imageUrl} 
        onUpdate={handleHeaderUpdate} 
      />
      
      <Navbar 
        links={navbar.links} 
        onUpdate={handleNavbarUpdate} 
      />
      
      <main className="flex-grow p-6 container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">Dashboard Controls</h2>
        
        {/* Header Controls */}
        <section className="mb-8 p-4 bg-blue-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Header Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={header.title}
                onChange={(e) => handleHeaderUpdate({ title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        {/* Navbar Controls */}
        <section className="mb-8 p-4 bg-blue-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Navigation Links</h3>
          <div className="space-y-4">
            {navbar.links.map((link, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <label className="block text-sm font-medium mb-1">Link {index + 1} Label</label>
                  <input
                    type="text"
                    value={link?.label || ''}
                    onChange={(e) => handleNavbarUpdate(index, 'label', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Link {index + 1} URL</label>
                  <input
                    type="text"
                    value={link?.url || ''}
                    onChange={(e) => handleNavbarUpdate(index, 'url', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Controls */}
        <section className="mb-8 p-4 bg-blue-800 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 ">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={footer.email}
                onChange={(e) => handleFooterUpdate('email', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={footer.phone}
                onChange={(e) => handleFooterUpdate('phone', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={footer.address}
                onChange={(e) => handleFooterUpdate('address', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer 
        contact={footer} 
        onUpdate={handleFooterUpdate} 
      />
    </div>
  );
}