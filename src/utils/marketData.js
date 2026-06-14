// Sector definitions with HSL colors and description names
export const SECTORS = {
  'Technology': {
    hue: 195, // Neon Cyan
    name: 'Technology',
    label: 'Technology',
    description: 'Software, Hardware & Semiconductor Giants'
  },
  'Financials': {
    hue: 45, // Neon Gold
    name: 'Financials',
    label: 'Financials',
    description: 'Banks, Payment Networks & Investment Houses'
  },
  'Healthcare': {
    hue: 330, // Neon Pink
    name: 'Healthcare',
    label: 'Healthcare',
    description: 'Biotech, Pharmaceuticals & Healthcare Providers'
  },
  'Consumer Discretionary': {
    hue: 270, // Electric Purple
    name: 'Consumer Discretionary',
    label: 'Consumer Discretionary',
    description: 'E-Commerce, Automotive & Retail Giants'
  },
  'Consumer Staples': {
    hue: 160, // Mint Green
    name: 'Consumer Staples',
    label: 'Consumer Staples',
    description: 'Household Goods, Supermarkets & Beverages'
  },
  'Communication Services': {
    hue: 15, // Electric Coral
    name: 'Communication Services',
    label: 'Communication Services',
    description: 'Internet Services, Social Media & Entertainment'
  },
  'Energy': {
    hue: 35, // Amber Orange
    name: 'Energy',
    label: 'Energy',
    description: 'Oil, Gas & Energy Exploration'
  },
  'Industrials': {
    hue: 215, // Slate Blue
    name: 'Industrials',
    label: 'Industrials',
    description: 'Conglomerates, Aerospace & Logistics'
  },
  'Utilities': {
    hue: 80, // Lime
    name: 'Utilities',
    label: 'Utilities',
    description: 'Electricity, Water & Gas Providers'
  },
  'Materials': {
    hue: 120, // Sage Green
    name: 'Materials',
    label: 'Materials',
    description: 'Chemicals, Mining & Packaging'
  },
  'Real Estate': {
    hue: 300, // Violet
    name: 'Real Estate',
    label: 'Real Estate',
    description: 'REITs, Commercial & Residential Properties'
  }
};

// Mapping of stock tickers to their respective sectors
export const TICKER_SECTOR_MAP = {
  // Technology
  'AAPL': 'Technology',
  'MSFT': 'Technology',
  'NVDA': 'Technology',
  'AVGO': 'Technology',
  'ORCL': 'Technology',

  // Financials
  'JPM': 'Financials',
  'BAC': 'Financials',
  'MS': 'Financials',
  'GS': 'Financials',
  'V': 'Financials',
  'MA': 'Financials',

  // Healthcare
  'LLY': 'Healthcare',
  'UNH': 'Healthcare',
  'JNJ': 'Healthcare',
  'MRK': 'Healthcare',
  'ABBV': 'Healthcare',

  // Consumer Discretionary
  'AMZN': 'Consumer Discretionary',
  'TSLA': 'Consumer Discretionary',
  'HD': 'Consumer Discretionary',
  'MCD': 'Consumer Discretionary',
  'NKE': 'Consumer Discretionary',

  // Consumer Staples
  'WMT': 'Consumer Staples',
  'PG': 'Consumer Staples',
  'KO': 'Consumer Staples',
  'PEP': 'Consumer Staples',
  'COST': 'Consumer Staples',

  // Communication Services
  'GOOGL': 'Communication Services',
  'META': 'Communication Services',
  'NFLX': 'Communication Services',
  'DIS': 'Communication Services',
  'CMCSA': 'Communication Services',

  // Energy
  'XOM': 'Energy',
  'CVX': 'Energy',
  'COP': 'Energy',
  'SLB': 'Energy',

  // Industrials
  'GE': 'Industrials',
  'CAT': 'Industrials',
  'HON': 'Industrials',
  'UNP': 'Industrials',
  'LMT': 'Industrials',

  // Utilities
  'NEE': 'Utilities',
  'DUK': 'Utilities',
  'SO': 'Utilities',

  // Materials
  'LIN': 'Materials',
  'SHW': 'Materials',
  'APD': 'Materials',

  // Real Estate
  'PLD': 'Real Estate',
  'AMT': 'Real Estate',
  'CCI': 'Real Estate'
};

