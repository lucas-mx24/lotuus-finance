'use client'

import { useState, useEffect } from 'react'
import { calculateFIRE, FireResult } from '@/lib/finance'
import styles from './fire.module.css'

export default function FireSimulatorPage() {
    const [monthlySpend, setMonthlySpend] = useState(5000)
    const [currentAssets, setCurrentAssets] = useState(150000)
    const [monthlyContribution, setMonthlyContribution] = useState(2500)
    const [swr, setSwr] = useState(4)
    const [result, setResult] = useState<FireResult | null>(null)

    useEffect(() => {
        const res = calculateFIRE(monthlySpend, currentAssets, monthlyContribution, swr)
        setResult(res)
    }, [monthlySpend, currentAssets, monthlyContribution, swr])

    if (!result) return null

    const progress = Math.min(Math.round((currentAssets / result.fireNumber) * 100), 100)

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Simulador de Independência Financeira (FIRE)</h1>
                <p>Planeje sua liberdade financeira com base na Regra dos 4% adaptada ao mercado brasileiro.</p>
            </header>

            <div className={styles.mainGrid}>
                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            <span className="material-symbols-outlined">edit_note</span>
                            Parâmetros
                        </h3>

                        <div className={styles.inputGroup}>
                            <label>Gasto Mensal Desejado</label>
                            <div className={styles.inputIcon}>
                                <span>R$</span>
                                <input
                                    type="number"
                                    value={monthlySpend}
                                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Patrimônio Atual</label>
                            <div className={styles.inputIcon}>
                                <span>R$</span>
                                <input
                                    type="number"
                                    value={currentAssets}
                                    onChange={(e) => setCurrentAssets(Number(e.target.value))}
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
                            <label>Taxa de Retirada Segura (% ano)</label>
                            <div className={styles.inputIcon}>
                                <input
                                    style={{ textAlign: 'right', paddingRight: '2rem', paddingLeft: '1rem' }}
                                    type="number"
                                    value={swr}
                                    onChange={(e) => setSwr(Number(e.target.value))}
                                />
                                <span style={{ left: 'auto', right: '12px', color: '#64748b' }}>%</span>
                            </div>
                            <p className={styles.hint}>Recomendado: 3% a 5% para o Brasil.</p>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        <h3>Entenda a Regra dos {swr}%</h3>
                        <p>
                            A regra sugere que você pode retirar {swr}% do seu patrimônio investido no primeiro ano de aposentadoria e ajustar esse valor pela inflação nos anos seguintes sem esgotar o capital por pelo menos 30 anos.
                        </p>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.summaryGrid}>
                        <div className={styles.kpiCard}>
                            <p className={styles.kpiLabel}>Seu Número FIRE</p>
                            <h2 className={styles.highlightText}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(result.fireNumber)}
                            </h2>
                            <p className={styles.cardSublabel}>Gasto alvo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlySpend)}/mês</p>
                        </div>

                        <div className={styles.kpiCard}>
                            <p className={styles.kpiLabel}>Tempo Estimado</p>
                            <h2 className={styles.largeText}>{result.yearsToFire} anos e {result.monthsToFire} meses</h2>
                            <p className={styles.successHint}>
                                <span className="material-symbols-outlined">rocket_launch</span>
                                Rumo à liberdade financeira!
                            </p>
                        </div>
                    </div>

                    <div className={styles.progressCard}>
                        <div className={styles.progressHeader}>
                            <div>
                                <h3>Progresso até a Liberdade</h3>
                                <p>Você já percorreu {progress}% do caminho estipulado.</p>
                            </div>
                            <span className={styles.progressValue}>{progress}%</span>
                        </div>
                        <div className={styles.progressBarBg}>
                            <div className={styles.progressBarFill} style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className={styles.chartCard}>
                        <h3>Projeção de Crescimento do Patrimônio</h3>
                        <div className={styles.chartArea}>
                            {result.projection.map((entry, idx) => {
                                const minHeightPercentage = 2; // minimum visual height
                                const calculatedHeight = (entry.value / result.fireNumber) * 100;
                                const height = Math.max(Math.min(calculatedHeight, 100), minHeightPercentage);

                                return (
                                    <div
                                        key={idx}
                                        className={styles.chartColumn}
                                        style={{ height: `${height}%` }}
                                        data-fire={entry.isFire ? "true" : "false"}
                                    >
                                        <div className={styles.tooltip}>
                                            {entry.year} anos
                                            <br />
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(entry.value)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.chartLabels}>
                            <span>Hoje</span>
                            <span>Meio da Jornada</span>
                            <span>{result.yearsToFire} anos (Metas)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
