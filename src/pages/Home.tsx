import { Link } from 'react-router-dom'
import { WalletButton } from '@/components/WalletButton'
import { PoolCard } from '@/components/PoolCard'
import { Button } from '@/components/ui/Button'
import { AIChatWidget } from '@/components/AIChatWidget'
import { COLLATERAL_BPS } from '@/lib/constants'
import { Pool } from '@/lib/types'
import { Plus, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react'

// Mock data for demo
const mockPools: Pool[] = [
  {
    id: 0,
    name: 'Arisan RT05 Tanah Abang',
    iuranAmount: BigInt('5000000000000000000'),
    maxParticipants: 6,
    collateralBps: COLLATERAL_BPS,
    participants: [
      { wallet: '0x1234567890123456789012345678901234567890', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
      { wallet: '0x2345678901234567890123456789012345678901', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
      { wallet: '0x3456789012345678901234567890123456789012', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: false, joinPeriod: 1 },
      { wallet: '0x4567890123456789012345678901234567890123', collateralDeposited: BigInt('6250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: false, joinPeriod: 1 },
    ],
    currentPeriod: 2,
    totalPeriods: 6,
    isActive: true,
    owner: '0x1234567890123456789012345678901234567890',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    lastDrawAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    accumulatedYield: BigInt('250000000000000000'),
  },
  {
    id: 1,
    name: 'Arisan Kantor区块',
    iuranAmount: BigInt('1000000000000000000'),
    maxParticipants: 4,
    collateralBps: COLLATERAL_BPS,
    participants: [
      { wallet: '0x5678901234567890123456789012345678901234', collateralDeposited: BigInt('1250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
      { wallet: '0x6789012345678901234567890123456789012345', collateralDeposited: BigInt('1250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
      { wallet: '0x7890123456789012345678901234567890123456', collateralDeposited: BigInt('1250000000000000000'), yieldAccrued: BigInt('0'), hasWon: false, paidThisPeriod: true, joinPeriod: 1 },
    ],
    currentPeriod: 1,
    totalPeriods: 4,
    isActive: true,
    owner: '0x5678901234567890123456789012345678901234',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    lastDrawAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    accumulatedYield: BigInt('50000000000000000'),
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold gradient-text">Armon</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Arisan On-Chain</span>
            <br />
            <span className="text-white">Trustless Execution</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8">
            Community savings pool dengan collateral 125% untuk keamanan.
            Dapatkan yield dari collateral sambil participates dalam arisan tradisional Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="w-5 h-5" />
                Buat Pool Baru
              </Button>
            </Link>
            <Link to="#pools">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Browse Pool
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-surface/50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Cara Kerja Armon</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Buat Pool</h3>
              <p className="text-slate-400 text-sm">
                Tentukan nama, jumlah iuran, dan maksimal peserta.
                Collaterall 125% dari iuran ditambahkan oleh setiap peserta.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Bayar Iuran</h3>
              <p className="text-slate-400 text-sm">
                Bayar iuran bulanan tanggal 1-10.
                Collateral kamu accruing yield 5% APY setiap bulan.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Dapat Hadiah</h3>
              <p className="text-slate-400 text-sm">
                Undian random atau voting memilih pemenang.
                Pemenang dapat total iuran semua peserta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Pools */}
      <section id="pools" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Pool Aktif</h2>
            <Link to="/create">
              <Button variant="accent" size="sm">
                <Plus className="w-4 h-4" />
                Buat Pool Baru
              </Button>
            </Link>
          </div>

          {mockPools.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPools.map(pool => (
                <PoolCard key={pool.id} pool={pool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface rounded-xl">
              <p className="text-slate-400 mb-4">Belum ada pool aktif</p>
              <Link to="/create">
                <Button>Buat Pool Pertama</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          <p>Built for Monad Blitz Jogja 2026</p>
          <p className="mt-1">Armon - Decentralized Arisan Protocol</p>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChatWidget />
    </div>
  )
}
