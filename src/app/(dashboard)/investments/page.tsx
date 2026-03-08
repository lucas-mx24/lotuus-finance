'use client'

import React from 'react'
import styles from './page.module.css'

export default function InvestmentsPage() {
    const assets = [
        {
            id: 'TD',
            name: 'Tesouro Selic 2027',
            desc: 'Tesouro Direto',
            class: 'Renda Fixa',
            value: 'R$ 25.400,00',
            return: '+10.4%',
            isPositive: true,
            weight: '29.7%',
        },
        {
            id: 'IVVB11',
            name: 'IVVB11',
            desc: 'ETF S&P 500',
            class: 'Ações/Intl',
            value: 'R$ 12.150,00',
            return: '+18.2%',
            isPositive: true,
            weight: '14.2%',
        },
        {
            id: 'HGLG',
            name: 'HGLG11',
            desc: 'Logística',
            class: 'FIIs',
            value: 'R$ 8.920,00',
            return: '-2.1%',
            isPositive: false,
            weight: '10.4%',
        },
        {
            id: 'CDB',
            name: 'CDB Banco Inter',
            desc: '102% CDI',
            class: 'Renda Fixa',
            value: 'R$ 15.000,00',
            return: '+5.2%',
            isPositive: true,
            weight: '17.5%',
        },
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.greeting}>
                    <h1>Olá, Investidor</h1>
                    <p>Sua carteira está performando acima do CDI este mês.</p>
                </div>
                <button className={styles.investButton}>
                    <span className="material-symbols-outlined">add_circle</span>
                    Investir Agora
                </button>
            </header>

            <div className={styles.summaryGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Saldo Total Investido</div>
                    <div className={styles.kpiValue}>R$ 85.420,50</div>
                    <div className={`${styles.kpiSubtext} ${styles.positive}`}>
                        <span className="material-symbols-outlined">trending_up</span>
                        +1.2% este mês
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Rendimento Mensal</div>
                    <div className={styles.kpiValue}>R$ 742,15</div>
                    <div className={`${styles.kpiSubtext} ${styles.positive}`}>
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        0.87% yield
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Patrimônio Líquido</div>
                    <div className={styles.kpiValue}>R$ 92.150,00</div>
                    <div className={`${styles.kpiSubtext} ${styles.neutral}`}>
                        <span className="material-symbols-outlined">info</span>
                        Inclui saldo em conta
                    </div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Dividendos Projetados</div>
                    <div className={styles.kpiValue}>R$ 412,00</div>
                    <div className={`${styles.kpiSubtext} ${styles.muted}`}>
                        <span className="material-symbols-outlined">calendar_today</span>
                        Próximos 30 dias
                    </div>
                </div>
            </div>

            <div className={styles.mainGrid}>
                {/* Alocação de Ativos */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Alocação de Ativos</h2>
                    </div>

                    <div className={styles.allocationBar}>
                        <div className={`${styles.allocSegment} ${styles.allocColorRendaFixa}`} style={{ width: '45%' }}></div>
                        <div className={`${styles.allocSegment} ${styles.allocColorAcoes}`} style={{ width: '25%' }}></div>
                        <div className={`${styles.allocSegment} ${styles.allocColorFiis}`} style={{ width: '20%' }}></div>
                        <div className={`${styles.allocSegment} ${styles.allocColorIntl}`} style={{ width: '10%' }}></div>
                    </div>

                    <div className={styles.allocationLegend}>
                        <div className={styles.legendItem}>
                            <div className={styles.legendLabel}>
                                <div className={`${styles.legendDot} ${styles.allocColorRendaFixa}`}></div>
                                Renda Fixa
                            </div>
                            <div className={styles.legendValue}>45%</div>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={styles.legendLabel}>
                                <div className={`${styles.legendDot} ${styles.allocColorAcoes}`}></div>
                                Ações
                            </div>
                            <div className={styles.legendValue}>25%</div>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={styles.legendLabel}>
                                <div className={`${styles.legendDot} ${styles.allocColorFiis}`}></div>
                                FIIs
                            </div>
                            <div className={styles.legendValue}>20%</div>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={styles.legendLabel}>
                                <div className={`${styles.legendDot} ${styles.allocColorIntl}`}></div>
                                Internacional
                            </div>
                            <div className={styles.legendValue}>10%</div>
                        </div>
                    </div>
                </div>

                {/* Performance Histórica (Placeholder) */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Performance Histórica</h2>
                        <div className={styles.performanceLegend}>
                            <div className={styles.perfLegendItem}>
                                <div className={`${styles.legendDot} ${styles.allocColorRendaFixa}`}></div>
                                Carteira
                            </div>
                            <div className={styles.perfLegendItem}>
                                <div className={`${styles.legendDot} ${styles.muted}`} style={{ backgroundColor: '#cbd5e1' }}></div>
                                CDI
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartPlaceholder}>
                        <div className={styles.chartGridLines}>
                            <div className={styles.gridLine}></div>
                            <div className={styles.gridLine}></div>
                            <div className={styles.gridLine}></div>
                            <div className={styles.gridLine}></div>
                            <div className={styles.gridLine}></div>
                        </div>
                        {/* Imaginary Chart Area */}
                        <div className={styles.chartXAxis}>
                            <span>Jan</span>
                            <span>Fev</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>Mai</span>
                            <span>Jun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela de Investimentos */}
            <div className={styles.card}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.cardTitle}>Meus Investimentos</h2>
                    <a href="#" className={styles.viewAll}>Ver todos</a>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Ativo</th>
                                <th>Classe</th>
                                <th>Valor Atual</th>
                                <th>Rentabilidade</th>
                                <th>% Carteira</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.map((asset, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={styles.assetCell}>
                                            <div className={styles.assetIcon}>{asset.id}</div>
                                            <div className={styles.assetInfo}>
                                                <span className={styles.assetName}>{asset.name}</span>
                                                <span className={styles.assetDesc}>{asset.desc}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.tdClass}>{asset.class}</td>
                                    <td className={styles.tdValue}>{asset.value}</td>
                                    <td className={`${styles.tdReturn} ${asset.isPositive ? styles.returnPos : styles.returnNeg}`}>
                                        {asset.return}
                                    </td>
                                    <td className={styles.tdWeight}>{asset.weight}</td>
                                    <td>
                                        <button className={styles.actionBtn}>
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
