'use client'

import React from 'react'
import styles from './page.module.css'

export default function SettingsPage() {
    return (
        <div className={styles.pageContainer}>

            {/* Header */}
            <header className={styles.pageHeader}>
                <div className={styles.titleWrapper}>
                    <h1>Configurações da Plataforma</h1>
                    <p>Gerencie as configurações e preferências da sua plataforma SaaS.</p>
                </div>
                <button className={styles.btnPrimary}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                    Salvar Alterações
                </button>
            </header>

            <div className={styles.settingsGrid}>

                {/* General Settings */}
                <div className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Informações Gerais</h3>
                            <p className={styles.cardDesc}>Detalhes básicos da plataforma visíveis aos usuários.</p>
                        </div>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Nome da Plataforma</label>
                            <input type="text" defaultValue="Lotuus Finance" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>E-mail de Suporte</label>
                            <input type="email" defaultValue="suporte@lotuus.com.br" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Moeda Padrão</label>
                            <select defaultValue="BRL">
                                <option value="BRL">BRL - Real Brasileiro</option>
                                <option value="USD">USD - US Dollar</option>
                                <option value="EUR">EUR - Euro</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Fuso Horário</label>
                            <select defaultValue="America/Sao_Paulo">
                                <option value="America/Sao_Paulo">America/Sao_Paulo (BRT)</option>
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">America/New_York (ET)</option>
                            </select>
                        </div>
                        <div className={styles.fieldGroupFull}>
                            <label>Descrição da Plataforma</label>
                            <textarea defaultValue="Lotuus Finance - Gestão Financeira Inteligente. Controle seus investimentos, simule cenários FIRE e gerencie suas finanças pessoais." />
                            <span className={styles.fieldHint}>Exibido nas meta tags e páginas públicas.</span>
                        </div>
                    </div>
                </div>

                {/* Subscription Settings */}
                <div className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Planos de Assinatura</h3>
                            <p className={styles.cardDesc}>Configure preços e recursos dos planos.</p>
                        </div>
                    </div>
                    <div className={styles.formGrid}>
                        <div className={styles.fieldGroup}>
                            <label>Preço Plano Essencial</label>
                            <input type="text" defaultValue="R$ 19,00 / mês" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Preço Plano Pro</label>
                            <input type="text" defaultValue="R$ 49,00 / mês" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Preço Plano Elite</label>
                            <input type="text" defaultValue="R$ 129,00 / mês" />
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Duração do Trial Gratuito</label>
                            <input type="text" defaultValue="7 dias" />
                            <span className={styles.fieldHint}>Número de dias para trial de novos usuários.</span>
                        </div>
                    </div>
                </div>

                {/* Notifications & Emails */}
                <div className={styles.settingsCard}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle}>Notificações e Alertas</h3>
                            <p className={styles.cardDesc}>Configure notificações por e-mail e do sistema.</p>
                        </div>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>Novo Cadastro de Usuário</h4>
                            <p>Receber e-mail quando um novo usuário se registrar.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>Cancelamento de Assinatura</h4>
                            <p>Alertar quando um usuário cancelar a assinatura.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>Falha de Pagamento</h4>
                            <p>Notificar quando um pagamento recorrente falhar.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input type="checkbox" defaultChecked />
                            <span className={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>E-mail Semanal de Análise</h4>
                            <p>Receber um resumo semanal das métricas da plataforma.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input type="checkbox" />
                            <span className={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div className={styles.toggleRow}>
                        <div className={styles.toggleInfo}>
                            <h4>Modo de Manutenção</h4>
                            <p>Exibir página de manutenção para todos os usuários.</p>
                        </div>
                        <label className={styles.toggle}>
                            <input type="checkbox" />
                            <span className={styles.toggleSlider}></span>
                        </label>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className={`${styles.settingsCard} ${styles.dangerZone}`}>
                    <div className={styles.cardHeader}>
                        <div>
                            <h3 className={styles.cardTitle} style={{ color: '#dc2626' }}>Zona de Perigo</h3>
                            <p className={styles.cardDesc}>Ações irreversíveis e destrutivas.</p>
                        </div>
                    </div>
                    <div className={styles.dangerActions}>
                        <button className={styles.btnDanger}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete_sweep</span>
                            Limpar Usuários Inativos
                        </button>
                        <button className={styles.btnDanger}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
                            Resetar Análises
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
