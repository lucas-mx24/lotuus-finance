'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import styles from './add-transaction.module.css' // Reusing some base styles

export default function AddAssetModal({ onClose, onSave }: { onClose: () => void, onSave: () => void }) {
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [type, setType] = useState('stock')
    const [color, setColor] = useState('#1754cf')
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
            .from('assets')
            .insert({
                user_id: user.id,
                name,
                value: Number(value),
                type,
                color
            })

        if (error) {
            alert('Erro ao salvar ativo: ' + error.message)
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
                    <h3>Novo Ativo</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Nome do Ativo</label>
                        <input
                            required
                            type="text"
                            placeholder="Ex: PETR4, Bitcoin, CDB Diário..."
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Valor Atual (R$)</label>
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="0,00"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Tipo</label>
                            <select value={type} onChange={e => setType(e.target.value)}>
                                <option value="stock">Ações / ETFs</option>
                                <option value="crypto">Criptomoedas</option>
                                <option value="fixed">Renda Fixa</option>
                                <option value="fii">Fundos Imobiliários</option>
                                <option value="other">Outros</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Cor Identificadora</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                style={{ width: '40px', padding: '2px', height: '40px' }}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Escolha uma cor para os gráficos</span>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Ativo'}
                    </button>
                </form>
            </div>
        </div>
    )
}
