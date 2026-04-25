import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { WalletButton } from '@/components/WalletButton'
import { Button } from '@/components/ui/Button'
import { AIChatWidget } from '@/components/AIChatWidget'
import { COLLATERAL_BPS } from '@/lib/constants'
import { truncateAddress } from '@/lib/utils'
import { Pool, Participant } from '@/lib/types'
import { ArrowLeft, Clock, Trophy, Vote, Wallet, CheckCircle } from 'lucide-react'

// Mock pool data
const mockPool: Pool = {
  id: 0,
  name: 'Arisan RT05 Tanah Abang',
  iuranAmount: BigInt('5000000000000000000'),
  maxParticipants: 6,
  collateralBps: COLLATERAL_BPS,
  participants: [
    { wallet: '0x1234567890123456789012345678901234567890', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('250000000000000000'), hasWon: true, paidThisPeriod: false, joinPeriod: 1 },
    { wallet: '0x2345678901234567890123456789012345678901', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('250000000000000000'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
    { wallet: '0x3456789012345678901234567890123456789012', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
    { wallet: '0x4567890123456789012345678901234567890123', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: false, joinPeriod: 1 },
  ],
  currentPeriod: 2,
  totalPeriods: 6,
  isActive: true,
  owner: '0x1234567890123456789012345678901234567890',
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
  lastDrawAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
  accumulatedYield: BigInt('500000000000000000'),
}

export default function PoolDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pool] = useState<Pool>(mockPool)

  const collateralRequired = Number(pool.iuranAmount) * pool.collateralBps / 10000
  const prizeAmount = Number(pool.iuranAmount) * pool.participants.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-surface rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div>
              <h1 className="font-semibold text-white">{pool.name}</h1>
              <p className="text-sm text-slate-400">Pool #{id}</p>
            </div>
          </div>
          <WalletButton />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pool Info Card */}
            <div className="bg-surface rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">Informasi Pool</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-slate-400 text-sm">Iuran Bulanan</p>
                  <p className="text-xl font-bold text-secondary font-mono">
                    {Number(pool.iuranAmount) / 1e18} MON
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Periode</p>
                  <p className="text-xl font-bold text-white">
                    {pool.currentPeriod}/{pool.totalPeriods}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Peserta</p>
                  <p className="text-xl font-bold text-white">
                    {pool.participants.length}/{pool.maxParticipants}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Hadiah</p>
                  <p className="text-xl font-bold text-accent font-mono">
                    {prizeAmount / 1e18} MON
                  </p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="bg-surface rounded-xl p-6 border border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Peserta</h2>
                <span className="text-sm text-slate-400">
                  {pool.participants.length} of {pool.maxParticipants}
                </span>
              </div>
              <div className="grid gap-3">
                {pool.participants.map((p, i) => (
                  <ParticipantRow key={i} participant={p} />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-surface rounded-xl p-6 border border-slate-700">
              <h2 className="text-lg font-semibold mb-4">Aksi</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button size="lg" className="w-full">
                  <Vote className="w-5 h-5" />
                  Vote Pemenang
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                  <Trophy className="w-5 h-5" />
                  Draw Winner
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <div className="bg-surface rounded-xl p-6 border border-slate-700 sticky top-6">
              <h3 className="font-semibold mb-4">Ikut Arisan</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Collateral</span>
                  <span className="text-white font-mono">{collateralRequired / 1e18} MON</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Yield (5% APY)</span>
                  <span className="text-secondary font-mono">+{(collateralRequired * 0.05) / 1e18} MON/tahun</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between text-sm">
                  <span className="text-slate-400">Total Deposit</span>
                  <span className="text-accent font-bold font-mono">{collateralRequired / 1e18} MON</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                <Wallet className="w-5 h-5" />
                Join Pool
              </Button>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Collateral 125% dikembalikan di akhir arisan
              </p>
            </div>

            {/* Timeline */}
            <div className="bg-surface rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold mb-4">Jadwal</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Periode 1</p>
                    <p className="text-xs text-slate-400">Selesai - Winner: 0x1234...7890</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Periode 2</p>
                    <p className="text-xs text-slate-400">Berlangsung - Bayar sebelum 10 April</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-slate-400">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Periode 3-6</p>
                    <p className="text-xs text-slate-500">Belum dimulai</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AIChatWidget />
    </div>
  )
}

function ParticipantRow({ participant }: { participant: Participant }) {
  return (
    <div className="flex items-center justify-between p-3 bg-background rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm ${
          participant.hasWon
            ? 'bg-accent/20 text-accent'
            : 'bg-primary/20 text-primary'
        }`}>
          {participant.wallet.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <p className="font-mono text-sm">{truncateAddress(participant.wallet)}</p>
          <p className="text-xs text-slate-400">
            Yield: {Number(participant.yieldAccrued) / 1e18} MON
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {participant.hasWon && (
          <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full font-medium">
            Winner!
          </span>
        )}
        {participant.paidThisPeriod && !participant.hasWon && (
          <CheckCircle className="w-5 h-5 text-secondary" />
        )}
      </div>
    </div>
  )
}
