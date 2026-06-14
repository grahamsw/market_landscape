// Sector definitions with HSL colors and descriptions
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
    description: 'Banks, Payment Networks, Investment Houses & Insurance'
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
    description: 'E-Commerce, Automotive, Retail Giants & Leisure'
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
    description: 'Internet Services, Social Media, Entertainment & Telecoms'
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
    description: 'Aerospace, Defense, Logistics & Conglomerates'
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
    description: 'Chemicals, Mining, Packaging & Metals'
  },
  'Real Estate': {
    hue: 300, // Violet
    name: 'Real Estate',
    label: 'Real Estate',
    description: 'REITs, Commercial & Residential Properties'
  }
};

// Index components mapping
export const INDEX_TICKERS = {
  's&p': [
    'AAPL', 'MSFT', 'NVDA', 'AVGO', 'ORCL',
    'JPM', 'BAC', 'MS', 'GS', 'V', 'MA',
    'LLY', 'UNH', 'JNJ', 'MRK', 'ABBV',
    'AMZN', 'TSLA', 'HD', 'MCD', 'NKE',
    'WMT', 'PG', 'KO', 'PEP', 'COST',
    'GOOGL', 'META', 'NFLX', 'DIS', 'CMCSA',
    'XOM', 'CVX', 'COP', 'SLB',
    'GE', 'CAT', 'HON', 'UNP', 'LMT',
    'NEE', 'DUK', 'SO',
    'LIN', 'SHW', 'APD',
    'PLD', 'AMT', 'CCI'
  ],
  'dow': [
    'AAPL', 'MSFT', 'NVDA', 'CRM', 'CSCO', 'IBM',
    'AXP', 'GS', 'JPM', 'TRV', 'V',
    'AMGN', 'JNJ', 'MRK', 'UNH',
    'AMZN', 'HD', 'MCD', 'NKE',
    'KO', 'PG', 'WMT',
    'DIS', 'VZ',
    'CVX',
    'CAT', 'HON', 'BA', 'MMM',
    'SHW'
  ],
  'nasdaq': Array.from(new Set([
    'AAPL', 'MSFT', 'NVDA', 'AMZN', 'META', 'GOOGL', 'GOOG', 'AVGO', 'TSLA', 'COST',
    'NFLX', 'PEP', 'ADBE', 'AMD', 'QCOM', 'TXN', 'INTU', 'AMGN', 'ISRG', 'HON',
    'CMCSA', 'BKNG', 'MDLZ', 'VRTX', 'REGN', 'PANW', 'ADP', 'LRCX', 'MU', 'MELI',
    'GILD', 'AMAT', 'ADI', 'PDD', 'SBUX', 'INTC', 'SNPS', 'KLAC', 'CDNS', 'PYPL',
    'CSX', 'MAR', 'WDAY', 'ORLY', 'ROP', 'CTAS', 'NXPI', 'ADSK', 'PCAR', 'PAYX',
    'MCHP', 'CPRT', 'FTNT', 'FAST', 'CEG', 'MNST', 'KDP', 'KHC', 'DDOG', 'ODFL',
    'TEAM', 'ANET', 'DXCM', 'VRSK', 'EXC', 'LULU', 'BKR', 'GEHC', 'AEP', 'IDXX',
    'ON', 'CTSH', 'MDB', 'XEL', 'CDW', 'EA', 'WBD', 'MRVL', 'ABNB', 'BMRN',
    'CSGP', 'ROST', 'BIIB', 'PTC', 'ILMN', 'ALGN', 'KEYS', 'ANSS', 'ZS', 'SIRI',
    'ENPH', 'DLTR', 'EBAY', 'FANG', 'GDDY', 'TTD', 'VRSN', 'OKTA', 'ASML'
  ])),
  'ftse': Array.from(new Set([
    'AZN.L', 'SHEL.L', 'HSBA.L', 'ULVR.L', 'BP.L', 'DGE.L', 'GSK.L', 'BATS.L', 'RIO.L', 'REL.L',
    'GLEN.L', 'BA.L', 'RKT.L', 'NG.L', 'LLOY.L', 'BARC.L', 'LSEG.L', 'CPG.L', 'FLTR.L', 'EXPN.L',
    'PRU.L', 'IMB.L', 'TSCO.L', 'RR.L', 'STAN.L', 'SSE.L', 'LGEN.L', 'ANTO.L', 'AHT.L', 'AAL.L',
    'HLMA.L', 'SGRO.L', 'SGE.L', 'ITRK.L', 'BNZL.L', 'SN.L', 'WPP.L', 'AV.L', 'NEXT.L', 'IHG.L',
    'SPX.L', 'RTO.L', 'MNDI.L', 'UU.L', 'SVT.L', 'PSON.L', 'MRO.L', 'KGF.L', 'LAND.L', 'BLND.L',
    'BDEV.L', 'TW.L', 'PSN.L', 'MKS.L', 'SBRY.L', 'CNA.L', 'JD.L', 'WTB.L', 'ABF.L', 'BRBY.L',
    'SDR.L', 'PHNX.L', 'MNG.L', 'SJP.L', 'RMV.L', 'AUTO.L', 'RS1.L', 'HIK.L', 'SMDS.L', 'ADM.L',
    'BEZ.L', 'HWDN.L', 'IMI.L', 'WEIR.L', 'CTEC.L', 'BME.L', 'ICP.L', 'EZJ.L', 'FRAS.L', 'OCDO.L',
    'ENT.L', 'CRDA.L', 'HALE.L', 'VOD.L', 'BT-A.L', 'IAG.L', 'INF.L', 'NWG.L', 'SMT.L', 'MONY.L',
    'VTRY.L', 'BBY.L', 'UTG.L', 'ABDN.L', 'DPH.L', 'HLN.L'
  ]))
};

