import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Purchase } from '@/types/purchase';

const dataFilePath = path.join(process.cwd(), 'data', 'purchases.json');

// GET all purchases
export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const purchases: Purchase[] = JSON.parse(fileContents);
    return NextResponse.json(purchases);
  } catch (error) {
    console.error('Error reading purchases:', error);
    return NextResponse.json({ error: 'Failed to read purchases' }, { status: 500 });
  }
}

// POST create new purchase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, amount, dateOfPurchase } = body;

    if (!name || !amount || !dateOfPurchase) {
      return NextResponse.json(
        { error: 'Missing required fields: name, amount, dateOfPurchase' },
        { status: 400 }
      );
    }

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const purchases: Purchase[] = JSON.parse(fileContents);

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
      dateOfPurchase,
    };

    purchases.push(newPurchase);
    await fs.writeFile(dataFilePath, JSON.stringify(purchases, null, 2));

    return NextResponse.json(newPurchase, { status: 201 });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
  }
}
