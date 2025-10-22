'use client';

import { PurchaseWithDuration } from '@/types/purchase';
import { formatDuration } from '@/lib/duration';

interface PurchaseModalProps {
  purchase: PurchaseWithDuration;
  onClose: () => void;
}

export default function PurchaseModal({ purchase, onClose }: PurchaseModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Purchase Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Item Name
            </label>
            <p className="text-lg font-semibold">{purchase.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Amount
            </label>
            <p className="text-lg font-semibold">${purchase.amount.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Date of Purchase
            </label>
            <p className="text-lg font-semibold">
              {new Date(purchase.dateOfPurchase).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Age of Item
            </label>
            <p className="text-lg font-semibold">{formatDuration(purchase.duration)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {purchase.duration.years} years, {purchase.duration.months} months,{' '}
              {purchase.duration.days} days
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
