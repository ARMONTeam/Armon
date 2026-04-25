# SPEC.md - Armon

## 1. Concept & Vision

**Armon** adalah decentralized arisan (community savings pool) di blockchain Monad dengan collateral-based security dan AI-powered yield optimization. Mengambil ide dari arisan tradisional Indonesia yang dimodernisasi dengan smart contract untuk trustless execution.

Konsep cerita: Arisan tradisional yang berjalan aman di komunitas (pasar, RT) - sekarang diporting ke web3 dengan collateral 125% yang membuat peserta tidak bisa kabur.

## 2. Design Language

### Aesthetic Direction
- **Mood**: Modern Indonesia - warm, communal, trustworthy
- **Reference**: Grab/Gojek meets DeFi - friendly UX dengan blockchain seriousness

### Color Palette
```
Primary:     #6366F1 (Indigo - trust, security)
Secondary:   #10B981 (Emerald - yield, growth)
Accent:      #F59E0B (Amber - arisan warmth, celebration)
Background:  #0F172A (Dark slate - modern, DeFi-native)
Surface:     #1E293B (Card backgrounds)
Text:        #F8FAFC (Light)
Muted:       #94A3B8 (Secondary text)
```

### Typography
- **Headings**: Inter (700) - clean, professional
- **Body**: Inter (400/500) - readable
- **Mono**: JetBrains Mono - untuk address, numbers

### Motion
- Micro-interactions pada buttons (scale 0.98 on press)
- Smooth transitions 200ms ease-out
- Success animations (confetti-style) untuk winner announcement

## 3. Layout & Structure

### Pages
```
/ (Home)
  ├── Hero: "Arisan On-Chain, Trustless Execution"
  ├── How it Works (3 steps)
  ├── Active Pools List
  └── Create New Pool CTA

/pool/:id (Pool Detail)
  ├── Pool Info (participants, pot, status)
  ├── Participant List
  ├── Vote/Winner Section
  └── Action Buttons

/create (Create Pool)
  ├── Form: name, iuran amount, period, max participants
  └── Preview & Deploy

/dashboard (User Dashboard)
  ├── My Pools (joined/created)
  ├── Pending Payments
  └── Winner History
```

### Responsive Strategy
- Mobile-first (hackathon attendees will use phones)
- Single column on mobile, 2-col on tablet+

## 4. Features & Interactions

### MVP Features (6-Hour)

#### Smart Contract
| Feature | Description | Priority |
|---------|-------------|----------|
| Create Pool | Owner buat arisan pool dengan rules | P0 |
| Join Pool | Participant deposit collateral (125% × iuran) | P0 |
| Random Winner | Chainlink VRF pilih winner tiap period | P0 |
| Manual Vote | Pool admin/participants vote winner (override VRF) | P1 |
| Claim Prize | Winner klaim pot (iuran × participants) | P0 |
| Withdraw Collateral | Participant ambil collateral + yield di akhir | P0 |
| Simple Yield Accrual | Mock yield calculation (5% APY sederhana) | P1 |

#### Frontend
| Feature | Description | Priority |
|---------|-------------|----------|
| Connect Wallet | MetaMask/Monad wallet integration | P0 |
| Create Pool UI | Form untuk buat pool baru | P0 |
| Join Pool UI | Tampilkan pool, button join | P0 |
| Pool Dashboard | List participant, status, countdown | P0 |
| Vote Interface | voting buttons untuk participant | P1 |
| Winner Announcement | Modal/notification untuk winner | P0 |
| Transaction History | List of user's transactions | P1 |

#### AI Feature (Simple)
- **Armon AI Assistant**: Chat interface untuk tanya aturan arisan, status pool, atau tips
- Gunakan API sederhana ( bisa Mock AI response buat MVP)
- Tidak perlu complex ML - cukup rule-based responses

### User Flows

#### Create Pool Flow
1. User connect wallet
2. Klik "Create Pool"
3. Fill form: Pool Name, Iuran Amount (MON), Period (1-12 bulan), Max Participants (3-50)
4. Preview pool rules
5. Deploy contract → transaction pending
6. Success → redirect to pool page

