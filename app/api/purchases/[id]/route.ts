import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Purchase } from '@/types/purchase';

const dataFilePath = path.join(process.cwd(), 'data', 'purchases.json');

// GET single purchase by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const purchases: Purchase[] = JSON.parse(fileContents);
    const purchase = purchases.find((p) => p.id === id);

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    return NextResponse.json(purchase);
  } catch (error) {
    console.error('Error reading purchase:', error);
    return NextResponse.json({ error: 'Failed to read purchase' }, { status: 500 });
  }
}

// PUT update purchase by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, amount, dateOfPurchase } = body;

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const purchases: Purchase[] = JSON.parse(fileContents);
    const index = purchases.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    purchases[index] = {
      ...purchases[index],
      name: name || purchases[index].name,
      amount: amount !== undefined ? parseFloat(amount) : purchases[index].amount,
      dateOfPurchase: dateOfPurchase || purchases[index].dateOfPurchase,
    };

    await fs.writeFile(dataFilePath, JSON.stringify(purchases, null, 2));

    return NextResponse.json(purchases[index]);
  } catch (error) {
    console.error('Error updating purchase:', error);
    return NextResponse.json({ error: 'Failed to update purchase' }, { status: 500 });
  }
}

// DELETE purchase by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const purchases: Purchase[] = JSON.parse(fileContents);
    const filteredPurchases = purchases.filter((p) => p.id !== id);

    if (filteredPurchases.length === purchases.length) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(filteredPurchases, null, 2));

    return NextResponse.json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    return NextResponse.json({ error: 'Failed to delete purchase' }, { status: 500 });
  }
}
