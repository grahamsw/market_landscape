# 3D Market Coastline Visualizer

An interactive 3D stock market visualizer that groups financial market sectors along a shared coastline, forming a dense, city-like coastline landscape. 

The application represents each stock as a 3D building (cuboid) where its physical dimensions (footprint area, height, and color) represent configurable financial metrics (such as Market Capitalization, Daily Change %, Share Price, and Trading Volume).

---

## Features

- **Multiple Market Indices Support**: Switch dynamically between:
  - **S&P 500 Select**: A curated collection of 45 major US equities across all 11 sectors.
  - **Dow Jones 30**: The 30 components of the Dow Jones Industrial Average.
  - **Nasdaq 100 (Full)**: The complete list of 100 components of the Nasdaq-100.
  - **FTSE 100 (Full)**: The complete list of 100 components of the FTSE 100 on the London Stock Exchange (with `.L` suffixes).
- **Dynamic 3D Treemap Packing**: Stocks are packed tightly against each other, aligned flush against a straight inland wall, with the waterfront edges allowed to be ragged and jagged.
- **Two Coastal Configurations**:
  - **2-Sided Channel**: Sectors face each other across a straight central channel.
  - **4-Sided Harbor**: Sectors encircle a central square harbor.
- **Interactive Controls**:
  - **Orbit Navigation**: Drag to rotate, scroll to zoom, and right-click/ctrl-drag to pan.
  - **Dynamic Texturing**: Stock ticker symbols are dynamically rendered in bold white letters directly on the top face of each 3D building using HTML5 canvas texture mapping.
  - **Details HUD**: Click on any stock block to inspect real-time financial stats in the side details panel (Daily Range, Net Change, Previous Close, Volume).
  - **Live Yahoo Finance Integration**: Fetches real-time stock quotes from Yahoo Finance via an Express API proxy, with a graceful fallback to rich mock data if offline.
- **Configurable Mapping HUD**:
  - **Height mapping**: Daily Net Change %, Market Cap, Share Price, or Volume.
  - **Area mapping**: Market Cap, Volume, or Share Price.
  - **Color mapping**: Gain/Loss Heatmap (emerald green to ruby red) or HSL Sector Identity.
  - **Sector dimming**: Click on any sector in the sidebar list to isolate it; other sectors are dimmed to `0.45` opacity but remain visible in 3D space.

---

## Technical Architecture

The application is built on a clean monorepo architecture:

```
excited-einstein/
├── server.js               # Node.js/Express backend proxying Yahoo Finance API
├── src/
│   ├── App.jsx            # Main dashboard UI, config handlers, and side panels
│   ├── index.css          # App stylesheet implementing light mode layout
│   ├── components/
│   │   └── ThreeCanvas.jsx # Core WebGL Three.js render engine and layout math
│   └── utils/
│       └── marketData.js   # Sector hues, ticker maps, and mock datasets
└── vite.config.js          # Vite configuration with backend api proxy rules
```

### 1. Proportional Coastline Packing
To achieve a gap-free treemap layout along the coastal axis, each sector is allocated a specific range $[c_{\text{start}}, c_{\text{end}}]$. Inside each sector, stocks are sorted descending by Market Cap and divided into two columns:
- **Inland Column** (small-cap stocks)
- **Waterfront Column** (large-cap stocks)

The width allocated to each stock along the coast axis is proportional to its size factor:
$$w_i = \frac{S_i}{S_{\text{total}}} \times L_c$$

Where:
- $S_i$ is the log-scaled mapping metric (e.g., Log10 of Market Cap).
- $S_{\text{total}}$ is the sum of size factors for the column.
- $L_c$ is the total shoreline length allocated to the sector.

### 2. Jagged Shoreline Generation
- **Inland Column**: Aligned flush against the outer boundary of the quay ($x = \pm 48$ or $z = \pm 48$) and extends inward by a uniform depth of `14` units.
- **Waterfront Column**: Backed directly against the inland column and extends toward the water by an individual, dynamic depth value proportional to its market weight ($d_i = \max(3.0, \min(14.0, S_i \times 4.2))$). Because size factors differ, the inner shoreline naturally exhibits a rugged, jagged shape.

### 3. Lighting & Shading
- **Uniform Base**: The floor is a solid, flat concrete plane (`#64748b`) extending out to `1000x1000` units, blending cleanly into linear horizon fog (`THREE.Fog` starting at `150` units and ending at `450` units).
- **No Overexposure**: Lighting is balanced (Ambient = `0.4`, Directional = `0.8`) to prevent specular blowout. This preserves 3D shading, shadows, and base colors on all faces of the buildings.

---

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/grahamsw/market_landscape.git
   cd market_landscape
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To run both the **Vite React client** and the **Express backend server** concurrently:

```bash
npm run dev
```

- **Client Application**: [http://localhost:5173](http://localhost:5173)
- **Express Backend API**: [http://localhost:5001](http://localhost:5001)

### Building for Production

To compile the application bundle for production deployment:

```bash
npm run build
```

The production assets will be built in the `dist/` directory.
