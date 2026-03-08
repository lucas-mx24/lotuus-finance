'use client'

import { useState, useEffect } from 'react'
import { calculateCompoundInterest, CompoundInterestResult } from '@/lib/compoundInterest'
import styles from './page.module.css'

export default function CompoundInterestPage() {
    const [principal, setPrincipal] = useState(10000)
    const [monthlyContribution, setMonthlyContribution] = useState(1000)
    const [interestRate, setInterestRate] = useState(10)
    const [years, setYears] = useState(15)

    const [result, setResult] = useState<CompoundInterestResult | null>(null)

    useEffect(() => {
        // Prevent negative values causing infinite loops or nonsense results
        const safePrincipal = Math.max(0, principal);
        const safeContribution = Math.max(0, monthlyContribution);
        const safeRate = Math.max(0, interestRate);
        const safeYears = Math.max(1, Math.min(years, 60)); // limit between 1 and 60 years

        const res = calculateCompoundInterest(safePrincipal, safeContribution, safeRate, safeYears);
        setResult(res);
    }, [principal, monthlyContribution, interestRate, years])

    if (!result) return null

    // For chart scaling
    const maxTotal = result.finalAmount;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Simulador de Rendimentos (Juros Compostos)</h1>
                <p>Descubra o poder do tempo e dos juros compostos para multiplicar o seu patrimônio.</p>
            </header>

            <div className={styles.mainGrid}>
                {/* Parâmetros */}
                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            <span className="material-symbols-outlined">calculate</span>
                            Simulação
                        </h3>

                        <div className={styles.inputGroup}>
                            <label>Valor Inicial</label>
                            <div className={styles.inputIcon}>
                                <span>R$</span>
                                <input
                                    type="number"
                                    value={principal}
                                    onChange={(e) => setPrincipal(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Aporte Mensal</label>
                            <div className={styles.inputIcon}>
                                <span>R$</span>
                                <input
                                    type="number"
                                    value={monthlyContribution}
                                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Taxa de Juros (% ao ano)</label>
                            <div className={styles.inputIcon}>
                                <input
                                    style={{ textAlign: 'right', paddingRight: '2.5rem', paddingLeft: '1rem' }}
                                    type="number"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    step="0.5"
                                />
                                <span style={{ left: 'auto', right: '12px', color: '#64748b' }}>%</span>
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Período (Anos)</label>
                            <div className={styles.inputIcon}>
                                <input
                                    style={{ textAlign: 'right', paddingRight: '3.5rem', paddingLeft: '1rem' }}
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Math.round(Number(e.target.value)))}
                                />
                                <span style={{ left: 'auto', right: '12px', color: '#64748b' }}>Anos</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        <h3>Por que começar agora?</h3>
                        <p>
                            Os juros compostos agem como uma "bola de neve". O rendimento não ocorre apenas sobre o que você investiu, mas também sobre os juros que já foram gerados nos meses anteriores. Quanto maior o tempo investido, maior o efeito multiplicador!
                        </p>
                    </div>
                </div>

                {/* Resultados */}
                <div className={styles.content}>
                    <div className={styles.summaryGrid}>
                        <div className={styles.kpiCard}>
                            <p className={styles.kpiLabel}>Total Investido</p>
                            <h2 className={styles.darkText}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.totalInvested)}
                            </h2>
                        </div>

                        <div className={styles.kpiCard}>
                            <p className={styles.kpiLabel}>Total em Juros</p>
                            <h2 className={styles.greenText}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.totalInterest)}
                            </h2>
                        </div>

                        <div className={styles.kpiCard} style={{ borderColor: '#2d5cf7', borderBottom: '4px solid #2d5cf7' }}>
                            <p className={styles.kpiLabel}>Patrimônio Acumulado</p>
                            <h2 className={styles.highlightText}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.finalAmount)}
                            </h2>
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3>Crescimento ao Longo do Tempo</h3>
                            <div className={styles.chartHeader}>
                                <div className={styles.chartLegend}>
                                    <div className={`${styles.legendDot} ${styles.legendInvested}`}></div>
                                    Investimento
                                </div>
                                <div className={styles.chartLegend}>
                                    <div className={`${styles.legendDot} ${styles.legendInterest}`}></div>
                                    Juros
                                </div>
                            </div>
                        </div>

                        <div className={styles.chartArea}>
                            {result.projection.map((entry, idx) => {
                                // Exclude Year 0 from the columns to save space if it looks cramped, but since it's just dots it's fine.
                                // We calculate percentage of the max total so the largest column fills the area.
                                const investedHeight = (entry.invested / maxTotal) * 100;
                                const interestHeight = (entry.interest / maxTotal) * 100;

                                // Do not render if 0 years (just the starting snapshot)
                                if (entry.year === 0 && years > 10) return null;

                                return (
                                    <div key={idx} className={styles.chartColumnWrapper}>
                                        <div
                                            className={styles.chartColumnInterest}
                                            style={{ height: `${interestHeight}%` }}
                                        ></div>
                                        <div
                                            className={styles.chartColumnInvested}
                                            style={{ height: `${investedHeight}%` }}
                                        ></div>

                                        <div className={styles.tooltip}>
                                            <div style={{ marginBottom: '4px', borderBottom: '1px solid #334155', paddingBottom: '4px', textAlign: 'center', color: 'white' }}>
                                                <strong>Ano {entry.year}</strong>
                                            </div>
                                            <div>
                                                <span>Total:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(entry.total)}
                                            </div>
                                            <div>
                                                <span>Investido:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(entry.invested)}
                                            </div>
                                            <div>
                                                <span>Juros:</span> {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(entry.interest)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.chartLabels}>
                            <span>Hoje</span>
                            <span>Meade do Caminho</span>
                            <span>{years} anos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