// Helper to get tickers for an index
export const getIndexTickers = (indexKey) => {
  return INDEX_TICKERS[indexKey] || INDEX_TICKERS['s&p'];
};

// Mapping of stock tickers across all indices to their respective GICS sectors
export const TICKER_SECTOR_MAP = {
  // Technology
  'AAPL': 'Technology',
  'MSFT': 'Technology',
  'NVDA': 'Technology',
  'AVGO': 'Technology',
  'ORCL': 'Technology',
  'CRM': 'Technology',
  'CSCO': 'Technology',
  'IBM': 'Technology',
  'INTC': 'Technology',
  'ADBE': 'Technology',
  'AMD': 'Technology',
  'QCOM': 'Technology',
  'TXN': 'Technology',
  'INTU': 'Technology',
  'ASML': 'Technology',
  'AMAT': 'Technology',
  'LRCX': 'Technology',
  'PANW': 'Technology',

  // Financials
  'JPM': 'Financials',
  'BAC': 'Financials',
  'MS': 'Financials',
  'GS': 'Financials',
  'V': 'Financials',
  'MA': 'Financials',
  'AXP': 'Financials',
  'TRV': 'Financials',
  'HSBA.L': 'Financials',
  'BARC.L': 'Financials',
  'LLOY.L': 'Financials',
  'STAN.L': 'Financials',
  'PRU.L': 'Financials',
  'LGEN.L': 'Financials',

  // Healthcare
  'LLY': 'Healthcare',
  'UNH': 'Healthcare',
  'JNJ': 'Healthcare',
  'MRK': 'Healthcare',
  'ABBV': 'Healthcare',
  'AMGN': 'Healthcare',
  'ISRG': 'Healthcare',
  'REGN': 'Healthcare',
  'VRTX': 'Healthcare',
  'GILD': 'Healthcare',
  'AZN.L': 'Healthcare',
  'GSK.L': 'Healthcare',
  'HIK.L': 'Healthcare',

  // Consumer Discretionary
  'AMZN': 'Consumer Discretionary',
  'TSLA': 'Consumer Discretionary',
  'HD': 'Consumer Discretionary',
  'MCD': 'Consumer Discretionary',
  'NKE': 'Consumer Discretionary',
  'SBUX': 'Consumer Discretionary',
  'MELI': 'Consumer Discretionary',
  'ORLY': 'Consumer Discretionary',
  'LULU': 'Consumer Discretionary',
  'MAR': 'Consumer Discretionary',
  'PDD': 'Consumer Discretionary',
  'FLTR.L': 'Consumer Discretionary',
  'IHG.L': 'Consumer Discretionary',
  'NEXT.L': 'Consumer Discretionary',

  // Consumer Staples
  'WMT': 'Consumer Staples',
  'PG': 'Consumer Staples',
  'KO': 'Consumer Staples',
  'PEP': 'Consumer Staples',
  'COST': 'Consumer Staples',
  'MDLZ': 'Consumer Staples',
  'KDP': 'Consumer Staples',
  'MNST': 'Consumer Staples',
  'ULVR.L': 'Consumer Staples',
  'DGE.L': 'Consumer Staples',
  'BATS.L': 'Consumer Staples',
  'IMB.L': 'Consumer Staples',
  'TSCO.L': 'Consumer Staples',
  'SBRY.L': 'Consumer Staples',

  // Communication Services
  'GOOGL': 'Communication Services',
  'META': 'Communication Services',
  'NFLX': 'Communication Services',
  'DIS': 'Communication Services',
  'CMCSA': 'Communication Services',
  'VZ': 'Communication Services',
  'VOD.L': 'Communication Services',
  'BT-A.L': 'Communication Services',

  // Energy
  'XOM': 'Energy',
  'CVX': 'Energy',
  'COP': 'Energy',
  'SLB': 'Energy',
  'SHEL.L': 'Energy',
  'BP.L': 'Energy',

  // Industrials
  'GE': 'Industrials',
  'CAT': 'Industrials',
  'HON': 'Industrials',
  'UNP': 'Industrials',
  'LMT': 'Industrials',
  'BA': 'Industrials',
  'MMM': 'Industrials',
  'CSX': 'Industrials',
  'ODFL': 'Industrials',
  'FAST': 'Industrials',
  'ADP': 'Industrials',
  'RR.L': 'Industrials',
  'REL.L': 'Industrials',
  'BA.L': 'Industrials',
  'IAG.L': 'Industrials',

  // Utilities
  'NEE': 'Utilities',
  'DUK': 'Utilities',
  'SO': 'Utilities',
  'CEG': 'Utilities',
  'XEL': 'Utilities',
  'NG.L': 'Utilities',
  'UU.L': 'Utilities',
  'SVT.L': 'Utilities',

  // Materials
  'LIN': 'Materials',
  'SHW': 'Materials',
  'APD': 'Materials',
  'RIO.L': 'Materials',
  'AAL.L': 'Materials',
  'GLEN.L': 'Materials',
  'ANTO.L': 'Materials',

  // Real Estate
  'PLD': 'Real Estate',
  'AMT': 'Real Estate',
  'CCI': 'Real Estate',
  'LAND.L': 'Real Estate',
  'UTG.L': 'Real Estate'
};

