import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  RefreshCw, Search, X, Sliders, Database, Wifi, WifiOff, 
  Info, TrendingUp, TrendingDown, Layers, Map, Compass 
} from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';
import { SECTORS, getIndexTickers, generateMockStocks, getSectorForTicker } from './utils/marketData';

export default function App() {
  // Stock data states
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiveData, setIsLiveData] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown, setCountdown] = useState(60);
  
  // Mapping configuration states
  const [selectedIndex, setSelectedIndex] = useState('s&p'); // 's&p', 'dow', 'nasdaq', or 'ftse'
  const [heightMetric, setHeightMetric] = useState('performance');
  const [areaMetric, setAreaMetric] = useState('marketCap');
  const [colorMetric, setColorMetric] = useState('performance');
  const [layoutShape, setLayoutShape] = useState('2-sided'); // '2-sided' or '4-sided'

  // Filtering states
  const [selectedSector, setSelectedSector] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);

  // Auto-refresh timer reference
  const countdownIntervalRef = useRef(null);

  // Fetch stock data from our Express server proxy
  const fetchStocks = async (forceMock = false, indexOverride = selectedIndex) => {
    const index = indexOverride;
    const tickers = getIndexTickers(index);

    if (forceMock) {
      console.log(`[App] Loading mock stock data for index ${index}...`);
      const mockData = generateMockStocks(tickers);
      setStocks(mockData);
      setIsLiveData(false);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/stocks?index=${index}`);
      const json = await response.json();
      
      if (json.success && json.data && json.data.length > 0) {
        setStocks(json.data);
        setIsLiveData(true);
        setLastUpdated(new Date(json.timestamp).toLocaleTimeString());
      } else {
        throw new Error(json.error || 'Empty stock data returned');
      }
    } catch (err) {
      console.warn('[App] Server fetch failed, falling back to mock data:', err);
      const mockData = generateMockStocks(tickers);
      setStocks(mockData);
      setIsLiveData(false);
      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
      setCountdown(60); // reset countdown
    }
  };

  // Reload stocks whenever the index selection changes
  useEffect(() => {
    fetchStocks(isLiveData === false, selectedIndex);
    // Reset selected stock when switching indices
    setSelectedStock(null);
  }, [selectedIndex]);

  // Countdown & auto-refresh interval
  useEffect(() => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchStocks(isLiveData === false, selectedIndex); // reload current data mode & index
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownIntervalRef.current);
  }, [isLiveData, selectedIndex]);

  // Handle live vs mock data manual toggle
  const toggleDataMode = () => {
    const nextMode = !isLiveData;
    fetchStocks(!nextMode, selectedIndex);
  };

  // Group stocks by sector for listing statistics in sidebar
  const sectorCounts = useMemo(() => {
    const counts = {};
    Object.keys(SECTORS).forEach(key => { counts[key] = 0; });
    
    stocks.forEach(stock => {
      const sector = getSectorForTicker(stock.symbol);
      if (sector && counts[sector] !== undefined) {
        counts[sector]++;
      }
    });
    return counts;
  }, [stocks]);

  // Find detailed statistics for selected stock
  const currentStockDetails = useMemo(() => {
    if (!selectedStock) return null;
    return stocks.find(s => s.symbol === selectedStock.symbol) || selectedStock;
  }, [selectedStock, stocks]);

  // Reset all filters helper
  const clearFilters = () => {
    setSelectedSector(null);
    setSearchQuery('');
  };

  // Format helper functions
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatMarketCap = (val) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    return `$${(val / 1e6).toFixed(2)}M`;
  };

  const formatVolume = (val) => {
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M shares`;
    if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K shares`;
    return `${val} shares`;
  };

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="brand">
          <div className="logo-icon">
            <Map size={20} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div>
            <h1>Market Coastline 3D</h1>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Financial Landscape Visualizer
            </span>
          </div>
        </div>
        
        <div className="status-indicator">
          {/* Warn if API fails and we are using Mock Data */}
          {!isLiveData && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '11px',
                color: '#f59e0b',
                fontWeight: 600
              }}
            >
              <Info size={13} />
              API Offline (Showing Fallback Data)
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`status-dot ${isLiveData ? 'live' : 'mock'}`}></span>
            <span className="status-text">
              {isLiveData ? 'Live Connection' : 'Demo Mode'}
            </span>
          </div>
          
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
            Updated: <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{lastUpdated || 'Loading...'}</span>
          </div>
          
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Next refresh: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{countdown}s</span>
          </div>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => fetchStocks(isLiveData === false)} 
            disabled={loading}
            style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCw size={14} className={loading ? 'spinner' : ''} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            Sync
          </button>
        </div>
      </header>

      {/* Control Panel (Sidebar) */}
      <aside className="sidebar">
        
        {/* Visual Mapping Settings */}
        <div>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={14} /> Configure View
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
             <div className="control-group">
              <label className="control-label">Market Index</label>
              <select 
                className="custom-select" 
                value={selectedIndex} 
                onChange={(e) => setSelectedIndex(e.target.value)}
              >
                <option value="s&p">S&P 500 Select</option>
                <option value="dow">Dow Jones 30</option>
                <option value="nasdaq">Nasdaq 100 (Top)</option>
                <option value="ftse">FTSE 100 (Top)</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Layout Shape</label>
              <select 
                className="custom-select" 
                value={layoutShape} 
                onChange={(e) => setLayoutShape(e.target.value)}
              >
                <option value="2-sided">2-Sided Channel</option>
                <option value="4-sided">4-Sided Harbor</option>
              </select>
            </div>
            
            <div className="control-group">
              <label className="control-label">Height (3D Amplitude)</label>
              <select 
                className="custom-select" 
                value={heightMetric} 
                onChange={(e) => setHeightMetric(e.target.value)}
              >
                <option value="performance">Daily Gain/Loss (%)</option>
                <option value="marketCap">Market Capitalization</option>
                <option value="price">Share Price ($)</option>
                <option value="volume">Trading Volume</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Footprint Area (Base Scale)</label>
              <select 
                className="custom-select" 
                value={areaMetric} 
                onChange={(e) => setAreaMetric(e.target.value)}
              >
                <option value="marketCap">Market Capitalization</option>
                <option value="volume">Trading Volume</option>
                <option value="price">Share Price ($)</option>
              </select>
            </div>

            <div className="control-group">
              <label className="control-label">Color Coding Mode</label>
              <select 
                className="custom-select" 
                value={colorMetric} 
                onChange={(e) => setColorMetric(e.target.value)}
              >
                <option value="performance">Gain / Loss Heatmap</option>
                <option value="sector">Sector Color Identity</option>
              </select>
            </div>

          </div>
        </div>

        {/* Search Filter */}
        <div className="control-group" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <h2 className="section-title">Locate Asset</h2>
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search ticker or name..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Sectors List (Coastline Sections) */}
        <div style={{ flex: 1, borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={14} /> Coast Sectors
            </h2>
            {(selectedSector || searchQuery) && (
              <button 
                onClick={clearFilters}
                style={{
                  fontSize: '11px',
                  color: 'var(--primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="sector-list-container">
            {Object.keys(SECTORS).map(key => {
              const sector = SECTORS[key];
              const count = sectorCounts[key] || 0;
              const isActive = selectedSector === key;
              
              return (
                <div 
                  key={key} 
                  className={`sector-row ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedSector(isActive ? null : key)}
                >
                  <div className="sector-row-left">
                    <span 
                      className="sector-dot" 
                      style={{ backgroundColor: `hsl(${sector.hue}, 85%, 55%)` }}
                    />
                    <span>{sector.label}</span>
                  </div>
                  <span className="sector-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Source Toggle */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={toggleDataMode}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}
          >
            {isLiveData ? <WifiOff size={15} /> : <Wifi size={15} />}
            {isLiveData ? 'Use Offline Mock Data' : 'Use Live Yahoo Data'}
          </button>
        </div>

      </aside>

      {/* Main 3D Canvas Visualizer */}
      <main style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--bg-primary)' }}>
        
        {/* Three.js viewport */}
        {!loading || stocks.length > 0 ? (
          <ThreeCanvas
            stocks={stocks}
            heightMetric={heightMetric}
            areaMetric={areaMetric}
            colorMetric={colorMetric}
            selectedSector={selectedSector}
            searchQuery={searchQuery}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
            layoutShape={layoutShape}
          />
        ) : null}

        {/* Loading Overlay HUD */}
        {loading && stocks.length === 0 && (
          <div className="hud-overlay">
            <div className="spinner"></div>
            <div>
              <h3 className="hud-title">Surveying Landscape</h3>
              <p className="hud-desc">Acquiring market statistics and building coastal topography...</p>
            </div>
          </div>
        )}

        {/* Initial empty state check */}
        {!loading && stocks.length === 0 && (
          <div className="hud-overlay">
            <Database className="alert-icon" />
            <div>
              <h3 className="hud-title" style={{ color: 'var(--red)' }}>Survey Failed</h3>
              <p className="hud-desc">Could not connect to the backend server or acquire Yahoo Finance metrics.</p>
            </div>
            <button className="btn btn-primary" onClick={() => fetchStocks()}>Try Reconnecting</button>
          </div>
        )}

        {/* 3D Navigation Instructions HUD */}
        <div className="instructions-overlay">
          <div className="instruction-tag">
            <Compass />
            <span>Drag: Rotate view</span>
          </div>
          <div className="instruction-tag">
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
            <span>Scroll: Zoom</span>
          </div>
          <div className="instruction-tag">
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
            <span>Click Box: Inspect details</span>
          </div>
        </div>

        {/* Right Details Panel Overlay (displays when stock is selected) */}
        {currentStockDetails && (
          <div className="details-panel">
            <div className="details-header">
              <div>
                <span className="stock-symbol-badge">{currentStockDetails.symbol}</span>
                <div className="stock-title">{currentStockDetails.name}</div>
              </div>
              <button 
                onClick={() => setSelectedStock(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div>
              {/* Sector Tag */}
              {(() => {
                const sector = getSectorForTicker(currentStockDetails.symbol);
                const color = sector ? `hsl(${SECTORS[sector].hue}, 85%, 55%)` : 'var(--primary)';
                return (
                  <span 
                    className="sector-tag" 
                    style={{ backgroundColor: `${color}15`, color: color, border: `1px solid ${color}30` }}
                  >
                    {sector || 'Market'}
                  </span>
                );
              })()}
              
              {/* Price & Change */}
              <div className="price-container">
                <span className="price-val">{formatCurrency(currentStockDetails.price)}</span>
                <span className={`change-badge ${currentStockDetails.changePercent >= 0 ? 'up' : 'down'}`}>
                  {currentStockDetails.changePercent >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {currentStockDetails.changePercent >= 0 ? '+' : ''}
                  {currentStockDetails.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Financial Grid */}
            <div className="details-grid">
              
              <div className="detail-item">
                <span className="detail-label">Market Capitalization</span>
                <span className="detail-value">{formatMarketCap(currentStockDetails.marketCap)}</span>
              </div>
              
              <div className="detail-item">
                <span className="detail-label">Daily Net Change</span>
                <span className="detail-value" style={{ color: currentStockDetails.change >= 0 ? 'var(--green)' : 'var(--red)' }}>
                  {currentStockDetails.change >= 0 ? '+' : ''}
                  {currentStockDetails.change.toFixed(2)}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Daily Range</span>
                <span className="detail-value" style={{ fontSize: '13px' }}>
                  {formatCurrency(currentStockDetails.low)} - {formatCurrency(currentStockDetails.high)}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Trading Volume</span>
                <span className="detail-value" style={{ fontSize: '13px' }}>
                  {formatVolume(currentStockDetails.volume)}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Opening Price</span>
                <span className="detail-value">{formatCurrency(currentStockDetails.open)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Previous Close</span>
                <span className="detail-value">{formatCurrency(currentStockDetails.prevClose)}</span>
              </div>

            </div>

            {/* Micro details or sector information */}
            {(() => {
              const sector = getSectorForTicker(currentStockDetails.symbol);
              if (sector) {
                return (
                  <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '2px' }}>
                      Sector Landscape Info
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {SECTORS[sector].description}
                    </div>
                  </div>
                );
              }
              return null;
            })()}

          </div>
        )}

      </main>
    </div>
  );
}
