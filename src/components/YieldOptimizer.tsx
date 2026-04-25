import { useState } from 'react'
import { MOCK_YIELD_DATA, YieldProtocol } from '@/lib/yieldData'
import { cn } from '@/lib/utils'
import { TrendingUp, AlertTriangle, Info } from 'lucide-react'

interface YieldOptimizerProps {
  collateralAmount?: number
}

export function YieldOptimizer({ collateralAmount = 1 }: YieldOptimizerProps) {
  const [selectedProtocol, setSelectedProtocol] = useState<YieldProtocol | null>(null)
  const [riskFilter, setRiskFilter] = useState<'low' | 'medium' | 'high' | 'all'>('all')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const filteredProtocols = MOCK_YIELD_DATA.filter(p => {
    if (riskFilter === 'all') return true
    return p.risk === riskFilter
  })

  const topRecommendation = filteredProtocols.sort((a, b) => b.apy - a.apy)[0]

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setSelectedProtocol(topRecommendation)
    }, 1500)
  }

  return (
    <div className="bg-surface rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-white">AI Yield Optimizer</h3>
          <p className="text-xs text-slate-400">Auto-park collateral di protocol terbaik</p>
        </div>
      </div>

      {/* Risk Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'low', 'medium', 'high'] as const).map(risk => (
          <button
            key={risk}
            onClick={() => setRiskFilter(risk)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
              riskFilter === risk
                ? risk === 'low' ? 'bg-secondary/20 text-secondary' :
                  risk === 'medium' ? 'bg-accent/20 text-accent' :
                  risk === 'high' ? 'bg-red-500/20 text-red-400' :
                  'bg-primary/20 text-primary'
                : 'bg-background text-slate-400 hover:text-white'
            )}
          >
            {risk === 'all' ? 'Semua' : risk.charAt(0).toUpperCase() + risk.slice(1)}
          </button>
        ))}
      </div>

      {/* Top Recommendation */}
      {topRecommendation && (
        <div className="bg-background rounded-lg p-4 mb-6 border border-primary/30">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs text-primary mb-1">REKOMENDASI AI</p>
              <h4 className="font-semibold text-white">{topRecommendation.name}</h4>
            </div>
            <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-bold">
              {topRecommendation.apy}% APY
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-4">{topRecommendation.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-surface rounded-lg">
              <p className="text-xs text-slate-500">TVL</p>
              <p className="font-medium text-white">{topRecommendation.tvl}</p>
            </div>
            <div className="text-center p-2 bg-surface rounded-lg">
              <p className="text-xs text-slate-500">Risk</p>
              <p className={cn(
                'font-medium',
                topRecommendation.risk === 'low' ? 'text-secondary' :
                topRecommendation.risk === 'medium' ? 'text-accent' : 'text-red-400'
              )}>
                {topRecommendation.risk.charAt(0).toUpperCase() + topRecommendation.risk.slice(1)}
              </p>
            </div>
            <div className="text-center p-2 bg-surface rounded-lg">
              <p className="text-xs text-slate-500">Type</p>
              <p className="font-medium text-white">{topRecommendation.type}</p>
            </div>
          </div>

          {/* Projected Yield */}
          <div className="bg-surface/50 rounded-lg p-3 mb-4">
            <p className="text-xs text-slate-400 mb-2">Estimasi Yield untuk {collateralAmount} MON:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Bulanan:</span>
                <span className="text-secondary font-mono">
                  {(collateralAmount * topRecommendation.apy / 100 / 12).toFixed(4)} MON
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Per 6 bulan:</span>
                <span className="text-secondary font-mono">
                  {(collateralAmount * Math.pow(1 + topRecommendation.apy / 100 / 12, 6) - collateralAmount).toFixed(4)} MON
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={cn(
              'w-full py-3 rounded-lg font-medium transition-all',
              'bg-primary hover:bg-primary/90 text-white',
              'disabled:opacity-50'
            )}
          >
            {isAnalyzing ? (
              <span className="animate-pulse">Menganalisis...</span>
            ) : (
              `Park Collateral di ${topRecommendation.name}`
            )}
          </button>
        </div>
      )}

      {/* All Protocols */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">Protocol Lainnya</p>
          <button className="text-xs text-primary hover:underline">Lihat semua</button>
        </div>

        {filteredProtocols.slice(0, 4).map((protocol) => (
          <ProtocolRow
            key={protocol.protocol}
            protocol={protocol}
            isSelected={selectedProtocol?.protocol === protocol.protocol}
            onClick={() => setSelectedProtocol(protocol)}
          />
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 flex gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-300">
          AI secara otomatis akan memindahkan collateral ke protocol dengan yield tertinggi
          jika ada protocol baru dengan APY lebih tinggi.
        </p>
      </div>
    </div>
  )
}

function ProtocolRow({
  protocol,
  isSelected,
  onClick,
}: {
  protocol: YieldProtocol
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-3 rounded-lg border transition-all text-left',
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-slate-700 bg-background hover:border-slate-600'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
            protocol.risk === 'low' ? 'bg-secondary/20 text-secondary' :
            protocol.risk === 'medium' ? 'bg-accent/20 text-accent' :
            'bg-red-500/20 text-red-400'
          )}>
            {protocol.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-white text-sm">{protocol.name}</p>
            <p className="text-xs text-slate-500">{protocol.tvl}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-secondary font-mono">{protocol.apy}%</p>
          <div className="flex items-center gap-1">
            {protocol.risk === 'high' && <AlertTriangle className="w-3 h-3 text-red-400" />}
            <span className={cn(
              'text-xs',
              protocol.risk === 'low' ? 'text-secondary' :
              protocol.risk === 'medium' ? 'text-accent' : 'text-red-400'
            )}>
              {protocol.risk}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