// Dynamic helper function with pattern matching rules to resolve sector for any ticker
export const getSectorForTicker = (ticker) => {
  if (!ticker) return 'Technology';
  const sector = TICKER_SECTOR_MAP[ticker];
  if (sector) return sector;
  
  // Dynamic fallback heuristics for unmapped tickers
  if (ticker.includes('.L')) {
    // UK Stocks
    if (/^(HSBA|BARC|LLOY|STAN|PRU|LGEN|AV|SJP|MNG|PHNX|SDR|ICP|NWG|ABDN)/i.test(ticker)) return 'Financials';
    if (/^(SHEL|BP)/i.test(ticker)) return 'Energy';
    if (/^(AZN|GSK|HIK|HALE|HLN)/i.test(ticker)) return 'Healthcare';
    if (/^(ULVR|DGE|BATS|IMB|TSCO|SBRY|ABF|CNA|MKS)/i.test(ticker)) return 'Consumer Staples';
    if (/^(RIO|AAL|GLEN|ANTO|CRDA|SMDS|MNDI)/i.test(ticker)) return 'Materials';
    if (/^(LAND|UTG|SGRO|BLND)/i.test(ticker)) return 'Real Estate';
    if (/^(NG|UU|SVT|SSE)/i.test(ticker)) return 'Utilities';
    if (/^(FLTR|IHG|NEXT|WTB|JD|BRBY|ENT|EZJ|FRAS|MONY)/i.test(ticker)) return 'Consumer Discretionary';
    return 'Industrials'; // Default for UK (Rolls-Royce, BAE Systems, RELX, Vetry, etc.)
  } else {
    // US Stocks
    if (/^(AAPL|MSFT|NVDA|AVGO|ADBE|AMD|QCOM|TXN|INTU|ASML|AMAT|LRCX|PANW|CRM|CSCO|IBM|INTC|SNPS|CDNS|ADSK|MCHP|FTNT|DDOG|TEAM|ANET|ON|CTSH|MDB|CDW|MRVL|PTC|KEYS|ANSS|ZS|ENPH|OKTA|WDAY)/i.test(ticker)) return 'Technology';
    if (/^(JPM|BAC|MS|GS|V|MA|AXP|TRV|BKNG|PYPL|PAYX|CPRT|VRSK|ADP)/i.test(ticker)) return 'Financials';
    if (/^(LLY|UNH|JNJ|MRK|ABBV|AMGN|ISRG|REGN|VRTX|GILD|DXCM|GEHC|IDXX|BIIB|ILMN|ALGN|BMRN)/i.test(ticker)) return 'Healthcare';
    if (/^(AMZN|TSLA|COST|SBUX|MELI|ORLY|LULU|MAR|PDD|ROST|DLTR|EBAY|GDDY|TTD|ABNB|CSGP)/i.test(ticker)) return 'Consumer Discretionary';
    if (/^(WMT|PG|KO|PEP|MDLZ|KDP|MNST|KHC)/i.test(ticker)) return 'Consumer Staples';
    if (/^(GOOGL|GOOG|META|NFLX|CMCSA|DIS|VZ|SIRI|WBD)/i.test(ticker)) return 'Communication Services';
    if (/^(XOM|CVX|COP|SLB|FANG|BKR)/i.test(ticker)) return 'Energy';
    if (/^(GE|CAT|HON|UNP|LMT|BA|MMM|CSX|ODFL|FAST)/i.test(ticker)) return 'Industrials';
    if (/^(NEE|DUK|SO|CEG|XEL|EXC|AEP)/i.test(ticker)) return 'Utilities';
    if (/^(LIN|SHW|APD)/i.test(ticker)) return 'Materials';
    return 'Real Estate'; // Default fallback
  }
};

