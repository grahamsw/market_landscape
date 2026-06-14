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
  'nasdaq': [
    'AAPL', 'MSFT', 'NVDA', 'AVGO', 'ADBE', 'AMD', 'QCOM', 'TXN', 'INTU', 'ASML', 'AMAT', 'LRCX', 'PANW',
    'GOOGL', 'META', 'NFLX', 'CMCSA',
    'AMZN', 'TSLA', 'COST', 'SBUX', 'MELI', 'ORLY', 'LULU', 'MAR', 'PDD',
    'PEP', 'MDLZ', 'KDP', 'MNST',
    'ISRG', 'REGN', 'VRTX', 'AMGN', 'GILD',
    'HON', 'CSX', 'ODFL', 'FAST', 'ADP',
    'CEG', 'XEL'
  ],
  'ftse': [
    'AZN.L', 'GSK.L', 'HIK.L',
    'HSBA.L', 'BARC.L', 'LLOY.L', 'STAN.L', 'PRU.L', 'LGEN.L',
    'SHEL.L', 'BP.L',
    'ULVR.L', 'DGE.L', 'BATS.L', 'IMB.L', 'TSCO.L', 'SBRY.L',
    'RIO.L', 'AAL.L', 'GLEN.L', 'ANTO.L',
    'RR.L', 'REL.L', 'BA.L', 'IAG.L',
    'VOD.L', 'BT-A.L',
    'NG.L', 'UU.L', 'SVT.L',
    'LAND.L', 'UTG.L',
    'FLTR.L', 'IHG.L', 'NEXT.L'
  ]
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
