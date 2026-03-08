'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './page.module.css'

const revenueData = [
    { name: 'Jan', revenue: 32000 },
    { name: 'Feb', revenue: 38000 },
    { name: 'Mar', revenue: 35000 },
    { name: 'Apr', revenue: 42000 },
    { name: 'May', revenue: 45200 },
    { name: 'Jun', revenue: 48000 },
]

const churnData = [
    { name: 'Jan', rate: 3.2 },
    { name: 'Feb', rate: 2.8 },
    { name: 'Mar', rate: 3.0 },
    { name: 'Apr', rate: 2.5 },
    { name: 'May', rate: 2.4 },
    { name: 'Jun', rate: 2.1 },
]

const mockReports = [
    { icon: 'picture_as_pdf', iconClass: 'iconPdf', title: 'Relatório de Receita Mensal', desc: 'Receita detalhada por plano', type: 'PDF', date: '01 Jun 2024', size: '2.4 MB' },
    { icon: 'table_chart', iconClass: 'iconCsv', title: 'Análise de Crescimento', desc: 'Cadastros, ativações, churn', type: 'CSV', date: '28 Mai 2024', size: '1.1 MB' },
    { icon: 'analytics', iconClass: 'iconXls', title: 'Métricas de Assinatura', desc: 'MRR, ARPU, LTV por coorte', type: 'XLSX', date: '15 Mai 2024', size: '3.8 MB' },
    { icon: 'picture_as_pdf', iconClass: 'iconPdf', title: 'Relatório de Risco de Churn', desc: 'Usuários propensos a cancelar', type: 'PDF', date: '10 Mai 2024', size: '1.6 MB' },
    { icon: 'table_chart', iconClass: 'iconCsv', title: 'Log de Falhas de Pagamento', desc: 'Cobranças falhadas e retentativas', type: 'CSV', date: '05 Mai 2024', size: '890 KB' },
]

export default function ReportsPage() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => { setIsMounted(true) }, [])

    return (
        <div className={styles.pageContainer}>

            {/* Header */}
            <header className={styles.pageHeader}>
                <div className={styles.titleWrapper}>
                    <h1>Relatórios e Análises</h1>
                    <p>Insights de performance da plataforma e relatórios para download.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnSecondary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span>
                        Últimos 6 Meses
                    </button>
                    <button className={styles.btnPrimary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                        Gerar Relatório
                    </button>
                </div>
            </header>

            {/* KPI Grid */}
            <section className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconGreen}`}>
                            <span className="material-symbols-outlined">trending_up</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+22%</span>
                    </div>
                    <div className={styles.kpiContent}><p>Receita Total (6m)</p><h2>R$ 240.200</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconBlue}`}>
                            <span className="material-symbols-outlined">person</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+5.3%</span>
                    </div>
                    <div className={styles.kpiContent}><p>ARPU</p><h2>$38.50</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconPurple}`}>
                            <span className="material-symbols-outlined">timeline</span>
                        </div>
                    </div>
                    <div className={styles.kpiContent}><p>Valor Vitalício</p><h2>R$ 462,00</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconAmber}`}>
                            <span className="material-symbols-outlined">description</span>
                        </div>
                    </div>
                    <div className={styles.kpiContent}><p>Relatórios Gerados</p><h2>47</h2></div>
                </div>
            </section>

            {/* Charts */}
            <section className={styles.chartsSection}>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartCardTitle}>Tendência de Receita</h3>
                    <p className={styles.chartCardSubtitle}>Receita mensal recorrente ao longo do tempo</p>
                    <div className={styles.chartContainer}>
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="revenue" fill="#2d5cf7" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartCardTitle}>Evolução do Churn</h3>
                    <p className={styles.chartCardSubtitle}>Percentual de churn mensal</p>
                    <div className={styles.chartContainer}>
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={churnData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 5]} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorChurn)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </section>

            {/* Downloadable Reports Table */}
            <section className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h2>Relatórios Disponíveis</h2>
                </div>
                <table className={styles.reportsTable}>
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>RELATÓRIO</th>
                            <th style={{ width: '12%' }}>TIPO</th>
                            <th style={{ width: '18%' }}>GERADO EM</th>
                            <th style={{ width: '12%' }}>TAMANHO</th>
                            <th style={{ width: '18%', textAlign: 'right' }}>AÇÃO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockReports.map((r, i) => (
                            <tr key={i}>
                                <td>
                                    <div className={styles.reportName}>
                                        <div className={`${styles.reportIcon} ${styles[r.iconClass]}`}>
                                            <span className="material-symbols-outlined">{r.icon}</span>
                                        </div>
                                        <div>
                                            <div className={styles.reportTitle}>{r.title}</div>
                                            <div className={styles.reportDesc}>{r.desc}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={styles.typeBadge}>{r.type}</span></td>
                                <td>{r.date}</td>
                                <td>{r.size}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={styles.downloadBtn}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>download</span>
                                        Baixar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </div>
    )
}
