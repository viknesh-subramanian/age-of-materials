'use client';

import { useState, useEffect } from 'react';
import { Purchase, PurchaseWithDuration } from '@/types/purchase';
import { calculateDuration, formatDuration } from '@/lib/duration';
import PurchaseForm from '@/components/PurchaseForm';
import PurchaseModal from '@/components/PurchaseModal';

export default function Home() {
  const [purchases, setPurchases] = useState<PurchaseWithDuration[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);
  const [viewingPurchase, setViewingPurchase] = useState<PurchaseWithDuration | null>(null);

  // Fetch purchases
  const fetchPurchases = async () => {
    try {
      const response = await fetch('/api/purchases');
      const data: Purchase[] = await response.json();

      const purchasesWithDuration: PurchaseWithDuration[] = data.map((purchase) => ({
        ...purchase,
        duration: calculateDuration(purchase.dateOfPurchase),
      }));

      setPurchases(purchasesWithDuration);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Create purchase
  const handleCreate = async (purchase: Omit<Purchase, 'id'>) => {
    try {
      const response = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        await fetchPurchases();
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
    }
  };

  // Update purchase
  const handleUpdate = async (id: string, purchase: Omit<Purchase, 'id'>) => {
    try {
      const response = await fetch(`/api/purchases/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchase),
      });

      if (response.ok) {
        await fetchPurchases();
        setEditingPurchase(null);
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error('Error updating purchase:', error);
    }
  };

  // Delete purchase
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this purchase?')) {
      return;
    }

    try {
      const response = await fetch(`/api/purchases/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchPurchases();
      }
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  // Open edit form
  const handleEdit = (purchase: Purchase) => {
    setEditingPurchase(purchase);
    setIsFormOpen(true);
  };

  // Open view modal
  const handleView = (purchase: PurchaseWithDuration) => {
    setViewingPurchase(purchase);
    setIsViewModalOpen(true);
  };

  // Open create form
  const handleAddNew = () => {
    setEditingPurchase(null);
    setIsFormOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Purchase Tracker</h1>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Add Purchase
          </button>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No purchases yet. Click &quot;Add Purchase&quot; to get started!
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date of Purchase
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {purchases.map((purchase) => (
                  <tr
                    key={purchase.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => handleView(purchase)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {purchase.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ₹{purchase.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(purchase.dateOfPurchase).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatDuration(purchase.duration)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(purchase);
                        }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(purchase.id);
                        }}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form Modal */}
        {isFormOpen && (
          <PurchaseForm
            purchase={editingPurchase}
            onSubmit={(data) => {
              if (editingPurchase) {
                handleUpdate(editingPurchase.id, data);
              } else {
                handleCreate(data);
              }
            }}
            onClose={() => {
              setIsFormOpen(false);
              setEditingPurchase(null);
            }}
          />
        )}

        {/* View Modal */}
        {isViewModalOpen && viewingPurchase && (
          <PurchaseModal
            purchase={viewingPurchase}
            onClose={() => {
              setIsViewModalOpen(false);
              setViewingPurchase(null);
            }}
          />
        )}
      </div>
    </main>
  );
}
