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

// List of tickers across sectors
const TICKERS = [
  // Technology
  'AAPL', 'MSFT', 'NVDA', 'AVGO', 'ORCL',
  // Financials
  'JPM', 'BAC', 'MS', 'GS', 'V', 'MA',
  // Healthcare
  'LLY', 'UNH', 'JNJ', 'MRK', 'ABBV',
  // Consumer Discretionary
  'AMZN', 'TSLA', 'HD', 'MCD', 'NKE',
  // Consumer Staples
  'WMT', 'PG', 'KO', 'PEP', 'COST',
  // Communication Services
  'GOOGL', 'META', 'NFLX', 'DIS', 'CMCSA',
  // Energy
  'XOM', 'CVX', 'COP', 'SLB',
  // Industrials
  'GE', 'CAT', 'HON', 'UNP', 'LMT',
  // Utilities
  'NEE', 'DUK', 'SO',
  // Materials
  'LIN', 'SHW', 'APD',
  // Real Estate
  'PLD', 'AMT', 'CCI'
];

// Endpoint to fetch stock quotes
app.get('/api/stocks', async (req, res) => {
  try {
    console.log(`[Server] Fetching quotes for ${TICKERS.length} tickers...`);
    
    // Fetch quotes in parallel
    const quotes = await yahooFinance.quote(TICKERS, {}, { validateResult: false });
    
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
