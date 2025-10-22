import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all purchases
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('date_of_purchase', { ascending: false });

    if (error) {
      console.error('Error reading purchases:', error);
      return NextResponse.json({ error: 'Failed to read purchases' }, { status: 500 });
    }

    // Transform database response to match frontend format
    const purchases = data.map((item) => ({
      id: item.id,
      name: item.name,
      amount: parseFloat(item.amount),
      dateOfPurchase: item.date_of_purchase,
    }));

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

    const { data, error } = await supabase
      .from('purchases')
      .insert([
        {
          name,
          amount: parseFloat(amount),
          date_of_purchase: dateOfPurchase,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating purchase:', error);
      return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
    }

    // Transform database response to match frontend format
    const newPurchase = {
      id: data.id,
      name: data.name,
      amount: parseFloat(data.amount),
      dateOfPurchase: data.date_of_purchase,
    };

    return NextResponse.json(newPurchase, { status: 201 });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return NextResponse.json({ error: 'Failed to create purchase' }, { status: 500 });
  }
}
