'use client';

import { useState, useEffect } from 'react';
import { Purchase } from '@/types/purchase';

interface PurchaseFormProps {
  purchase: Purchase | null;
  onSubmit: (data: Omit<Purchase, 'id'>) => void;
  onClose: () => void;
}

export default function PurchaseForm({ purchase, onSubmit, onClose }: PurchaseFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dateOfPurchase: '',
  });

  useEffect(() => {
    if (purchase) {
      setFormData({
        name: purchase.name,
        amount: purchase.amount.toString(),
        dateOfPurchase: purchase.dateOfPurchase,
      });
    }
  }, [purchase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      amount: parseFloat(formData.amount),
      dateOfPurchase: formData.dateOfPurchase,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">
          {purchase ? 'Edit Purchase' : 'Add New Purchase'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter item name"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              required
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label htmlFor="dateOfPurchase" className="block text-sm font-medium mb-2">
              Date of Purchase
            </label>
            <input
              type="date"
              id="dateOfPurchase"
              required
              value={formData.dateOfPurchase}
              onChange={(e) => setFormData({ ...formData, dateOfPurchase: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              {purchase ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