// Robust, realistic mock data for local fallback and offline presentation
export const MOCK_STOCKS = [
  // Technology
  { symbol: 'AAPL', name: 'Apple Inc.', price: 185.35, changePercent: 1.45, change: 2.65, marketCap: 2890000000000, volume: 55000000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 420.55, changePercent: 2.10, change: 8.65, marketCap: 3120000000000, volume: 22000000 },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 925.10, changePercent: 4.85, change: 42.80, marketCap: 2280000000000, volume: 48000000 },
  { symbol: 'AVGO', name: 'Broadcom Inc.', price: 1405.00, changePercent: -0.75, change: -10.60, marketCap: 654000000000, volume: 2500000 },
  { symbol: 'ORCL', name: 'Oracle Corporation', price: 125.40, changePercent: 0.15, change: 0.19, marketCap: 345000000000, volume: 8000000 },

  // Financials
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 198.50, changePercent: 0.85, change: 1.67, marketCap: 572000000000, volume: 9500000 },
  { symbol: 'BAC', name: 'Bank of America Corp.', price: 39.20, changePercent: -0.40, change: -0.16, marketCap: 310000000000, volume: 38000000 },
  { symbol: 'MS', name: 'Morgan Stanley', price: 92.80, changePercent: 0.10, change: 0.09, marketCap: 152000000000, volume: 7000000 },
  { symbol: 'GS', name: 'Goldman Sachs Group Inc.', price: 450.75, changePercent: 1.25, change: 5.56, marketCap: 148000000000, volume: 2800000 },
  { symbol: 'V', name: 'Visa Inc.', price: 275.20, changePercent: -0.20, change: -0.55, marketCap: 565000000000, volume: 5500000 },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 455.60, changePercent: 0.45, change: 2.04, marketCap: 425000000000, volume: 3200000 },

  // Healthcare
  { symbol: 'LLY', name: 'Eli Lilly and Company', price: 820.30, changePercent: 3.20, change: 25.40, marketCap: 780000000000, volume: 3500000 },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', price: 495.10, changePercent: -1.85, change: -9.32, marketCap: 458000000000, volume: 4200000 },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 155.40, changePercent: -0.30, change: -0.47, marketCap: 374000000000, volume: 7500000 },
  { symbol: 'MRK', name: 'Merck & Co. Inc.', price: 128.25, changePercent: 0.65, change: 0.83, marketCap: 325000000000, volume: 6200000 },
  { symbol: 'ABBV', name: 'AbbVie Inc.', price: 168.90, changePercent: 0.90, change: 1.51, marketCap: 298000000000, volume: 5100000 },

  // Consumer Discretionary
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 182.15, changePercent: 1.95, change: 3.49, marketCap: 1890000000000, volume: 32000000 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 178.20, changePercent: -3.40, change: -6.27, marketCap: 568000000000, volume: 85000000 },
  { symbol: 'HD', name: 'Home Depot Inc.', price: 345.50, changePercent: 0.50, change: 1.72, marketCap: 342000000000, volume: 4500000 },
  { symbol: 'MCD', name: 'McDonald\'s Corporation', price: 265.80, changePercent: -0.80, change: -2.14, marketCap: 192000000000, volume: 3800000 },
  { symbol: 'NKE', name: 'Nike Inc.', price: 92.40, changePercent: -1.20, change: -1.12, marketCap: 139000000000, volume: 6800000 },

  // Consumer Staples
  { symbol: 'WMT', name: 'Walmart Inc.', price: 65.20, changePercent: 0.75, change: 0.49, marketCap: 524000000000, volume: 15000000 },
  { symbol: 'PG', name: 'Procter & Gamble Co.', price: 162.50, changePercent: -0.15, change: -0.24, marketCap: 382000000000, volume: 6100000 },
  { symbol: 'KO', name: 'Coca-Cola Company', price: 62.10, changePercent: 0.25, change: 0.15, marketCap: 268000000000, volume: 11000000 },
  { symbol: 'PEP', name: 'PepsiCo Inc.', price: 170.80, changePercent: 0.40, change: 0.68, marketCap: 234000000000, volume: 4500000 },
  { symbol: 'COST', name: 'Costco Wholesale Corp.', price: 785.40, changePercent: 1.10, change: 8.54, marketCap: 348000000000, volume: 2100000 },

  // Communication Services
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 175.50, changePercent: 2.30, change: 3.95, marketCap: 2180000000000, volume: 25000000 },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 475.20, changePercent: 3.10, change: 14.30, marketCap: 1210000000000, volume: 18000000 },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 625.30, changePercent: -1.50, change: -9.52, marketCap: 270000000000, volume: 3900000 },
  { symbol: 'DIS', name: 'Walt Disney Company', price: 102.40, changePercent: -0.60, change: -0.62, marketCap: 186000000000, volume: 7500000 },
  { symbol: 'CMCSA', name: 'Comcast Corporation', price: 39.50, changePercent: -0.90, change: -0.36, marketCap: 154000000000, volume: 14000000 },

  // Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 115.80, changePercent: -1.25, change: -1.47, marketCap: 462000000000, volume: 16000000 },
  { symbol: 'CVX', name: 'Chevron Corporation', price: 155.20, changePercent: -0.95, change: -1.49, marketCap: 288000000000, volume: 7500000 },
  { symbol: 'COP', name: 'ConocoPhillips', price: 118.40, changePercent: -1.50, change: -1.80, marketCap: 138000000000, volume: 5500000 },
  { symbol: 'SLB', name: 'Schlumberger N.V.', price: 46.20, changePercent: -2.35, change: -1.11, marketCap: 65000000000, volume: 8800000 },

  // Industrials
  { symbol: 'GE', name: 'General Electric Co.', price: 165.40, changePercent: 1.80, change: 2.92, marketCap: 180000000000, volume: 5800000 },
  { symbol: 'CAT', name: 'Caterpillar Inc.', price: 355.20, changePercent: 0.95, change: 3.35, marketCap: 176000000000, volume: 2500000 },
  { symbol: 'HON', name: 'Honeywell International', price: 202.80, changePercent: -0.40, change: -0.81, marketCap: 131000000000, volume: 2900000 },
  { symbol: 'UNP', name: 'Union Pacific Corp.', price: 232.10, changePercent: 0.35, change: 0.81, marketCap: 141000000000, volume: 2200000 },
  { symbol: 'LMT', name: 'Lockheed Martin Corp.', price: 472.50, changePercent: -0.10, change: -0.47, marketCap: 114000000000, volume: 1100000 },

  // Utilities
  { symbol: 'NEE', name: 'NextEra Energy Inc.', price: 72.40, changePercent: 0.65, change: 0.47, marketCap: 148000000000, volume: 8500000 },
  { symbol: 'DUK', name: 'Duke Energy Corp.', price: 101.50, changePercent: 0.30, change: 0.30, marketCap: 78000000000, volume: 3100000 },
  { symbol: 'SO', name: 'Southern Company', price: 78.90, changePercent: -0.15, change: -0.12, marketCap: 86000000000, volume: 3800000 },

  // Materials
  { symbol: 'LIN', name: 'Linde plc', price: 440.20, changePercent: 0.55, change: 2.41, marketCap: 211000000000, volume: 1800000 },
  { symbol: 'SHW', name: 'Sherwin-Williams Co.', price: 305.40, changePercent: -0.35, change: -1.07, marketCap: 78000000000, volume: 1500000 },
  { symbol: 'APD', name: 'Air Products & Chemicals', price: 262.50, changePercent: 0.20, change: 0.52, marketCap: 58000000000, volume: 1200000 },

  // Real Estate
  { symbol: 'PLD', name: 'Prologis Inc.', price: 115.60, changePercent: -1.15, change: -1.35, marketCap: 107000000000, volume: 4200000 },
  { symbol: 'AMT', name: 'American Tower Corp.', price: 192.40, changePercent: 0.25, change: 0.48, marketCap: 89000000000, volume: 2100000 },
  { symbol: 'CCI', name: 'Crown Castle Inc.', price: 98.50, changePercent: -0.65, change: -0.65, marketCap: 42000000000, volume: 2500000 }
];
