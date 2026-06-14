import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import yahooFinance from 'yahoo-finance2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Lists of tickers per market index
const INDEX_TICKERS = {
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

// Endpoint to fetch stock quotes for a specific index
app.get('/api/stocks', async (req, res) => {
  try {
    const indexKey = req.query.index || 's&p';
    const tickers = INDEX_TICKERS[indexKey] || INDEX_TICKERS['s&p'];
    
    console.log(`[Server] Fetching quotes for ${tickers.length} tickers on index "${indexKey}"...`);
    
    // Fetch quotes in parallel from Yahoo Finance
    const quotes = await yahooFinance.quote(tickers, {}, { validateResult: false });
    
    // Process and sanitize quotes
    const formattedStocks = quotes.map(quote => {
      return {
        symbol: quote.symbol,
        name: quote.shortName || quote.longName || quote.symbol,
        price: quote.regularMarketPrice || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        change: quote.regularMarketChange || 0,
        marketCap: quote.marketCap || 0,
        volume: quote.regularMarketVolume || 0,
        high: quote.regularMarketDayHigh || 0,
        low: quote.regularMarketDayLow || 0,
        open: quote.regularMarketOpen || 0,
        prevClose: quote.regularMarketPreviousClose || 0
      };
    });

    console.log(`[Server] Successfully fetched ${formattedStocks.length} quotes.`);
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: formattedStocks
    });
  } catch (error) {
    console.error('[Server] Error fetching stock data from Yahoo Finance:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch stock data',
      message: error.message
    });
  }
});

// Serve frontend in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Stock Market 3D Backend is running in development mode.');
  });
}

app.listen(PORT, () => {
  console.log(`[Server] Backend server running on http://localhost:${PORT}`);
});