#### Join Pool Flow
1. Browse active pools
2. Klik pool → see details + participants
3. Click "Join Pool"
4. Approve collateral deposit (125% × iuran amount)
5. Wait for confirmation
6. Appear in participant list

#### Monthly Cycle
1. Tanggal 1-10: Participants bayar iuran
2. Tanggal 25: Random draw (VRF) atau vote manual
3. Winner diannounced
4. Winner claim pot
5. Cycle repeat atau pool selesai

### Edge Cases
- **Pool cancelled**: Owner bisa cancel jika < minimum participants setelah grace period
- **Late payment**: Denda yield (opsional, bisa skip di MVP)
- **No winner selected**: Auto-roll VRF setelah 48 jam grace period
- **Contract pause**: Owner bisa pause pool dalam emergency

## 5. Component Inventory

### WalletButton
- States: disconnected (show "Connect Wallet"), connecting, connected (show truncated address + avatar)
- Click: trigger wallet modal

### PoolCard
- Show: pool name, participants count, iuran amount, status badge, time remaining
- States: active (green), pending payment (amber), completed (gray), winner announced (gold)
- Click: navigate to /pool/:id

### ParticipantList
- Grid of avatar circles
- Hover: show wallet address tooltip
- Winner: highlighted with gold border + crown icon

### CreatePoolForm
- Input fields dengan validation
- Submit button dengan loading state
- Success/error toast

### VoteModal
- List participants with vote buttons
- Current votes count
- Confirm/cancel actions

### WinnerModal
- Confetti animation
- Winner address (truncated)
- Prize amount
- Claim button

### AIChatWidget
- Floating button bottom-right
- Chat panel dengan messages
- Input field untuk pertanyaan

## 6. Technical Approach

### Stack
```
Frontend: React + Vite + TailwindCSS
Backend:  None (full on-chain)
Contracts: Solidity (Foundry)
Web3:     wagmi + viem + @rainbow-me/connector (Monad compatible)
AI:       Mock/rule-based (simple JS)
```

### Project Structure
```
Armon/
├── contracts/
│   ├── Armon.sol          # Main contract
│   └── ArmonNFT.sol       # Optional: participation NFT
├── src/
│   ├── components/        # UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route pages
│   ├── lib/               # Utilities, constants
│   ├── App.tsx
│   └── main.tsx
├── test/                   # Contract tests
├── script/                 # Deploy scripts
└── foundry.toml
```

### Smart Contract Design
```solidity
contract Armon {
    // Pool state
    struct Pool {
        string name;
        uint256 iuranAmount;      // per period
        uint256 periodMonths;
        uint256 maxParticipants;
        uint256 collateralBps;    // 12500 = 125%
        Participant[] participants;
        uint256 currentPeriod;
        bool isActive;
    }

    struct Participant {
        address wallet;
        uint256 collateralDeposited;
        uint256 yieldAccrued;
        bool hasWon;
        bool paidThisPeriod;
    }

    // Key functions
    function createPool(name, iuran, period, maxUser) → poolId
    function joinPool(poolId) → deposit collateral
    function payIuran(poolId) → record payment
    function drawWinner(poolId) → VRF call
    function voteWinner(poolId, participantAddress) → record vote
    function claimPrize(poolId) → transfer pot to winner
    function withdrawCollateral(poolId) → return collateral + yield
}
```

### AI Integration
```javascript
// Simple rule-based AI responses
const aiResponses = {
  "aturan": "Armon menggunakan sistem collateral 125%...",
  "status": "Pool masih aktif dengan 5 participants...",
  "yield": "Yield dihitung berdasarkan...",
  // fallback untuk general questions
}
```

### Deployment Targets
- **Devnet**: Monad testnet (kalau tersedia)
- **Local**: Foundry local node untuk testing
- **Demo**: Static frontend pointing to local contract

## 7. Time Budget (6 Hours)

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Setup | 30 min | Project scaffold + contract skeleton |
| Contract Dev | 2.5 hr | All core functions working |
| Frontend Dev | 2.5 hr | UI for create/join/vote/claim |
| AI + Polish | 30 min | Chat widget + responsive fix |
| Testing | 30 min | Demo flow working end-to-end |

**Buffer**: 30 min untuk contingencies
