# Armon - Decentralized Arisan on Monad

**Armon** adalah decentralized arisan (community savings pool) di blockchain Monad dengan collateral-based security dan AI-powered yield optimization. Mengambil ide dari arisan tradisional Indonesia yang dimodernisasi dengan smart contract untuk trustless execution.

## Features

- **Collateral 125%** - Setiap peserta deposit collateral sejumlah 125% dari iuran bulanan untuk keamanan pool
- **AI Yield Optimizer** - AI secara otomatis mencari yield tertinggi di ekosistem Monad DeFi untuk collateral peserta
- **Trustless Execution** - Semua rules dijalankan oleh smart contract, tidak ada intermediary
- **Voting System** - Peserta bisa vote untuk memilih pemenang atau gunakan random draw

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Smart Contract**: Solidity (Foundry)
- **Blockchain**: Monad
- **AI**: Rule-based yield optimizer

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Foundry (for smart contract)

### Installation

```bash
# Clone the repository
git clone https://github.com/ARMONTeam/Armon.git
cd Armon

# Install dependencies
npm install

# Build the project
npm run build
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Smart Contract

```bash
# Compile contracts
forge build

# Deploy to local network
forge script script/Deploy.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Project Structure

```
Armon/
├── contracts/           # Solidity smart contracts
│   └── Armon.sol       # Main arisan contract
├── src/
│   ├── components/     # React components
│   │   ├── AIChatWidget.tsx
│   │   ├── YieldOptimizer.tsx
│   │   └── ...
│   ├── lib/           # Utilities
│   │   ├── aiAssistant.ts
│   │   ├── yieldData.ts
│   │   └── ...
│   ├── pages/         # Route pages
│   └── App.tsx
├── SPEC.md             # Full specification
└── README.md
```

## How It Works

1. **Create Pool** - Pool owner membuat arisan pool dengan rules (iuran, periode, max peserta)
2. **Join Pool** - Peserta deposit collateral 125% dari iuran
3. **Pay Iuran** - Peserta bayar iuran bulanan setiap tanggal 1-10
4. **Draw Winner** - Diundi setiap tanggal 25 (random atau voting)
5. **Claim Prize** - Pemenang klaim hadiah
6. **Withdraw** - Collateral + yield dikembalikan setelah pool selesai

## AI Yield Optimization

Armon AI secara otomatis:
- Memantau yield protocols di ekosistem Monad
- Memberikan rekomendasi yield tertinggi berdasarkan risk preference
- Auto-park collateral ke protocol terbaik

## License

MIT

## Authors

Built for Monad Blitz Jogja 2026
