'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './layout.module.css'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className={styles.adminLayout}>
            {/* Sidebar (Left Panel) */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <div className={styles.logoIcon}>FC</div>
                    <div className={styles.brandText}>
                        <span className={styles.brandName}>FinançaControl</span>
                        <span className={styles.badgeAdmin}>PAINEL ADMIN</span>
                    </div>
                </div>

                <nav className={styles.navSection}>
                    <ul className={styles.navList}>
                        <Link
                            href="/admin"
                            className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>grid_view</span>
                            Visão Geral
                        </Link>
                        <Link
                            href="/admin/assinaturas"
                            className={`${styles.navItem} ${pathname === '/admin/assinaturas' ? styles.active : ''}`}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>credit_card</span>
                            Assinaturas
                        </Link>
                        <Link
                            href="/admin/users"
                            className={`${styles.navItem} ${pathname === '/admin/users' ? styles.active : ''}`}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>group</span>
                            Usuários
                        </Link>
                        <Link
                            href="/admin/reports"
                            className={`${styles.navItem} ${pathname === '/admin/reports' ? styles.active : ''}`}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>bar_chart</span>
                            Relatórios
                        </Link>
                    </ul>
                </nav>

                <nav className={styles.navSection}>
                    <p className={styles.navSectionTitle}>Conta</p>
                    <ul className={styles.navList}>
                        <Link
                            href="/admin/settings"
                            className={`${styles.navItem} ${pathname === '/admin/settings' ? styles.active : ''}`}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>settings</span>
                            Configurações
                        </Link>
                        <Link
                            href="/"
                            className={styles.navItem}
                        >
                            <span className={`material-symbols-outlined ${styles.icon}`}>logout</span>
                            Sair
                        </Link>
                    </ul>
                </nav>

                <div className={styles.helpCard}>
                    <div className={styles.helpIcon}>
                        <span className="material-symbols-outlined">support_agent</span>
                    </div>
                    <div>
                        <p className={styles.helpText}>Precisa de ajuda?</p>
                        <p className={styles.helpSubtext}>Falar com Suporte</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
                {/* Topbar */}
                <header className={styles.topbar}>
                    <div className={styles.searchBox}>
                        <span className="material-symbols-outlined">search</span>
                        <input
                            type="text"
                            placeholder="Buscar transações, usuários ou planos..."
                            className={styles.searchInput}
                        />
                    </div>

                    <div className={styles.topbarActions}>
                        <div className={styles.notificationBtn}>
                            <span className="material-symbols-outlined">notifications</span>
                            <span className={styles.notificationDot}></span>
                        </div>
                        <div className={styles.userProfile}>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>Administrador</div>
                                <div className={styles.userRole}>Super Admin</div>
                            </div>
                            <div className={styles.avatar}>A</div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className={styles.contentArea}>
                    {children}
                </main>
            </div>
        </div>
    )
}
