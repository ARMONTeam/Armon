import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/Button'
import { Wallet, LogOut } from 'lucide-react'
import { truncateAddress } from '@/lib/utils'

export function WalletButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isPending) {
    return (
      <Button variant="primary" disabled>
        <span className="animate-pulse">Connecting...</span>
      </Button>
    )
  }

  if (isConnected && address) {
    return (
      <Button variant="secondary" onClick={() => disconnect()}>
        <Wallet className="w-4 h-4" />
        <span className="font-mono text-sm">{truncateAddress(address)}</span>
        <LogOut className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <Button
          key={connector.uid}
          variant="primary"
          onClick={() => connect({ connector })}
          className="btn-press"
        >
          <Wallet className="w-4 h-4" />
          Connect {connector.name}
        </Button>
      ))}
    </div>
  )
}
