import { useState, useEffect } from 'react';
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import DateBar from '../../components/DateBar/DateBar';
import './FoodLogging.css';
 
// ── Daily goals — replace with real user prefs from DB when ready ──
const GOALS = { calories: 2500, protein: 180, carbs: 250, fats: 70 };
 
const sumMacro = (entries, key) =>
  entries.reduce((acc, e) => acc + (e[key] || 0), 0);
 
const pct = (val, goal) => Math.min(100, Math.round((val / goal) * 100));
 
const FoodLogging = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dateKey = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
 
  // Search
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
 
  // Selected food before confirming
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
 
  // Logged entries for the day
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
 
  // ── Load entries whenever date changes ──
  useEffect(() => {
    const load = async () => {
      setLoadingEntries(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:5000/api/food-logging?date=${dateKey}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error();
        setEntries(await res.json());
      } catch {
        setEntries([]);
      } finally {
        setLoadingEntries(false);
      }
    };
    load();
  }, [dateKey]);
 
  // ── Search food via Flask → Open Food Facts ──
  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setSearchError('');
    setSearchResults([]);
    setSelected(null);
    try {
      const res = await fetch(
        `http://localhost:5000/api/food-search?query=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (!data.products?.length) {
        setSearchError('No results found. Try a different term.');
      } else {
        setSearchResults(data.products);
      }
    } catch {
      setSearchError('Could not reach the food database. Make sure Flask is running.');
    } finally {
      setSearching(false);
    }
  };
 
  // ── Scale macros from per-100g to chosen serving size ──
  const scaledMacros = (product, g) => {
    const n = product.nutriments || {};
    const f = g / 100;
    return {
      calories: Math.round((n['energy-kcal_100g'] || 0) * f),
      protein:  Math.round((n['proteins_100g']     || 0) * f * 10) / 10,
      carbs:    Math.round((n['carbohydrates_100g']|| 0) * f * 10) / 10,
      fats:     Math.round((n['fat_100g']           || 0) * f * 10) / 10,
    };
  };
 
  // ── Log the selected food to MongoDB ──
  const handleLog = async () => {
    if (!selected) return;
    const entry = {
      date: dateKey,
      name: selected.product_name || 'Unknown product',
      grams,
      ...scaledMacros(selected, grams),
    };
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/food-logging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setEntries((prev) => [...prev, saved]);
      setSelected(null);
      setGrams(100);
    } catch {
      alert('Could not save entry. Make sure you are logged in.');
    }
  };
 
  // ── Delete an entry ──
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/food-logging/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert('Could not delete entry.');
    }
  };
 
  const totals = {
    calories: sumMacro(entries, 'calories'),
    protein:  sumMacro(entries, 'protein'),
    carbs:    sumMacro(entries, 'carbs'),
    fats:     sumMacro(entries, 'fats'),
  };
 
  const macroConfig = [
    { key: 'protein', label: 'Protein', unit: 'g', cls: 'fl-bar-protein' },
    { key: 'carbs',   label: 'Carbs',   unit: 'g', cls: 'fl-bar-carbs'   },
    { key: 'fats',    label: 'Fats',    unit: 'g', cls: 'fl-bar-fats'    },
  ];
 
  return (
    <>
      <MainNavigationBar />
      <SecondNavigationBar />
 
      {/* Pass date state down so DateBar controls which day we're viewing */}
      <DateBar currentDate={currentDate} setCurrentDate={setCurrentDate} />
 
      <div className="fl-page">
 
        {/* ── DAILY PROGRESS ── */}
        <section className="fl-section">
          <h2 className="fl-section-title">Daily Progress</h2>
          <div className="fl-card">
 
            {/* Calories bar */}
            <div className="fl-macro-row fl-macro-row--calories">
              <div className="fl-macro-labels">
                <span className="fl-macro-name">Calories</span>
                <span className="fl-macro-value">
                  {totals.calories}
                  <span className="fl-goal"> / {GOALS.calories} kcal</span>
                </span>
              </div>
              <div className="fl-bar-track">
                <div
                  className="fl-bar-fill fl-bar-calories"
                  style={{ width: `${pct(totals.calories, GOALS.calories)}%` }}
                />
              </div>
              <span className="fl-pct">{pct(totals.calories, GOALS.calories)}%</span>
            </div>
 
            {/* Protein / Carbs / Fats bars */}
            {macroConfig.map(({ key, label, unit, cls }) => (
              <div className="fl-macro-row" key={key}>
                <div className="fl-macro-labels">
                  <span className="fl-macro-name">{label}</span>
                  <span className="fl-macro-value">
                    {totals[key]}{unit}
                    <span className="fl-goal"> / {GOALS[key]}{unit}</span>
                  </span>
                </div>
                <div className="fl-bar-track">
                  <div
                    className={`fl-bar-fill ${cls}`}
                    style={{ width: `${pct(totals[key], GOALS[key])}%` }}
                  />
                </div>
                <span className="fl-pct">{pct(totals[key], GOALS[key])}%</span>
              </div>
            ))}
 
          </div>
        </section>
 
        {/* ── ADD FOOD ── */}
        <section className="fl-section">
          <h2 className="fl-section-title">Add Food</h2>
 
          <div className="fl-search-row">
            <input
              className="fl-input"
              type="text"
              placeholder="Search food (e.g. chicken breast, banana…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="fl-btn-primary"
              onClick={handleSearch}
              disabled={searching}
            >
              {searching ? 'Searching…' : 'Search'}
            </button>
          </div>
 
          {searchError && <p className="fl-error">{searchError}</p>}
 
          {/* Results dropdown */}
          {searchResults.length > 0 && (
            <ul className="fl-results-list">
              {searchResults.map((p, i) => (
                <li
                  key={p.code || i}
                  className="fl-result-item"
                  onClick={() => {
                    setSelected(p);
                    setSearchResults([]);
                    setQuery('');
                  }}
                >
                  <span className="fl-result-name">
                    {p.product_name || 'Unnamed product'}
                  </span>
                  <span className="fl-result-kcal">
                    {p.nutriments?.['energy-kcal_100g']
                      ? `${Math.round(p.nutriments['energy-kcal_100g'])} kcal / 100g`
                      : 'No calorie data'}
                  </span>
                </li>
              ))}
            </ul>
          )}
 
          {/* Selected food — adjust serving and preview macros */}
          {selected && (
            <div className="fl-selected-card">
              <p className="fl-selected-name">{selected.product_name}</p>
 
              <div className="fl-serving-row">
                <label className="fl-label" htmlFor="grams">Serving (g)</label>
                <input
                  id="grams"
                  className="fl-input fl-input--small"
                  type="number"
                  min="1"
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value))}
                />
              </div>
 
              {/* Macro preview */}
              <div className="fl-preview-pills">
                {Object.entries(scaledMacros(selected, grams)).map(([k, v]) => (
                  <div className="fl-pill" key={k}>
                    <span className="fl-pill-label">{k}</span>
                    <span className="fl-pill-value">
                      {v}{k === 'calories' ? ' kcal' : 'g'}
                    </span>
                  </div>
                ))}
              </div>
 
              <div className="fl-selected-actions">
                <button className="fl-btn-primary" onClick={handleLog}>
                  Log Food
                </button>
                <button
                  className="fl-btn-secondary"
                  onClick={() => setSelected(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
 
        {/* ── TODAY'S LOG TABLE ── */}
        <section className="fl-section">
          <h2 className="fl-section-title">
            Today's Log
            <span className="fl-entry-count">
              {entries.length} item{entries.length !== 1 ? 's' : ''}
            </span>
          </h2>
 
          {loadingEntries ? (
            <p className="fl-loading">Loading…</p>
          ) : entries.length === 0 ? (
            <p className="fl-empty">No food logged yet. Search above to add.</p>
          ) : (
            <div className="fl-table-wrapper">
              <table className="fl-table">
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Serving</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbs</th>
                    <th>Fats</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id}>
                      <td>{entry.name}</td>
                      <td>{entry.grams}g</td>
                      <td>{entry.calories} kcal</td>
                      <td>{entry.protein}g</td>
                      <td>{entry.carbs}g</td>
                      <td>{entry.fats}g</td>
                      <td>
                        <button
                          className="fl-btn-delete"
                          onClick={() => handleDelete(entry._id)}
                          title="Remove"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
 
      </div>
    </>
  );
};
 
export default FoodLogging;
