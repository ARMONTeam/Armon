import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalletButton } from '@/components/WalletButton'
import { Button } from '@/components/ui/Button'
import { AIChatWidget } from '@/components/AIChatWidget'
import { ArrowLeft, Info } from 'lucide-react'

interface PoolConfig {
  name: string
  iuranAmount: string
  maxParticipants: number
  totalPeriods: number
}

export default function CreatePool() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<PoolConfig>({
    name: '',
    iuranAmount: '1',
    maxParticipants: 4,
    totalPeriods: 6,
  })
  const [isDeploying, setIsDeploying] = useState(false)

  const collateralRequired = parseFloat(config.iuranAmount) * 1.25
  const prizePerWinner = parseFloat(config.iuranAmount) * config.maxParticipants

  const handleDeploy = () => {
    setIsDeploying(true)
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false)
      navigate('/pool/0')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-surface rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <span className="text-lg font-semibold">Buat Pool Baru</span>
          </div>
          <WalletButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-surface rounded-xl p-6 border border-slate-700">
          {/* Pool Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nama Pool
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Contoh: Arisan RT05 Tanah Abang"
              className="w-full px-4 py-3 bg-background border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Iuran Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Iuran Bulanan (MON)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={config.iuranAmount}
                onChange={(e) => setConfig({ ...config, iuranAmount: e.target.value })}
                placeholder="1"
                className="w-full px-4 py-3 bg-background border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-primary font-mono"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                MON
              </span>
            </div>
          </div>

          {/* Max Participants */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Maksimal Peserta
            </label>
            <select
              value={config.maxParticipants}
              onChange={(e) => setConfig({ ...config, maxParticipants: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-background border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              {[3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50].map(n => (
                <option key={n} value={n}>{n} peserta</option>
              ))}
            </select>
          </div>

          {/* Total Periods */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Total Periode (Bulan)
            </label>
            <select
              value={config.totalPeriods}
              onChange={(e) => setConfig({ ...config, totalPeriods: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-background border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                <option key={n} value={n}>{n} bulan</option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div className="bg-background rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-slate-300 mb-4">Preview Pool</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Collateral per peserta</p>
                <p className="text-lg font-bold text-secondary font-mono">
                  {collateralRequired} MON
                </p>
              </div>
              <div>
                <p className="text-slate-400">Hadiah per winner</p>
                <p className="text-lg font-bold text-accent font-mono">
                  {prizePerWinner} MON
                </p>
              </div>
              <div>
                <p className="text-slate-400">Total hadiah pool</p>
                <p className="text-lg font-bold text-primary font-mono">
                  {prizePerWinner * config.totalPeriods} MON
                </p>
              </div>
              <div>
                <p className="text-slate-400">Durasi</p>
                <p className="text-lg font-bold text-white">
                  {config.totalPeriods} bulan
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <p className="mb-2">
                  <strong className="text-white">Collateral 125%</strong> - Setiap peserta harus deposit collateral sejumlah 125% dari iuran bulanan untuk keamanan pool.
                </p>
                <p>
                  Collateral akan dikembalikan beserta yield (5% APY) setelah arisan selesai atau setelah peserta mendapat giliran.
                </p>
              </div>
            </div>
          </div>

          {/* Deploy Button */}
          <Button
            onClick={handleDeploy}
            disabled={!config.name || isDeploying}
            className="w-full"
            size="lg"
          >
            {isDeploying ? (
              <span className="animate-pulse">Deploying...</span>
            ) : (
              'Deploy Pool'
            )}
          </Button>
        </div>
      </div>

      <AIChatWidget />
    </div>
  )
}
