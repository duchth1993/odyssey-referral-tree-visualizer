# Odyssey Referral Tree Visualizer

An interactive web tool to visualize your Odyssey referral network, points earned, and community growth in the Endless ecosystem.

**Live Demo:** https://odyssey-referral-tree-visualizer.vercel.app/

![Odyssey Referral Tree Demo Screenshot](demo-screenshot.png)

## What It Does
- Enter your wallet address or referral code (mock input for demo).
- Generate a dynamic tree graph showing:
  - Your root node (with total points & level)
  - Direct invites (children nodes)
  - Sub-referrals (nested levels)
  - Points earned per node
  - Level badges (Bronze, Silver, Gold – mock for demo)
- Hover over nodes for quick details (address, points, level).
- Uses D3.js for smooth, interactive tree visualization.

## Why It Matters to the Endless Ecosystem
- **Visualizes network effect**: Users can literally "see" how their referrals contribute to Odyssey points and growth.
- **Boosts gamification & retention**: Seeing the tree encourages more invites and participation in Odyssey tasks.
- **Social learning driver**: Inspires users to imitate successful referral strategies (aligns with community building vision).
- **Onboarding & engagement tool**: New users understand referral mechanics faster → higher activation rate.
- **Scalable seed**: Can evolve to connect real Odyssey API (when available) for live data.

## Features (MVP)
- Mock referral tree data (expandable to real API)
- Interactive D3.js tree graph (zoom, hover tooltips)
- Responsive dark-mode UI (Endless aesthetic: purple-black-blue-white)
- Simple input + generate button
- Footer credit with repo link & #EndlessDev

## How to Run / Test
1. Clone the repo:
   ```bash
   git clone https://github.com/duchth1993/odyssey-referral-tree-visualizer.git
