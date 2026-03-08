'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AddTransactionModal from '@/components/AddTransactionModal'
import styles from "./page.module.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('Investidor')
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0
  })
  const [transactions, setTransactions] = useState<any[]>([])
  const [assets, setAssets] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  const supabase = createClient()

  async function fetchData() {
    setLoading(true)
    // 1. Fetch User Profile
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (profile) setUserName(profile.full_name.split(' ')[0])
    }

    // 2. Fetch Transactions (last 5)
    const { data: transData } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .limit(5)

    if (transData) {
      setTransactions(transData)

      // Calculate monthly stats (simplified)
      const income = transData.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0)
      const expense = transData.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0)
      setStats(prev => ({ ...prev, income, expense }))
    }

    // 3. Fetch Assets
    const { data: assetData } = await supabase
      .from('assets')
      .select('*')

    if (assetData) {
      setAssets(assetData)
      const balance = assetData.reduce((acc, a) => acc + Number(a.value), 0)
      setStats(prev => ({ ...prev, balance }))
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onSave={() => fetchData()}
        />
      )}
      {/* Top Banner / Welcome */}
      <section className={styles.welcomeSection}>
        <div>
          <h2 className={styles.greeting}>Olá, {userName} 👋</h2>
          <p className={styles.subtext}>Seu progresso para a Independência Financeira está conforme o planejado.</p>
        </div>
        <div className={styles.quickActions}>
          <button className={styles.primaryBtn} onClick={() => setShowAddModal(true)}>
            <span className="material-symbols-outlined">add</span>
            Nova Transação
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.primaryCard}`}>
          <div className={styles.cardHeader}>
            <p>Saldo Total</p>
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <h3 className={styles.amount}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.balance)}
          </h3>
          <p className={styles.trend}>Consolidado de {assets.length} ativos</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <p>Entradas (Mês)</p>
            <div className={`${styles.iconCircle} ${styles.incomeIcon}`}>
              <span className="material-symbols-outlined">south_west</span>
            </div>
          </div>
          <h3 className={styles.amountSmall}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.income)}
          </h3>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.cardHeader}>
            <p>Saídas (Mês)</p>
            <div className={`${styles.iconCircle} ${styles.expenseIcon}`}>
              <span className="material-symbols-outlined">north_east</span>
            </div>
          </div>
          <h3 className={styles.amountSmall}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.expense)}
          </h3>
          <div className={styles.progressBar}>
            <div className={styles.progressFillExpense} style={{ width: stats.income > 0 ? `${Math.min((stats.expense / stats.income) * 100, 100)}%` : '0%' }}></div>
          </div>
        </div>
      </section>

      {/* Dashboard Body */}
      <div className={styles.dashboardGrid}>
        {/* Main Content */}
        <div className={styles.mainCol}>
          <div className={styles.sectionHeader}>
            <h4 className={styles.sectionTitle}>Transações Recentes</h4>
            <button className={styles.viewAll}>Ver tudo</button>
          </div>

          <div className={styles.transactionList}>
            {transactions.length === 0 ? (
              <p className={styles.emptyText}>Nenhuma transação recente encontrada.</p>
            ) : (
              transactions.map((t, i) => (
                <div key={i} className={styles.transactionItem}>
                  <div className={styles.tInfo}>
                    <div className={styles.tIcon}>
                      <span className="material-symbols-outlined">
                        {t.type === 'income' ? 'payments' : 'shopping_cart'}
                      </span>
                    </div>
                    <div>
                      <p className={styles.tName}>{t.description}</p>
                      <p className={styles.tCat}>{t.category} • {new Date(t.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <p className={t.type === 'income' ? styles.tValIncome : styles.tValExpense}>
                    {t.type === 'income' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className={styles.sideCol}>
          <div className={styles.goalCard}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Metas (FIRE)</h4>
              <span className="material-symbols-outlined">add_circle</span>
            </div>

            <div className={styles.goalItem}>
              <div className={styles.goalInfo}>
                <p className={styles.goalName}>Liberdade Financeira</p>
                <p className={styles.goalProgress}>
                  {stats.balance > 0 ? Math.min(Math.round((stats.balance / 1000000) * 100), 100) : 0}%
                </p>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: stats.balance > 0 ? `${Math.min((stats.balance / 1000000) * 100, 100)}%` : '0%' }}></div>
              </div>
              <p className={styles.goalValues}>
                {new Intl.NumberFormat('pt-BR', { compactDisplay: 'short', notation: 'compact' }).format(stats.balance)} / R$ 1M
              </p>
            </div>
          </div>

          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <span className="material-symbols-outlined">lightbulb</span>
              <h5>Dica FIRE</h5>
            </div>
            <p className={styles.insightText}>
              Sua taxa de poupança atual e patrimônio estão sendo calculados. Continue aportando para acelerar seu FIRE!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
