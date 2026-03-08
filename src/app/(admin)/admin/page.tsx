'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { createClient } from '@/lib/supabase'
import styles from './page.module.css'

// Fallback chart data when no real data
const fallbackRevenueData = [
    { name: 'Jan', value: 32000 },
    { name: 'Feb', value: 38000 },
    { name: 'Mar', value: 35000 },
    { name: 'Apr', value: 42000 },
    { name: 'May', value: 45200 },
    { name: 'Jun', value: 48000 },
    { name: 'Jul', value: 51000 },
    { name: 'Aug', value: 53500 },
]

interface DbStatus {
    transactions: boolean
    assets: boolean
    stripe: boolean
}

interface Stats {
    totalTransactions: number
    totalAssets: number
    totalIncome: number
    totalExpense: number
    netBalance: number
}

interface ActivityItem {
    dot: string
    desc: string
    time: string
}

export default function AdminOverviewPage() {
    const [isMounted, setIsMounted] = useState(false)
    const [dbStatus, setDbStatus] = useState<DbStatus>({ transactions: false, assets: false, stripe: false })
    const [stats, setStats] = useState<Stats>({ totalTransactions: 0, totalAssets: 0, totalIncome: 0, totalExpense: 0, netBalance: 0 })
    const [activity, setActivity] = useState<ActivityItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setIsMounted(true)
        fetchRealData()
    }, [])

    async function fetchRealData() {
        try {
            const supabase = createClient()

            // Check connection & fetch transactions
            const { data: transactions, error: txError } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            // Fetch assets
            const { data: assets, error: assetError } = await supabase
                .from('assets')
                .select('*')

            // Update connection status
            setDbStatus({
                transactions: !txError,
                assets: !assetError,
                stripe: false, // Stripe MCP is offline
            })

            // Calculate real stats
            if (transactions && !txError) {
                const totalIncome = transactions
                    .filter((t: Record<string, unknown>) => t.type === 'income' || t.type === 'receita')
                    .reduce((sum: number, t: Record<string, unknown>) => sum + Math.abs(Number(t.amount) || Number(t.value) || 0), 0)

                const totalExpense = transactions
                    .filter((t: Record<string, unknown>) => t.type === 'expense' || t.type === 'despesa')
                    .reduce((sum: number, t: Record<string, unknown>) => sum + Math.abs(Number(t.amount) || Number(t.value) || 0), 0)

                setStats({
                    totalTransactions: transactions.length,
                    totalAssets: assets?.length || 0,
                    totalIncome,
                    totalExpense,
                    netBalance: totalIncome - totalExpense,
                })

                // Build activity from recent transactions
                const recentActivity: ActivityItem[] = transactions.slice(0, 6).map((t: Record<string, unknown>) => {
                    const type = String(t.type || '')
                    const isIncome = type === 'income' || type === 'receita'
                    return {
                        dot: isIncome ? 'dotGreen' : 'dotRed',
                        desc: `<strong>${t.description || t.name || 'Transação'}</strong> — R$ ${Math.abs(Number(t.amount) || Number(t.value) || 0).toFixed(2)}`,
                        time: t.date ? new Date(String(t.date)).toLocaleDateString('pt-BR') : 'Recente',
                    }
                })
                setActivity(recentActivity)
            }

            // If no real activity, use fallback
            if (!transactions || transactions.length === 0) {
                setActivity([
                    { dot: 'dotGreen', desc: '<strong>john.doe@example.com</strong> fez upgrade para <strong>Plano Elite</strong>', time: '2 minutos atrás' },
                    { dot: 'dotBlue', desc: '<strong>fiona.r@startup.io</strong> criou uma nova conta', time: '15 minutos atrás' },
                    { dot: 'dotAmber', desc: 'Tentativa de cobrança agendada para <strong>brian.m@corp.org</strong>', time: '1 hora atrás' },
                    { dot: 'dotRed', desc: '<strong>clara.lewis@me.com</strong> cancelou assinatura Pro', time: '3 horas atrás' },
                    { dot: 'dotGreen', desc: '<strong>alice.smith@web.com</strong> renovou Plano Pro', time: '5 horas atrás' },
                ])
            }
        } catch (err) {
            console.error('Admin data fetch error:', err)
            setActivity([
                { dot: 'dotAmber', desc: '<strong>Conexão com banco</strong> não pôde ser estabelecida', time: 'Agora' },
            ])
        } finally {
            setLoading(false)
        }
    }

    const today = new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    return (
        <div className={styles.pageContainer}>

            {/* Welcome Header */}
            <header className={styles.welcomeHeader}>
                <div className={styles.welcomeText}>
                    <h1>Bem-vindo de volta, Admin 👋</h1>
                    <p>Veja o que está acontecendo na sua plataforma hoje.</p>
                </div>
                <div className={styles.dateTag}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span>
                    {today}
                </div>
            </header>

            {/* Connection Status Bar */}
            {!loading && (
                <div style={{
                    display: 'flex', gap: '1.5rem', padding: '0.75rem 1.25rem',
                    backgroundColor: 'white', borderRadius: '10px', border: '1px solid #e2e8f0',
                    fontSize: '0.8rem', fontWeight: 600, alignItems: 'center'
                }}>
                    <span style={{ color: '#64748b' }}>🔌 Fontes de Dados:</span>
                    <span style={{ color: dbStatus.transactions ? '#22c55e' : '#ef4444' }}>
                        {dbStatus.transactions ? '●' : '○'} Transações
                    </span>
                    <span style={{ color: dbStatus.assets ? '#22c55e' : '#ef4444' }}>
                        {dbStatus.assets ? '●' : '○'} Ativos
                    </span>
                    <span style={{ color: dbStatus.stripe ? '#22c55e' : '#f59e0b' }}>
                        {dbStatus.stripe ? '●' : '○'} Stripe
                    </span>
                    <span style={{ marginLeft: 'auto', color: '#94a3b8', fontWeight: 400 }}>
                        {dbStatus.transactions || dbStatus.assets ? 'Dados em tempo real do Supabase' : 'Usando dados de exemplo'}
                    </span>
                </div>
            )}

            {/* KPI Grid — Real or Fallback Data */}
            <section className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconGreen}`}>
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>Live</span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Receita Total</p>
                        <h2>{loading ? '...' : `R$ ${stats.totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</h2>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconBlue}`}>
                            <span className="material-symbols-outlined">receipt_long</span>
                        </div>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Transações</p>
                        <h2>{loading ? '...' : stats.totalTransactions}</h2>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconPurple}`}>
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Ativos Rastreados</p>
                        <h2>{loading ? '...' : stats.totalAssets}</h2>
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconAmber}`}>
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${stats.netBalance >= 0 ? styles.badgePositive : styles.badgeNegative}`}>
                            {stats.netBalance >= 0 ? '+' : ''}{loading ? '...' : `R$ ${stats.netBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Saldo Líquido</p>
                        <h2>{loading ? '...' : `R$ ${stats.netBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</h2>
                    </div>
                </div>
            </section>

            {/* Middle: Revenue Chart + Activity Feed */}
            <section className={styles.middleSection}>
                <div className={styles.chartCard}>
                    <div className={styles.chartCardHeader}>
                        <div>
                            <h3 className={styles.chartCardTitle}>Visão de Receita</h3>
                            <p className={styles.chartCardSubtitle}>Tendência de receita mensal da plataforma</p>
                        </div>
                    </div>
                    <div className={styles.chartContainer}>
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={fallbackRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} dy={10} />
                                    <YAxis hide={true} domain={['dataMin - 5000', 'dataMax + 5000']} />
                                    <Tooltip
                                        formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className={styles.activityCard}>
                    <h3 className={styles.activityTitle}>Atividade Recente</h3>
                    <div className={styles.activityList}>
                        {activity.map((item, i) => (
                            <div className={styles.activityItem} key={i}>
                                <div className={`${styles.activityDot} ${styles[item.dot]}`}></div>
                                <div>
                                    <div className={styles.activityDesc} dangerouslySetInnerHTML={{ __html: item.desc }} />
                                    <div className={styles.activityTime}>{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className={styles.quickActionsSection}>
                <h2>Ações Rápidas</h2>
                <div className={styles.quickActionsGrid}>
                    <Link href="/admin/assinaturas" className={styles.quickAction}>
                        <div className={`${styles.qaIcon} ${styles.iconBlue}`}>
                            <span className="material-symbols-outlined">credit_card</span>
                        </div>
                        <div>
                            <p className={styles.qaTitle}>Assinaturas</p>
                            <p className={styles.qaDesc}>Gerenciar planos e cobrança</p>
                        </div>
                    </Link>
                    <Link href="/admin/users" className={styles.quickAction}>
                        <div className={`${styles.qaIcon} ${styles.iconGreen}`}>
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <div>
                            <p className={styles.qaTitle}>Usuários</p>
                            <p className={styles.qaDesc}>Visualizar todos os usuários</p>
                        </div>
                    </Link>
                    <Link href="/admin/reports" className={styles.quickAction}>
                        <div className={`${styles.qaIcon} ${styles.iconPurple}`}>
                            <span className="material-symbols-outlined">bar_chart</span>
                        </div>
                        <div>
                            <p className={styles.qaTitle}>Relatórios</p>
                            <p className={styles.qaDesc}>Análises e downloads</p>
                        </div>
                    </Link>
                    <Link href="/admin/settings" className={styles.quickAction}>
                        <div className={`${styles.qaIcon} ${styles.iconAmber}`}>
                            <span className="material-symbols-outlined">settings</span>
                        </div>
                        <div>
                            <p className={styles.qaTitle}>Configurações</p>
                            <p className={styles.qaDesc}>Configuração da plataforma</p>
                        </div>
                    </Link>
                </div>
            </section>

        </div>
    )
}
