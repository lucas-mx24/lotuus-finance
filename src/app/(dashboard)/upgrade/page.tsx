'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function UpgradePage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubscribe = async () => {
        setIsLoading(true)

        try {
            // Call the local API route that will create a Stripe Checkout Session
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (data.url) {
                // Redirect user to the Stripe Checkout page
                window.location.href = data.url
            } else {
                throw new Error(data.error || 'Failed to create checkout session')
            }
        } catch (error) {
            console.error('Subscription error:', error)
            alert('Não foi possível iniciar o checkout no momento. Tente novamente mais tarde.')
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Desbloqueie seu Potencial Financeiro</h1>
                <p>O Lotuus Finance PRO traz as ferramentas definitivas para dominar seu patrimônio.</p>
            </header>

            <div className={styles.layoutGrid}>
                {/* Lateral Panel: Plan details matching FIRE Simulator input layout */}
                <div className={styles.planSection}>
                    <div className={styles.planHeader}>
                        <span className={styles.planBadge}>Mais Popular</span>
                        <h2 className={styles.planTitle}>Assinatura PRO</h2>
                        <div className={styles.planPrice}>
                            <span className={styles.currency}>R$</span>
                            <span className={styles.amount}>29</span>
                            <span className={styles.period}>/mês</span>
                        </div>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '1.25rem' }}>check_circle</span>
                            Sem limite de transações
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '1.25rem' }}>check_circle</span>
                            Múltiplas carteiras e bancos
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '1.25rem' }}>check_circle</span>
                            Exportação avançada em PDF e Excel
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '1.25rem' }}>check_circle</span>
                            Prioridade no suporte técnico
                        </li>
                    </ul>

                    <button
                        className={styles.actionBtn}
                        onClick={handleSubscribe}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>autorenew</span>
                                Processando...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">lock_open</span>
                                Assinar Agora
                            </>
                        )}
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem' }}>
                        Pagamento 100% seguro processado via Stripe. Cancele quando quiser.
                    </p>
                </div>

                {/* Main Content Panel: Feature deep dive matching FIRE Simulator graph layout */}
                <div className={styles.featuresSection}>
                    <div className={styles.featureCard}>
                        <h2 className={styles.sectionTitle}>
                            <span className="material-symbols-outlined" style={{ color: '#2d5cf7' }}>star</span>
                            O que está incluso no pacote PRO?
                        </h2>

                        <div className={styles.featureList}>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">monitoring</span>
                                </div>
                                <div className={styles.featureText}>
                                    <h3>Análises Profundas</h3>
                                    <p>Tenha acesso a simuladores ilimitados e projeções de Monte Carlo para os seus investimentos de longo prazo.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">account_balance</span>
                                </div>
                                <div className={styles.featureText}>
                                    <h3>Open Finance Auto</h3>
                                    <p>Integração automática com seus principais bancos. Diga adeus ao preenchimento manual de despesas.</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">family_history</span>
                                </div>
                                <div className={styles.featureText}>
                                    <h3>Contas Conjuntas</h3>
                                    <p>Compartilhe orçamentos e planeje metas como a compra de uma casa em conjunto com seu parceiro(a).</p>
                                </div>
                            </div>

                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </div>
                                <div className={styles.featureText}>
                                    <h3>Relatórios Customizados</h3>
                                    <p>Gere os PDFs das suas posições com filtros super avançados ou exporte todas suas transações para o contador sem sofrimento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
