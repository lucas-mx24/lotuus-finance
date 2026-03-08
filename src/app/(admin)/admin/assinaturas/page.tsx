'use client'

import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './page.module.css'

// Mock Data for the Area Chart
const growthData = [
    { name: 'JAN', current: 4000, previous: 2400 },
    { name: 'FEB', current: 5000, previous: 2600 },
    { name: 'MAR', current: 4200, previous: 2200 },
    { name: 'APR', current: 7800, previous: 4500 },
    { name: 'MAY', current: 12000, previous: 7000 },
    { name: 'JUN', current: 13500, previous: 6000 },
    { name: 'JUL', current: 11000, previous: 4000 },
    { name: 'AUG', current: 15000, previous: 8000 },
];

export default function SubscriptionsOverviewPage() {
    // For hydration mismatch prevention with Recharts
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true) }, []);

    return (
        <div className={styles.pageContainer}>

            {/* Page Header */}
            <header className={styles.pageHeader}>
                <div className={styles.titleWrapper}>
                    <h1>Subscription Overview</h1>
                    <p>Real-time financial metrics and platform performance.</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnSecondary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span>
                        Last 30 Days
                    </button>
                    <button className={styles.btnPrimary}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                        Export Data
                    </button>
                </div>
            </header>

            {/* KPI Grid */}
            <section className={styles.kpiGrid}>
                {/* KPI 1 */}
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconBlue}`}>
                            <span className="material-symbols-outlined">group_add</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+12.5%</span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Total Subscriptions</p>
                        <h2>12,450</h2>
                    </div>
                </div>

                {/* KPI 2 */}
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconGreen}`}>
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+8.1%</span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>MRR</p>
                        <h2>$45,200.00</h2>
                    </div>
                </div>

                {/* KPI 3 */}
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconRed}`}>
                            <span className="material-symbols-outlined">trending_down</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgeNegative}`}>-0.5%</span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>Churn Rate</p>
                        <h2>2.4%</h2>
                    </div>
                </div>

                {/* KPI 4 */}
                <div className={styles.kpiCard}>
                    <div className={styles.kpiHeader}>
                        <div className={`${styles.kpiIconWrapper} ${styles.iconPurple}`}>
                            <span className="material-symbols-outlined">bolt</span>
                        </div>
                        <span className={`${styles.kpiBadge} ${styles.badgePositive}`}>+15%</span>
                    </div>
                    <div className={styles.kpiContent}>
                        <p>New Signups</p>
                        <h2>128</h2>
                    </div>
                </div>
            </section>

            {/* Charts Section */}
            <section className={styles.chartsSection}>

                {/* Growth Chart */}
                <div className={styles.chartCard} style={{ gridColumn: '1 / 2' }}>
                    <div className={styles.chartHeader}>
                        <div>
                            <h3 className={styles.chartCardTitle}>Subscription Growth</h3>
                            <p className={styles.chartCardSubtitle}>Monthly evolution of your user base</p>
                        </div>
                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendDot} ${styles.dotBlue}`}></div>
                                Current Year
                            </div>
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendDot} ${styles.dotGray}`}></div>
                                Previous Year
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartContainer}>
                        {isMounted && (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2d5cf7" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#2d5cf7" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis hide={true} domain={['dataMin - 1000', 'dataMax + 2000']} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="previous"
                                        stroke="#cbd5e1"
                                        strokeWidth={2}
                                        strokeDasharray="5 5"
                                        fill="none"
                                        isAnimationActive={false}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="current"
                                        stroke="#2d5cf7"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorCurrent)"
                                        isAnimationActive={false}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Plan Distribution */}
                <div className={styles.chartCard} style={{ gridColumn: '2 / 3' }}>
                    <h3 className={styles.chartCardTitle}>Plan Distribution</h3>
                    <p className={styles.chartCardSubtitle}>Percentage of total users across plans</p>

                    <div className={styles.distributionList}>
                        <div>
                            <div className={styles.distItemHeader}>
                                <span className={styles.distItemName}>Elite Plan</span>
                                <span className={styles.distItemValue}>45%</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={`${styles.progressBarFill} ${styles.fillElite}`} style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className={styles.distItemHeader}>
                                <span className={styles.distItemName}>Pro Plan</span>
                                <span className={styles.distItemValue}>32%</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={`${styles.progressBarFill} ${styles.fillPro}`} style={{ width: '32%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className={styles.distItemHeader}>
                                <span className={styles.distItemName}>Essencial Plan</span>
                                <span className={styles.distItemValue}>23%</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={`${styles.progressBarFill} ${styles.fillEssencial}`} style={{ width: '23%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.focusAlert}>
                        <div className={styles.focusIcon}>
                            <span className="material-symbols-outlined">workspace_premium</span>
                        </div>
                        <div>
                            <h4 className={styles.focusTitle}>Upgrade Focus</h4>
                            <p className={styles.focusDesc}>12% of Pro users are eligible for Elite upgrades based on usage.</p>
                        </div>
                    </div>
                </div>

            </section>

            {/* Table Section */}
            <section className={styles.tableSection}>
                <div className={styles.tableHeader}>
                    <h2>Recent Subscriptions</h2>
                    <div className={styles.tableFilters}>
                        <select className={styles.selectInput}>
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Canceled</option>
                        </select>
                        <button className={styles.btnFilter}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>filter_list</span>
                        </button>
                    </div>
                </div>

                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th style={{ width: '35%' }}>USER EMAIL</th>
                            <th style={{ width: '20%' }}>PLAN TYPE</th>
                            <th style={{ width: '20%' }}>STATUS</th>
                            <th style={{ width: '15%' }}>VALUE</th>
                            <th style={{ width: '10%', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Row 1 */}
                        <tr>
                            <td>
                                <div className={styles.userCell}>
                                    <div className={styles.tableAvatar}>JD</div>
                                    <span>john.doe@example.com</span>
                                </div>
                            </td>
                            <td><span className={`${styles.planBadge} ${styles.bgElite}`}>Elite</span></td>
                            <td>
                                <div className={`${styles.statusIndicator} ${styles.statusActive}`}>
                                    <div className={styles.statusDot}></div>
                                    Active
                                </div>
                            </td>
                            <td className={styles.valueCell}>$129.00</td>
                            <td style={{ textAlign: 'right' }}>
                                <button className={styles.actionBtn}>
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </td>
                        </tr>

                        {/* Row 2 */}
                        <tr>
                            <td>
                                <div className={styles.userCell}>
                                    <div className={styles.tableAvatar}>AS</div>
                                    <span>alice.smith@web.com</span>
                                </div>
                            </td>
                            <td><span className={`${styles.planBadge} ${styles.bgPro}`}>Pro</span></td>
                            <td>
                                <div className={`${styles.statusIndicator} ${styles.statusActive}`}>
                                    <div className={styles.statusDot}></div>
                                    Active
                                </div>
                            </td>
                            <td className={styles.valueCell}>$49.00</td>
                            <td style={{ textAlign: 'right' }}>
                                <button className={styles.actionBtn}>
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </td>
                        </tr>

                        {/* Row 3 */}
                        <tr>
                            <td>
                                <div className={styles.userCell}>
                                    <div className={styles.tableAvatar}>BM</div>
                                    <span>brian.m@corp.org</span>
                                </div>
                            </td>
                            <td><span className={`${styles.planBadge} ${styles.bgEssencial}`}>Essencial</span></td>
                            <td>
                                <div className={`${styles.statusIndicator} ${styles.statusPending}`}>
                                    <div className={styles.statusDot}></div>
                                    Pending
                                </div>
                            </td>
                            <td className={styles.valueCell}>$19.00</td>
                            <td style={{ textAlign: 'right' }}>
                                <button className={styles.actionBtn}>
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </td>
                        </tr>

                        {/* Row 4 */}
                        <tr>
                            <td>
                                <div className={styles.userCell}>
                                    <div className={styles.tableAvatar}>CL</div>
                                    <span>clara.lewis@me.com</span>
                                </div>
                            </td>
                            <td><span className={`${styles.planBadge} ${styles.bgPro}`}>Pro</span></td>
                            <td>
                                <div className={`${styles.statusIndicator} ${styles.statusCanceled}`}>
                                    <div className={styles.statusDot}></div>
                                    Canceled
                                </div>
                            </td>
                            <td className={styles.valueCell}>$49.00</td>
                            <td style={{ textAlign: 'right' }}>
                                <button className={styles.actionBtn}>
                                    <span className="material-symbols-outlined">more_horiz</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.tableFooter}>
                    <div className={styles.footerText}>Showing 4 of 12,450 subscriptions</div>
                    <div className={styles.pagination}>
                        <button className={styles.btnPage}>Previous</button>
                        <button className={styles.btnPage}>Next</button>
                    </div>
                </div>
            </section>

        </div>
    )
}
