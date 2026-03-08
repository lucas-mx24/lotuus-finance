'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import styles from './add-transaction.module.css'

export default function AddTransactionModal({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState<'income' | 'expense'>('expense')
    const [category, setCategory] = useState('Outros')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [loading, setLoading] = useState(false)

    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            alert('Você precisa estar logado.')
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from('transactions')
            .insert({
                user_id: user.id,
                description,
                amount: Number(amount),
                type,
                category,
                date
            })

        if (error) {
            alert('Erro ao salvar transação: ' + error.message)
        } else {
            onSave()
            onClose()
        }
        setLoading(false)
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Nova Transação</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.typeSwitch}>
                        <button
                            type="button"
                            className={type === 'expense' ? styles.activeExpense : ''}
                            onClick={() => setType('expense')}
                        >
                            Saída
                        </button>
                        <button
                            type="button"
                            className={type === 'income' ? styles.activeIncome : ''}
                            onClick={() => setType('income')}
                        >
                            Entrada
                        </button>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Descrição</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: Aluguel, Salário..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Valor (R$)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Data</label>
                            <input
                                required
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Categoria</label>
                        <select value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="Moradia">Moradia</option>
                            <option value="Alimentação">Alimentação</option>
                            <option value="Transporte">Transporte</option>
                            <option value="Lazer">Lazer</option>
                            <option value="Renda">Renda</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Transação'}
                    </button>
                </form>
            </div>
        </div>
    )
}
