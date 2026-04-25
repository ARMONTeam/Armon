import { Link } from 'react-router-dom'
import { cn, truncateAddress, formatEther } from '@/lib/utils'
import { Pool } from '@/lib/types'

interface PoolCardProps {
  pool: Pool
  className?: string
}

export function PoolCard({ pool, className }: PoolCardProps) {
  const participantCount = pool.participants?.length || 0
  const isFull = participantCount >= pool.maxParticipants

  return (
    <Link
      to={`/pool/${pool.id}`}
      className={cn(
        'block bg-surface rounded-xl p-4 border border-slate-700',
        'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10',
        'transition-all duration-200 card-hover',
        className
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-white">{pool.name}</h3>
        <StatusBadge status={getPoolStatus(pool)} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-slate-400">Iuran</p>
          <p className="text-secondary font-mono font-medium">
            {formatEther(pool.iuranAmount)} MON
          </p>
        </div>
        <div>
          <p className="text-slate-400">Peserta</p>
          <p className="text-white font-medium">
            {participantCount}/{pool.maxParticipants}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Periode</p>
          <p className="text-white font-medium">
            {pool.currentPeriod}/{pool.totalPeriods}
          </p>
        </div>
        <div>
          <p className="text-slate-400">Hadiah</p>
          <p className="text-accent font-mono font-medium">
            {formatEther(pool.iuranAmount * BigInt(participantCount))} MON
          </p>
        </div>
      </div>

      {/* Participant Avatars */}
      <div className="flex -space-x-2 mt-4">
        {pool.participants?.slice(0, 5).map((p, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-primary/20 border-2 border-surface flex items-center justify-center text-xs text-primary"
            title={p.wallet}
          >
            {truncateAddress(p.wallet).slice(0, 2).toUpperCase()}
          </div>
        ))}
        {participantCount > 5 && (
          <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-surface flex items-center justify-center text-xs text-slate-300">
            +{participantCount - 5}
          </div>
        )}
      </div>

      {isFull && (
        <p className="text-xs text-slate-500 mt-2 text-right">Pool penuh</p>
      )}
    </Link>
  )
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        {
          'bg-secondary/20 text-secondary': status === 'active',
          'bg-accent/20 text-accent': status === 'pending',
          'bg-slate-600/20 text-slate-400': status === 'completed',
          'bg-primary/20 text-primary': status === 'drawing',
        }
      )}
    >
      {status === 'active' && 'Aktif'}
      {status === 'pending' && 'Menunggu Bayar'}
      {status === 'completed' && 'Selesai'}
      {status === 'drawing' && 'Undian'}
    </span>
  )
}

function getPoolStatus(pool: Pool): string {
  if (!pool.isActive) return 'completed'
  const allPaid = pool.participants?.every(p => p.paidThisPeriod)
  if (allPaid) return 'drawing'
  if (pool.participants?.some(p => p.paidThisPeriod)) return 'pending'
  return 'active'
}
