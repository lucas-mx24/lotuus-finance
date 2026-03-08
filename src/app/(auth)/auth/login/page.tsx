'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '../register/register.module.css'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (loginError) {
            let message = 'E-mail ou senha incorretos. Por favor, tente novamente.'
            if (loginError.message.includes('Email not confirmed')) {
                message = 'Por favor, confirme seu e-mail antes de entrar.'
            }
            setError(message)
        } else {
            router.push('/')
            router.refresh()
        }
        setLoading(false)
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
                    Não tem uma conta? <Link href="/auth/register">Criar conta</Link>
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
                            <img src="https://i.pravatar.cc/100?u=1" alt="User" />
                            <img src="https://i.pravatar.cc/100?u=2" alt="User" />
                            <img src="https://i.pravatar.cc/100?u=3" alt="User" />
                        </div>
                        <div className={styles.proofText}>
                            <strong>+2.400 usuários</strong>
                            Já estão economizando
                        </div>
                    </div>
                </div>

                <div className={styles.formPanel}>
                    <h1>Bem-vindo de volta</h1>
                    <p className={styles.subtitle}>Acesse sua conta para gerenciar suas finanças</p>

                    <div className={styles.socialLogin}>
                        <button className={styles.googleButton}>
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPfq8dabVl5uFWNnOFOkQWq0dqzT4cBlu0C3V853wLWUJCioPd7vHm8hV1FS5A3R8RmT-CdkTZyTjRsMDyzGkzZoI83WS93hXJFKwSy_7W_kxVS0M0KxDE9tduXsqjqFVFDmPOpbOL6EIIoYym6m70tQdigGq1myNIRWmfT74Ew76RxOSdP_nXOc5cQfgPLMFC9YbZezMZNJWZROachSmJV8xQt5w5hdgTIJ8RmzLwWooznqQJSxI45yz3xR-bAEmhSZq-T1h7GTM" alt="Google" />
                            Entrar com Google
                        </button>
                    </div>

                    <div className={styles.divider}>OU USE SEU E-MAIL</div>

                    <form className={styles.authForm} onSubmit={handleLogin}>
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
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className={styles.passwordToggle}>
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.formOptions}>
                            <label className={styles.rememberMe}>
                                <input type="checkbox" />
                                Lembrar de mim
                            </label>
                            <Link href="#" className={styles.forgotPassword}>Esqueceu a senha?</Link>
                        </div>

                        {error && <p className={styles.errorMessage}>{error}</p>}

                        <button className={styles.primaryButton} type="submit" disabled={loading}>
                            {loading ? <div className={styles.spinner}></div> : 'Entrar na conta'}
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
