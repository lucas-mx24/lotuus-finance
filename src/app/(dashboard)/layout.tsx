'use client'

import styles from "../layout.module.css";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/auth/login')
        router.refresh()
    }

    return (
        <div className={styles.layoutShell}>
            <header className={styles.mainHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.logoSection}>
                        <div className={styles.logoIcon}>
                            <span className="material-symbols-outlined">account_balance_wallet</span>
                        </div>
                        <h2 className={styles.logoText}>Lotuus Finance</h2>
                    </div>

                    <nav className={styles.mainNav}>
                        <Link href="/" className={styles.navItem}>Dashboard</Link>
                        <Link href="/transactions" className={styles.navItem}>Transações</Link>
                        <Link href="/investments" className={styles.navItem}>Investimentos</Link>
                        <Link href="/simuladores/fire" className={styles.navItem}>Simulador FIRE</Link>
                        <Link href="/simuladores/juros-compostos" className={styles.navItem}>Juros Compostos</Link>
                        <Link href="/relatorios" className={styles.navItem}>Relatórios</Link>
                        <Link
                            href="/upgrade"
                            className={styles.navItem}
                            style={{
                                color: '#fbbf24',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>stars</span>
                            PRO
                        </Link>
                    </nav>

                    <div className={styles.headerActions}>
                        <button className={styles.iconBtn}>
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className={styles.iconBtn} onClick={handleLogout} title="Sair">
                            <span className="material-symbols-outlined">logout</span>
                        </button>
                        <div className={styles.userProfile}>
                            <div className={styles.avatarPlaceholder}>L</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className={styles.contentArea}>
                {children}
            </main>

            <footer className={styles.mainFooter}>
                <p>© 2024 Lotuus Finance • Gestão Financeira Inteligente</p>
            </footer>
        </div>
    )
}
