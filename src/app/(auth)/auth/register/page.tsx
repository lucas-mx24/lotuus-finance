'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import styles from './register.module.css'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const supabase = createClient()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                },
            },
        })

        if (signUpError) {
            let message = signUpError.message
            if (message.includes('User already registered')) {
                message = 'Este e-mail já está cadastrado.'
            }
            setError(message)
        } else {
            setSuccess(true)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div className={styles.authContainer}>
                <header className={styles.authHeader}>
                    <Link href="/" className={styles.logo}>
                        <div className={styles.logoIcon}>
                            <span className="material-symbols-outlined">account_balance_wallet</span>
                        </div>
                        Lotuus Finance
                    </Link>
                </header>

                <div className={styles.splitCard}>
                    <div className={styles.promoPanel}>
                        <div className={styles.promoImageWrapper}>
                            <img src="/laptop-dashboard.png" alt="Sucesso" />
                        </div>
                        <h2>Verifique seu e-mail</h2>
                        <p>Enviamos um link de confirmação para sua caixa de entrada.</p>
                    </div>
                    <div className={styles.formPanel}>
                        <div className={styles.successMessage}>
                            <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#2d5cf7', marginBottom: '1.5rem' }}>mark_email_read</span>
                            <h1>Quase lá!</h1>
                            <p className={styles.subtitle}>Enviamos um link de confirmação para <strong>{email}</strong>. Verifique sua caixa de entrada para ativar sua conta.</p>
                            <Link href="/auth/login" className={styles.primaryButton} style={{ marginTop: '2rem' }}>
                                Ir para o Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.authContainer}>
            <header className={styles.authHeader}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    Lotuus Finance
                </Link>
                <div className={styles.headerNav}>
                    Já tem uma conta? <Link href="/auth/login">Entrar</Link>
                </div>
            </header>

            <div className={styles.splitCard}>
                <div className={styles.promoPanel}>
                    <div className={styles.promoImageWrapper}>
                        <img
                            src="/laptop-dashboard.png"
                            alt="Dashboard FinanControl"
                        />
                    </div>
                    <h2>Mantenha o foco em suas metas.</h2>
                    <p>Centenas de pessoas utilizam o Lotuus Finance para organizar suas vidas financeiras de forma inteligente e automática.</p>

                    <div className={styles.socialProof}>
                        <div className={styles.avatars}>
                            <img src="https://i.pravatar.cc/100?u=4" alt="User" />
                            <img src="https://i.pravatar.cc/100?u=5" alt="User" />
                            <img src="https://i.pravatar.cc/100?u=6" alt="User" />
                        </div>
                        <div className={styles.proofText}>
                            <strong>+2.400 usuários</strong>
                            Já estão economizando
                        </div>
                    </div>
                </div>

                <div className={styles.formPanel}>
                    <h1>Criar sua conta</h1>
                    <p className={styles.subtitle}>Junte-se a nós para gerenciar suas finanças</p>

                    <div className={styles.socialLogin}>
                        <button className={styles.googleButton}>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPfq8dabVl5uFWNnOFOkQWq0dqzT4cBlu0C3V853wLWUJCioPd7vHm8hV1FS5A3R8RmT-CdkTZyTjRsMDyzGkzZoI83WS93hXJFKwSy_7W_kxVS0M0KxDE9tduXsqjqFVFDmPOpbOL6EIIoYym6m70tQdigGq1myNIRWmfT74Ew76RxOSdP_nXOc5cQfgPLMFC9YbZezMZNJWZROachSmJV8xQt5w5hdgTIJ8RmzLwWooznqQJSxI45yz3xR-bAEmhSZq-T1h7GTM" alt="Google" />
                            Cadastre-se com Google
                        </button>
                    </div>

                    <div className={styles.divider}>OU USE SEU E-MAIL</div>

                    <form className={styles.authForm} onSubmit={handleRegister}>
                        <div className={styles.formGroup}>
                            <label>Nome Completo</label>
                            <div className={styles.inputWrapper}>
                                <i className="material-symbols-outlined">person</i>
                                <input
                                    type="text"
                                    placeholder="Como quer ser chamado?"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>E-mail</label>
                            <div className={styles.inputWrapper}>
                                <i className="material-symbols-outlined">mail</i>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Senha</label>
                            <div className={styles.inputWrapper}>
                                <i className="material-symbols-outlined">lock</i>
                                <input
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <button className={styles.primaryButton} type="submit" disabled={loading}>
                            {loading ? <div className={styles.spinner}></div> : 'Criar minha conta'}
                        </button>
                    </form>

                    <p className={styles.terms}>
                        Ao continuar, você concorda com nossos <Link href="#">Termos de Uso</Link> e <Link href="#">Privacidade</Link>.
                    </p>
                </div>
            </div>
        </div>
    )
}
