'use client'

import React, { useState } from 'react'
import styles from './page.module.css'

// Mock Data
const INITIAL_TRANSACTIONS = [
    { id: 1, date: '15 Mai 2024', desc: 'Salário Lotuus Inc.', cat: 'Salário', type: 'income', amount: 'R$ 15.400,00', icon: 'payments', catClass: styles.catSalary },
    { id: 2, date: '14 Mai 2024', desc: 'Supermercado Zona Sul', cat: 'Alimentação', type: 'expense', amount: 'R$ -850,20', icon: 'shopping_cart', catClass: styles.catFood },
    { id: 3, date: '12 Mai 2024', desc: 'Condomínio e Aluguel', cat: 'Moradia', type: 'expense', amount: 'R$ -3.200,00', icon: 'home', catClass: styles.catHousing },
    { id: 4, date: '10 Mai 2024', desc: 'Uber Viagens', cat: 'Transporte', type: 'expense', amount: 'R$ -145,50', icon: 'directions_car', catClass: styles.catTransport },
    { id: 5, date: '08 Mai 2024', desc: 'Rendimento Nubank', cat: 'Investimentos', type: 'income', amount: 'R$ 125,40', icon: 'trending_up', catClass: styles.catGeneric },
    { id: 6, date: '05 Mai 2024', desc: 'Netflix e Spotify', cat: 'Lazer', type: 'expense', amount: 'R$ -85,80', icon: 'movie', catClass: styles.catEntertainment },
    { id: 7, date: '02 Mai 2024', desc: 'Farmácia Raia', cat: 'Saúde', type: 'expense', amount: 'R$ -210,00', icon: 'medical_services', catClass: styles.catHealth },
];

export default function TransactionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [monthFilter, setMonthFilter] = useState('05-2024');

    // Simple client-side search simulation
    const filteredTransactions = INITIAL_TRANSACTIONS.filter(t =>
        t.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.cat.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.greeting}>
                    <h1>Transações</h1>
                    <p>Acompanhe e gerencie todas as suas entradas e saídas.</p>
                </div>
                <button className={styles.primaryButton}>
                    <span className="material-symbols-outlined">add</span>
                    Nova Transação
                </button>
            </header>

            <div className={styles.summaryGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Receitas do Mês</div>
                    <div className={styles.kpiValue} style={{ color: '#10b981' }}>R$ 15.525,40</div>
                    <div className={`${styles.kpiSubtext} ${styles.positive}`}>
                        <span className="material-symbols-outlined">arrow_upward</span>
                        +5% vs mês passado
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Despesas do Mês</div>
                    <div className={styles.kpiValue}>R$ 4.491,50</div>
                    <div className={`${styles.kpiSubtext} ${styles.positive}`}>
                        <span className="material-symbols-outlined">arrow_downward</span>
                        -12% vs mês passado (Economia)
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Saldo Previsto</div>
                    <div className={styles.kpiValue}>R$ 11.033,90</div>
                    <div className={`${styles.kpiSubtext} ${styles.neutral}`}>
                        <span className="material-symbols-outlined">account_balance</span>
                        Disponível para investir
                    </div>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Histórico Detalhado</h2>

                    <div className={styles.toolbar}>
                        <div className={styles.searchBox}>
                            <span className="material-symbols-outlined">search</span>
                            <input
                                type="text"
                                placeholder="Buscar transações..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className={styles.filterSelect}
                            value={monthFilter}
                            onChange={(e) => setMonthFilter(e.target.value)}
                        >
                            <option value="05-2024">Maio 2024</option>
                            <option value="04-2024">Abril 2024</option>
                            <option value="03-2024">Março 2024</option>
                            <option value="all">Todo o período</option>
                        </select>
                        <button className={styles.filterSelect} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>filter_alt</span>
                            Filtros
                        </button>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                                <th style={{ textAlign: 'right' }}>Valor</th>
                                <th style={{ width: '60px' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((t) => (
                                <tr key={t.id}>
                                    <td className={styles.dateCell}>{t.date}</td>
                                    <td className={styles.descriptionCell}>{t.desc}</td>
                                    <td>
                                        <div className={`${styles.categoryBadge} ${t.catClass}`}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{t.icon}</span>
                                            {t.cat}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'right' }} className={t.type === 'income' ? styles.amountIncome : styles.amountExpense}>
                                        {t.amount}
                                    </td>
                                    <td>
                                        <button className={styles.actionBtn}>
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                                        Nenhuma transação encontrada para esta busca.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.pagination}>
                    <div className={styles.pageInfo}>
                        Mostrando <strong>1</strong> a <strong>{filteredTransactions.length}</strong> de <strong>{filteredTransactions.length}</strong> resultados
                    </div>
                    <div className={styles.pageControls}>
                        <button className={styles.pageBtn} disabled>Anterior</button>
                        <button className={styles.pageBtn} disabled>Próxima</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