// Full name mappings for offline presentation fallback
export const TICKER_NAME_MAP = {
  // S&P Select
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'NVDA': 'NVIDIA Corporation',
  'AVGO': 'Broadcom Inc.',
  'ORCL': 'Oracle Corporation',
  'JPM': 'JPMorgan Chase & Co.',
  'BAC': 'Bank of America Corp.',
  'MS': 'Morgan Stanley',
  'GS': 'Goldman Sachs Group Inc.',
  'V': 'Visa Inc.',
  'MA': 'Mastercard Inc.',
  'LLY': 'Eli Lilly and Company',
  'UNH': 'UnitedHealth Group Inc.',
  'JNJ': 'Johnson & Johnson',
  'MRK': 'Merck & Co. Inc.',
  'ABBV': 'AbbVie Inc.',
  'AMZN': 'Amazon.com Inc.',
  'TSLA': 'Tesla Inc.',
  'HD': 'Home Depot Inc.',
  'MCD': 'McDonald\'s Corporation',
  'NKE': 'Nike Inc.',
  'WMT': 'Walmart Inc.',
  'PG': 'Procter & Gamble Co.',
  'KO': 'Coca-Cola Company',
  'PEP': 'PepsiCo Inc.',
  'COST': 'Costco Wholesale Corp.',
  'GOOGL': 'Alphabet Inc.',
  'META': 'Meta Platforms Inc.',
  'NFLX': 'Netflix Inc.',
  'DIS': 'Walt Disney Company',
  'CMCSA': 'Comcast Corporation',
  'XOM': 'Exxon Mobil Corp.',
  'CVX': 'Chevron Corporation',
  'COP': 'ConocoPhillips',
  'SLB': 'Schlumberger N.V.',
  'GE': 'General Electric Co.',
  'CAT': 'Caterpillar Inc.',
  'HON': 'Honeywell International',
  'UNP': 'Union Pacific Corp.',
  'LMT': 'Lockheed Martin Corp.',
  'NEE': 'NextEra Energy Inc.',
  'DUK': 'Duke Energy Corp.',
  'SO': 'Southern Company',
  'LIN': 'Linde plc',
  'SHW': 'Sherwin-Williams Co.',
  'APD': 'Air Products & Chemicals',
  'PLD': 'Prologis Inc.',
  'AMT': 'American Tower Corp.',
  'CCI': 'Crown Castle Inc.',

  // Dow Jones Additional
  'CRM': 'Salesforce Inc.',
  'CSCO': 'Cisco Systems Inc.',
  'IBM': 'International Business Machines',
  'INTC': 'Intel Corporation',
  'AXP': 'American Express Co.',
  'TRV': 'Travelers Companies Inc.',
  'AMGN': 'Amgen Inc.',
  'BA': 'Boeing Co.',
  'MMM': '3M Company',
  'VZ': 'Verizon Communications',

  // Nasdaq Additional
  'ADBE': 'Adobe Inc.',
  'AMD': 'Advanced Micro Devices',
  'QCOM': 'QUALCOMM Inc.',
  'TXN': 'Texas Instruments',
  'INTU': 'Intuit Inc.',
  'ASML': 'ASML Holding',
  'AMAT': 'Applied Materials',
  'LRCX': 'Lam Research',
  'PANW': 'Palo Alto Networks',
  'SBUX': 'Starbucks Corp.',
  'MELI': 'MercadoLibre Inc.',
  'ORLY': 'O\'Reilly Automotive',
  'LULU': 'Lululemon Athletica',
  'MAR': 'Marriott International',
  'PDD': 'PDD Holdings',
  'MDLZ': 'Mondelez International',
  'KDP': 'Keurig Dr Pepper',
  'MNST': 'Monster Beverage',
  'ISRG': 'Intuitive Surgical',
  'REGN': 'Regeneron Pharmaceuticals',
  'VRTX': 'Vertex Pharmaceuticals',
  'GILD': 'Gilead Sciences',
  'CSX': 'CSX Corp.',
  'ODFL': 'Old Dominion Freight Line',
  'FAST': 'Fastenal Co.',
  'ADP': 'Automatic Data Processing',
  'CEG': 'Constellation Energy',
  'XEL': 'Xcel Energy Inc.',
  'ZS': 'Zscaler Inc.',
  'OKTA': 'Okta Inc.',
  'MU': 'Micron Technology',
  'ADI': 'Analog Devices',
  'SNPS': 'Synopsys Inc.',
  'KLAC': 'KLA Corporation',
  'CDNS': 'Cadence Design Systems',
  'PYPL': 'PayPal Holdings',
  'WDAY': 'Workday Inc.',
  'ROP': 'Roper Technologies',
  'CTAS': 'Cintas Corporation',
  'NXPI': 'NXP Semiconductors',
  'ADSK': 'Autodesk Inc.',
  'PCAR': 'PACCAR Inc.',
  'PAYX': 'Paychex Inc.',
  'CPRT': 'Copart Inc.',
  'FTNT': 'Fortinet Inc.',
  'KHC': 'Kraft Heinz Co.',
  'DDOG': 'Datadog Inc.',
  'ODFL': 'Old Dominion Freight Line',
  'TEAM': 'Atlassian Corp.',
  'ANET': 'Arista Networks',
  'DXCM': 'DexCom Inc.',
  'VRSK': 'Verisk Analytics',
  'EXC': 'Exelon Corporation',
  'BKR': 'Baker Hughes Co.',
  'GEHC': 'GE HealthCare',
  'AEP': 'American Electric Power',
  'IDXX': 'IDEXX Laboratories',
  'ON': 'ON Semiconductor',
  'CTSH': 'Cognizant Technology',
  'MDB': 'MongoDB Inc.',
  'CDW': 'CDW Corporation',
  'EA': 'Electronic Arts',
  'WBD': 'Warner Bros. Discovery',
  'MRVL': 'Marvell Technology',
  'ABNB': 'Airbnb Inc.',
  'BMRN': 'BioMarin Pharmaceutical',
  'CSGP': 'CoStar Group',
  'ROST': 'Ross Stores',
  'BIIB': 'Biogen Inc.',
  'PTC': 'PTC Inc.',
  'ILMN': 'Illumina Inc.',
  'ALGN': 'Align Technology',
  'KEYS': 'Keysight Technologies',
  'ANSS': 'Ansys Inc.',
  'SIRI': 'Sirius XM Holdings',
  'ENPH': 'Enphase Energy',
  'DLTR': 'Dollar Tree',
  'EBAY': 'eBay Inc.',
  'FANG': 'Diamondback Energy',
  'GDDY': 'GoDaddy Inc.',
  'TTD': 'The Trade Desk',
  'VRSN': 'Verisign Inc.',

  // FTSE 100
  'AZN.L': 'AstraZeneca plc',
  'GSK.L': 'GSK plc',
  'HIK.L': 'Hikma Pharmaceuticals',
  'HSBA.L': 'HSBC Holdings plc',
  'BARC.L': 'Barclays plc',
  'LLOY.L': 'Lloyds Banking Group',
  'STAN.L': 'Standard Chartered plc',
  'PRU.L': 'Prudential plc',
  'LGEN.L': 'Legal & General Group',
  'SHEL.L': 'Shell plc',
  'BP.L': 'BP plc',
  'ULVR.L': 'Unilever plc',
  'DGE.L': 'Diageo plc',
  'BATS.L': 'British American Tobacco',
  'IMB.L': 'Imperial Brands plc',
  'TSCO.L': 'Tesco plc',
  'SBRY.L': 'Sainsbury\'s',
  'RIO.L': 'Rio Tinto Group',
  'AAL.L': 'Anglo American plc',
  'GLEN.L': 'Glencore plc',
  'ANTO.L': 'Antofagasta plc',
  'RR.L': 'Rolls-Royce Holdings',
  'REL.L': 'RELX plc',
  'BA.L': 'BAE Systems plc',
  'IAG.L': 'International Airlines Group',
  'VOD.L': 'Vodafone Group plc',
  'BT-A.L': 'BT Group plc',
  'NG.L': 'National Grid plc',
  'UU.L': 'United Utilities Group',
  'SVT.L': 'Severn Trent plc',
  'LAND.L': 'Land Securities Group',
  'UTG.L': 'Unite Group plc',
  'FLTR.L': 'Flutter Entertainment',
  'IHG.L': 'InterContinental Hotels Group',
  'NEXT.L': 'Next plc',
  'CPG.L': 'Compass Group plc',
  'EXPN.L': 'Experian plc',
  'RKT.L': 'Reckitt Benckiser Group',
  'LSEG.L': 'London Stock Exchange Group',
  'SSE.L': 'SSE plc',
  'AHT.L': 'Ashtead Group plc',
  'HLMA.L': 'Halma plc',
  'SGRO.L': 'SEGRO plc',
  'SGE.L': 'Sage Group plc',
  'ITRK.L': 'Intertek Group plc',
  'BNZL.L': 'Bunzl plc',
  'SN.L': 'Smith & Nephew plc',
  'WPP.L': 'WPP plc',
  'AV.L': 'Aviva plc',
  'SPX.L': 'Spirax Group plc',
  'RTO.L': 'Rentokil Initial plc',
  'MNDI.L': 'Mondi plc',
  'PSON.L': 'Pearson plc',
  'MRO.L': 'Melrose Industries plc',
  'KGF.L': 'Kingfisher plc',
  'BLND.L': 'British Land Company',
  'BDEV.L': 'Barratt Redrow plc',
  'TW.L': 'Taylor Wimpey plc',
  'PSN.L': 'Persimmon plc',
  'MKS.L': 'Marks & Spencer Group',
  'CNA.L': 'Centrica plc',
  'JD.L': 'JD Sports Fashion',
  'WTB.L': 'Whitbread plc',
  'ABF.L': 'Associated British Foods',
  'BRBY.L': 'Burberry Group plc',
  'SDR.L': 'Schroders plc',
  'PHNX.L': 'Phoenix Group Holdings',
  'MNG.L': 'M&G plc',
  'SJP.L': 'St. James\'s Place plc',
  'RMV.L': 'Rightmove plc',
  'AUTO.L': 'Auto Trader Group plc',
  'RS1.L': 'RS Group plc',
  'SMDS.L': 'DS Smith plc',
  'ADM.L': 'Admiral Group plc',
  'BEZ.L': 'Beazley plc',
  'HWDN.L': 'Howden Joinery Group',
  'IMI.L': 'IMI plc',
  'WEIR.L': 'Weir Group plc',
  'CTEC.L': 'ConvaTec Group plc',
  'BME.L': 'B&M European Value Retail',
  'ICP.L': 'Intermediate Capital Group',
  'EZJ.L': 'easyJet plc',
  'FRAS.L': 'Frasers Group plc',
  'OCDO.L': 'Ocado Group plc',
  'ENT.L': 'Entain plc',
  'CRDA.L': 'Croda International plc',
  'HALE.L': 'Haleon plc',
  'INF.L': 'Informa plc',
  'NWG.L': 'NatWest Group plc',
  'SMT.L': 'Scottish Mortgage Investment Trust',
  'MONY.L': 'MONY Group plc',
  'VTRY.L': 'Vistry Group plc',
  'BBY.L': 'Balfour Beatty plc',
  'ABDN.L': 'abrdn plc',
  'DPH.L': 'Dechra Pharmaceuticals plc',
  'HLN.L': 'Haleon plc (Alternate)'
};

