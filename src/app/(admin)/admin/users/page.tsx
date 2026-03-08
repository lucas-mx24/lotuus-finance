'use client'

import React from 'react'
import styles from './page.module.css'

const mockUsers = [
    { initials: 'JD', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', plan: 'Elite', joined: '15 Jan 2024' },
    { initials: 'AS', name: 'Alice Smith', email: 'alice.smith@web.com', role: 'User', status: 'Active', plan: 'Pro', joined: '22 Feb 2024' },
    { initials: 'BM', name: 'Brian Miller', email: 'brian.m@corp.org', role: 'User', status: 'Inactive', plan: 'Essencial', joined: '03 Mar 2024' },
    { initials: 'CL', name: 'Clara Lewis', email: 'clara.lewis@me.com', role: 'Moderator', status: 'Active', plan: 'Pro', joined: '10 Apr 2024' },
    { initials: 'EW', name: 'Edward Wilson', email: 'ed.wilson@mail.com', role: 'User', status: 'Suspended', plan: 'Essencial', joined: '18 May 2024' },
    { initials: 'FR', name: 'Fiona Roberts', email: 'fiona.r@startup.io', role: 'User', status: 'Active', plan: 'Elite', joined: '25 Jun 2024' },
]

function getRoleBadge(role: string) {
    const map: Record<string, string> = { Admin: styles.roleAdmin, User: styles.roleUser, Moderator: styles.roleModerator }
    return map[role] || styles.roleUser
}

function getStatusClass(status: string) {
    const map: Record<string, string> = { Active: styles.statusActive, Inactive: styles.statusInactive, Suspended: styles.statusSuspended }
    return map[status] || styles.statusInactive
}

export default function UsersPage() {
    return (
        <div className={styles.pageContainer}>

            {/* Header */}
            <header className={styles.pageHeader}>
                <div className={styles.titleWrapper}>
                    <h1>Gestão de Usuários</h1>
                    <p>Visualize, gerencie e organize todos os usuários registrados na plataforma.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnSecondary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                        Exportar CSV
                    </button>
                    <button className={styles.btnPrimary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
                        Novo Usuário
                    </button>
                </div>
            </header>

            {/* KPI Grid */}
            <section className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconBlue}`}>
                            <span className="material-symbols-outlined">group</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+8.2%</span>
                    </div>
                    <div className={styles.kpiContent}><p>Total de Usuários</p><h2>8.942</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconGreen}`}>
                            <span className="material-symbols-outlined">person_check</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+3.1%</span>
                    </div>
                    <div className={styles.kpiContent}><p>Usuários Ativos</p><h2>7.128</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconAmber}`}>
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                    </div>
                    <div className={styles.kpiContent}><p>Inativos</p><h2>1.650</h2></div>
                </div>
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconPurple}`}>
                            <span className="material-symbols-outlined">block</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgeNegative}`}>+2</span>
                    </div>
                    <div className={styles.kpiContent}><p>Suspensos</p><h2>164</h2></div>
                </div>
            </section>

            {/* Search & Filter */}
            <div className={styles.filterBar}>
                <div className={styles.searchWrapper}>
                    <span className="material-symbols-outlined">search</span>
                    <input type="text" placeholder="Buscar por nome, email ou ID..." />
                </div>
                <select className={styles.selectInput}>
                    <option>Todos os Perfis</option>
                    <option>Admin</option>
                    <option>Usuário</option>
                    <option>Moderador</option>
                </select>
                <select className={styles.selectInput}>
                    <option>Todos os Status</option>
                    <option>Ativo</option>
                    <option>Inativo</option>
                    <option>Suspenso</option>
                </select>
            </div>

            {/* Table */}
            <section className={styles.tableSection}>
                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>USUÁRIO</th>
                            <th style={{ width: '12%' }}>PERFIL</th>
                            <th style={{ width: '14%' }}>STATUS</th>
                            <th style={{ width: '14%' }}>PLANO</th>
                            <th style={{ width: '18%' }}>CADASTRO</th>
                            <th style={{ width: '12%', textAlign: 'right' }}>AÇÕES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((u, i) => (
                            <tr key={i}>
                                <td>
                                    <div className={styles.userCell}>
                                        <div className={styles.tableAvatar}>{u.initials}</div>
                                        <div>
                                            <div className={styles.userName}>{u.name}</div>
                                            <div className={styles.userEmail}>{u.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`${styles.roleBadge} ${getRoleBadge(u.role)}`}>{u.role}</span></td>
                                <td>
                                    <div className={`${styles.statusIndicator} ${getStatusClass(u.status)}`}>
                                        <div className={styles.statusDot}></div>
                                        {u.status}
                                    </div>
                                </td>
                                <td>{u.plan}</td>
                                <td>{u.joined}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={styles.actionBtn}>
                                        <span className="material-symbols-outlined">more_horiz</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={styles.tableFooter}>
                    <div className={styles.footerText}>Mostrando 6 de 8.942 usuários</div>
                    <div className={styles.pagination}>
                        <button className={styles.btnPage}>Anterior</button>
                        <button className={styles.btnPage}>Próximo</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
