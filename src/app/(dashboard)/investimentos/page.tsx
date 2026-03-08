'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import AddAssetModal from '@/components/AddAssetModal'
import styles from './investimentos.module.css'

interface Asset {
    id: string
    name: string
    value: number
    type: string
    color: string
}

export default function InvestimentosPage() {
    const [assets, setAssets] = useState<Asset[]>([])
    const [loading, setLoading] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)
    const supabase = createClient()

    async function fetchAssets() {
        setLoading(true)
        const { data, error } = await supabase
            .from('assets')
            .select('*')

        if (!error && data) {
            setAssets(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchAssets()
    }, [])

    const totalValue = assets.reduce((acc, asset) => acc + Number(asset.value), 0)

    if (loading) {
        return <div className={styles.loading}>Carregando seu portfólio...</div>
    }

    return (
        <div className={styles.container}>
            {showAddModal && (
                <AddAssetModal
                    onClose={() => setShowAddModal(false)}
                    onSave={() => fetchAssets()}
                />
            )}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Detalhamento de Investimentos</h1>
                    <p className={styles.subtitle}>Gerencie sua alocação de ativos e acompanhe a evolução do seu patrimônio.</p>
                </div>
                <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
                    <span className="material-symbols-outlined">add</span>
                    Novo Ativo
                </button>
            </header>

            <div className={styles.summaryGrid}>
                <div className={styles.card}>
                    <p className={styles.cardLabel}>Patrimônio Total</p>
                    <h2 className={styles.valueText}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalValue)}
                    </h2>
                    <p className={styles.cardTrend}>+2.4% este mês</p>
                </div>

                <div className={styles.card}>
                    <p className={styles.cardLabel}>Rendimento Mensal</p>
                    <h2 className={styles.valueText}>R$ 1.250,00</h2>
                    <p className={styles.cardTrend}>+0.8% ROI médio</p>
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.assetsSection}>
                    <div className={styles.sectionHeader}>
                        <h3>Meus Ativos</h3>
                        <button className={styles.textBtn}>Ver histórico</button>
                    </div>

                    <div className={styles.assetList}>
                        {assets.length === 0 ? (
                            <div className={styles.emptyState}>
                                <span className="material-symbols-outlined">account_balance</span>
                                <p>Nenhum ativo cadastrado ainda.</p>
                            </div>
                        ) : (
                            assets.map((asset) => (
                                <div key={asset.id} className={styles.assetItem}>
                                    <div className={styles.assetInfo}>
                                        <div className={styles.assetIcon} style={{ backgroundColor: asset.color || 'var(--primary)' }}>
                                            <span className="material-symbols-outlined">
                                                {asset.type === 'crypto' ? 'currency_bitcoin' :
                                                    asset.type === 'stock' ? 'trending_up' : 'savings'}
                                            </span>
                                        </div>
                                        <div>
                                            <h4>{asset.name}</h4>
                                            <p>{asset.type.toUpperCase()}</p>
                                        </div>
                                    </div>
                                    <div className={styles.assetValues}>
                                        <span className={styles.assetPrice}>
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(asset.value)}
                                        </span>
                                        <span className={styles.assetPct}>
                                            {((asset.value / totalValue) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className={styles.allocationSidebar}>
                    <div className={styles.card}>
                        <h3>Distribuição</h3>
                        <div className={styles.donutPlaceholder}>
                            {/* Visual aid for the donut chart */}
                            <div className={styles.donutInner}>
                                <span>{assets.length} ativos</span>
                            </div>
                        </div>
                        <div className={styles.legend}>
                            {assets.map(asset => (
                                <div key={asset.id} className={styles.legendItem}>
                                    <span className={styles.dot} style={{ backgroundColor: asset.color }}></span>
                                    <span>{asset.name}</span>
                                    <span className={styles.legendPct}>{((asset.value / totalValue) * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