// Generates realistic mock stock objects for fallback and offline use
export const generateMockStocks = (tickers) => {
  return tickers.map(ticker => {
    let seed = 0;
    for (let i = 0; i < ticker.length; i++) {
      seed += ticker.charCodeAt(i);
    }
    
    // Scale properties appropriately (FTSE 100 values in GBp pence, others in USD)
    const isUK = ticker.includes('.L');
    const priceBase = isUK ? 150 : 25;
    const price = priceBase + (seed % 650) + Math.random() * 5;
    
    const changePercent = -4.0 + (seed % 8) + Math.random() * 1.5;
    const change = price * (changePercent / 100);
    
    const mcBase = isUK ? 3e9 : 8e9;
    const marketCap = mcBase * (5 + (seed % 145));
    
    const volume = 1e5 * (2 + (seed % 35)) * 4;
    
    const name = TICKER_NAME_MAP[ticker] || (ticker + ' Corporation');
    
    return {
      symbol: ticker,
      name: name,
      price: parseFloat(price.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      marketCap: Math.round(marketCap),
      volume: Math.round(volume),
      high: parseFloat((price * 1.02).toFixed(2)),
      low: parseFloat((price * 0.98).toFixed(2)),
      open: parseFloat((price - change).toFixed(2)),
      prevClose: parseFloat((price - change).toFixed(2))
    };
  });
};

export const MOCK_STOCKS = generateMockStocks(INDEX_TICKERS['s&p']);
