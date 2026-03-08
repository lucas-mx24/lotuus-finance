'use client'

import { useState, useRef } from 'react'
import styles from './page.module.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Mock Data for the Report
const reportData = {
    date: new Date().toLocaleDateString('pt-BR'),
    totalAssets: 154200.50,
    monthlyIncome: 14500.00,
    monthlyExpenses: 6850.00,
    recentTransactions: [
        { id: 1, date: '05/03/2026', description: 'Salário Lotuus Tech', type: 'in', amount: 14500.00 },
        { id: 2, date: '04/03/2026', description: 'Aluguel do Escritório', type: 'out', amount: 3500.00 },
        { id: 3, date: '02/03/2026', description: 'Conta de Lúz', type: 'out', amount: 250.00 },
        { id: 4, date: '01/03/2026', description: 'Supermercado', type: 'out', amount: 1200.00 },
        { id: 5, date: '28/02/2026', description: 'Dividendos FIIs', type: 'in', amount: 840.50 },
    ],
    allocations: [
        { asset: 'Renda Fixa (CDI)', amount: 85000 },
        { asset: 'Ações BR (B3)', amount: 45200.50 },
        { asset: 'Fundos Imobiliários', amount: 24000 },
    ]
}

export default function ReportsPage() {
    const printRef = useRef<HTMLDivElement>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleDownloadPDF = async () => {
        const element = printRef.current
        if (!element) return

        try {
            setIsGenerating(true)

            // Capture the DOM element as a canvas
            // Use scale 2 for better text rendering resolution
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false, // Turn off noisy console logs
                backgroundColor: '#ffffff'
            })

            const imgData = canvas.toDataURL('image/png')

            // A4 dimensions: 210mm x 297mm
            const pdf = new jsPDF('p', 'mm', 'a4')
            const pdfWidth = pdf.internal.pageSize.getWidth()
            // Calculate height proportionately based on canvas aspect ratio
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width

            // Add the image filling the top of the A4 page
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

            // Trigger download
            pdf.save(`Extrato_Lotuus_${reportData.date.replace(/\//g, '-')}.pdf`)

        } catch (error) {
            console.error('Error generating PDF:', error)
            alert('Falha ao gerar o PDF. Verifique o console.')
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className={styles.container}>
            {isGenerating && (
                <div className={styles.loadingOverlay}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>autorenew</span>
                    <p style={{ marginTop: '1rem' }}>Gerando Relatório de Alta Qualidade...</p>
                </div>
            )}

            <header className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1>Central de Relatórios</h1>
                    <p>Exporte em PDF o consolidade financeiro com seus últimos indicadores.</p>
                </div>
                <button
                    className={styles.actionBtn}
                    onClick={handleDownloadPDF}
                    disabled={isGenerating}
                >
                    <span className="material-symbols-outlined">download</span>
                    {isGenerating ? 'Gerando...' : 'Baixar PDF A4'}
                </button>
            </header>

            <div className={styles.previewWrapper}>
                {/* 
                  This div is the actual target for HTML2Canvas.
                  It represents a fixed 800px wide "Paper". 
                */}
                <div className={styles.pdfTemplate} ref={printRef} id="pdf-report-content">

                    <div className={styles.reportHeader}>
                        <div className={styles.brand}>
                            <div className={styles.brandIcon}>
                                <span className="material-symbols-outlined">account_balance_wallet</span>
                            </div>
                            <span className={styles.brandText}>Lotuus Finance</span>
                        </div>
                        <div className={styles.reportMeta}>
                            <h2 className={styles.reportTitle}>Extrato Consolidado</h2>
                            <p className={styles.reportDate}>Posição base: {reportData.date}</p>
                        </div>
                    </div>

                    <div className={styles.kpiGrid}>
                        <div className={styles.kpiBox}>
                            <p className={styles.kpiLabel}>Patrimônio Total</p>
                            <p className={`${styles.kpiValue} ${styles.valPrimary}`}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reportData.totalAssets)}
                            </p>
                        </div>
                        <div className={styles.kpiBox}>
                            <p className={styles.kpiLabel}>Receitas do Mês</p>
                            <p className={`${styles.kpiValue} ${styles.valSuccess}`}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reportData.monthlyIncome)}
                            </p>
                        </div>
                        <div className={styles.kpiBox}>
                            <p className={styles.kpiLabel}>Despesas do Mês</p>
                            <p className={`${styles.kpiValue} ${styles.valNeutral}`}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reportData.monthlyExpenses)}
                            </p>
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle}>Últimas Movimentações (Mês Corrente)</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrição</th>
                                <th style={{ textAlign: 'right' }}>Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.recentTransactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>{tx.date}</td>
                                    <td>{tx.description}</td>
                                    <td style={{ textAlign: 'right' }} className={tx.type === 'in' ? styles.amountIn : styles.amountOut}>
                                        {tx.type === 'in' ? '+' : '-'} {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tx.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3 className={styles.sectionTitle}>Alocação e Conta Corrente</h3>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Classe de Ativo / Local</th>
                                <th style={{ textAlign: 'right' }}>Saldo Reservado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.allocations.map((alloc, i) => (
                                <tr key={i}>
                                    <td>{alloc.asset}</td>
                                    <td style={{ textAlign: 'right', fontWeight: 500, color: '#0f172a' }}>
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alloc.amount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.reportFooter}>
                        Este documento foi gerado automaticamente por Lotuus Finance em {reportData.date}.<br />
                        A validação legal ou fiscal depende da conferência junto às instituições bancárias.
                    </div>
                </div>
            </div>

            {/* A small global style specific to this page for the spinner if needed, though best kept in global.css */}
            <style jsx global>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
