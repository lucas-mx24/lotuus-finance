import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

/**
 * Admin Stats API - Queries Supabase for real platform metrics.
 * Returns user counts, transaction summaries, and asset totals.
 */
export async function GET() {
    try {
        const supabase = await createClient()

        // 1. Get current authenticated user (admin check)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Query transactions table
        const { data: transactions, error: txError } = await supabase
            .from('transactions')
            .select('*')
            .order('date', { ascending: false })

        // 3. Query assets/investments table
        const { data: assets, error: assetError } = await supabase
            .from('assets')
            .select('*')

        // 4. Query fire_goals table
        const { data: fireGoals, error: fireError } = await supabase
            .from('fire_goals')
            .select('*')

        // Build stats response
        const totalTransactions = transactions?.length || 0
        const totalAssets = assets?.length || 0

        // Calculate total invested
        const totalInvested = assets?.reduce((sum, a) => sum + (a.total_invested || a.value || 0), 0) || 0

        // Calculate total income/expense from transactions
        const totalIncome = transactions
            ?.filter((t) => t.type === 'income' || t.type === 'receita')
            .reduce((sum, t) => sum + (t.amount || t.value || 0), 0) || 0

        const totalExpense = transactions
            ?.filter((t) => t.type === 'expense' || t.type === 'despesa')
            .reduce((sum, t) => sum + Math.abs(t.amount || t.value || 0), 0) || 0

        // Recent transactions (last 5)
        const recentTransactions = (transactions || []).slice(0, 5).map((t) => ({
            id: t.id,
            description: t.description || t.name || 'Transaction',
            amount: t.amount || t.value || 0,
            type: t.type,
            date: t.date || t.created_at,
            category: t.category || 'General',
        }))

        return NextResponse.json({
            connected: true,
            tables: {
                transactions: !txError,
                assets: !assetError,
                fire_goals: !fireError,
            },
            stats: {
                totalTransactions,
                totalAssets,
                totalInvested,
                totalIncome,
                totalExpense,
                netBalance: totalIncome - totalExpense,
            },
            recentTransactions,
            assets: (assets || []).map((a) => ({
                id: a.id,
                name: a.name || a.ticker || 'Asset',
                type: a.type || a.asset_type || 'Other',
                value: a.total_invested || a.value || 0,
            })),
            fireGoals: (fireGoals || []).map((g) => ({
                id: g.id,
                target: g.target_amount || g.monthly_goal || 0,
                current: g.current_amount || 0,
            })),
            user: {
                email: user.email,
                id: user.id,
                created_at: user.created_at,
            },
            errors: {
                transactions: txError?.message || null,
                assets: assetError?.message || null,
                fireGoals: fireError?.message || null,
            },
        })
    } catch (error) {
        return NextResponse.json({
            connected: false,
            error: 'Failed to connect to database',
            detail: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
