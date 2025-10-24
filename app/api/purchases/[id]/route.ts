import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

// GET single purchase by ID (user can only get their own purchases)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // RLS policies will automatically filter by user_id
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    // Transform database response to match frontend format
    const purchase = {
      id: data.id,
      name: data.name,
      amount: parseFloat(data.amount),
      dateOfPurchase: data.date_of_purchase,
    };

    return NextResponse.json(purchase);
  } catch (error) {
    console.error('Error reading purchase:', error);
    return NextResponse.json({ error: 'Failed to read purchase' }, { status: 500 });
  }
}

// PUT update purchase by ID (user can only update their own purchases)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, amount, dateOfPurchase } = body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (dateOfPurchase) updateData.date_of_purchase = dateOfPurchase;

    // RLS policies will automatically ensure user can only update their own purchases
    const { data, error } = await supabase
      .from('purchases')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Purchase not found or unauthorized' }, { status: 404 });
    }

    // Transform database response to match frontend format
    const updatedPurchase = {
      id: data.id,
      name: data.name,
      amount: parseFloat(data.amount),
      dateOfPurchase: data.date_of_purchase,
    };

    return NextResponse.json(updatedPurchase);
  } catch (error) {
    console.error('Error updating purchase:', error);
    return NextResponse.json({ error: 'Failed to update purchase' }, { status: 500 });
  }
}

// DELETE purchase by ID (user can only delete their own purchases)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // RLS policies will automatically ensure user can only delete their own purchases
    const { error } = await supabase
      .from('purchases')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Purchase not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    return NextResponse.json({ error: 'Failed to delete purchase' }, { status: 500 });
  }
}
