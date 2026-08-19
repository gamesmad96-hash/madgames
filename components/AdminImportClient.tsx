'use client';

import { useState } from 'react';
import type { Game } from '@/lib/types';

export function AdminImportClient() {
  const [provider, setProvider] = useState('gamemonetize');
  const [feedUrl, setFeedUrl] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [msg, setMsg] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [busy, setBusy] = useState(false);

  async function preview() {
    if (!feedUrl || busy) return;
    setBusy(true);
    setMsg('Loading provider feed…');
    setActionMsg('');
    try {
      const r = await fetch('/api/admin/import/preview', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ provider, feedUrl, limit: 200 }),
      });
      const j = await r.json();
      if (!r.ok) {
        setMsg(j.error || 'Failed to load provider feed.');
        return;
      }
      setGames(j.games || []);
      setSelected((j.games || []).map((g: Game) => g.id));
      setMsg(`${j.games?.length || 0} valid games found.`);
    } catch (error: any) {
      setMsg(error?.message || 'Could not load provider feed.');
    } finally {
      setBusy(false);
    }
  }

  async function commit(publish: boolean) {
    if (busy) return;
    const chosen = games.filter(g => selected.includes(g.id));
    if (!chosen.length) {
      setActionMsg('Select at least one game first.');
      return;
    }

    setBusy(true);
    setActionMsg(`${publish ? 'Publishing' : 'Saving'} ${chosen.length} game${chosen.length === 1 ? '' : 's'}…`);

    try {
      const r = await fetch('/api/admin/import/commit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ games: chosen, publish }),
      });
      const j = await r.json();
      if (!r.ok) {
        setActionMsg(j.error || 'Import failed.');
        return;
      }

      setActionMsg(`${j.saved} game${j.saved === 1 ? '' : 's'} ${publish ? 'published' : 'saved'} successfully. Opening Games…`);
      window.setTimeout(() => window.location.assign('/admin/games'), 900);
    } catch (error: any) {
      setActionMsg(error?.message || 'Import failed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <section className="adminPanel">
        <div className="formGrid">
          <label>
            Provider
            <select value={provider} onChange={e => setProvider(e.target.value)} disabled={busy}>
              <option value="gamemonetize">GameMonetize</option>
              <option value="gamedistribution">GameDistribution</option>
              <option value="generic">Generic JSON/XML</option>
            </select>
          </label>
          <label className="span2">
            Official feed URL
            <input
              value={feedUrl}
              onChange={e => setFeedUrl(e.target.value)}
              placeholder="Paste the JSON/XML feed URL from your publisher dashboard"
              disabled={busy}
            />
          </label>
          <button type="button" className="primaryBtn" onClick={preview} disabled={!feedUrl || busy}>
            {busy && !games.length ? 'Loading…' : 'Preview feed'}
          </button>
        </div>
        <p className="adminMsg">{msg}</p>
      </section>

      {games.length > 0 && (
        <section className="adminPanel">
          <div className="sectionHead">
            <h2>Import preview</h2>
            <div className="gameActions">
              <button
                type="button"
                className="secondaryBtn"
                disabled={busy}
                onClick={() => setSelected(selected.length === games.length ? [] : games.map(g => g.id))}
              >
                {selected.length === games.length ? 'Clear all' : 'Select all'}
              </button>
              <button
                type="button"
                className="secondaryBtn"
                disabled={busy || !selected.length}
                onClick={() => commit(false)}
              >
                {busy ? 'Please wait…' : `Save pending (${selected.length})`}
              </button>
              <button
                type="button"
                className="primaryBtn"
                disabled={busy || !selected.length}
                onClick={() => commit(true)}
              >
                {busy ? 'Publishing…' : `Publish selected (${selected.length})`}
              </button>
            </div>
          </div>

          <p className="adminMsg" aria-live="polite">{actionMsg || `${selected.length} of ${games.length} games selected.`}</p>

          <div className="adminTable">
            {games.map(g => (
              <label className="adminRow importRow" key={g.id}>
                <input
                  type="checkbox"
                  checked={selected.includes(g.id)}
                  disabled={busy}
                  onChange={() => setSelected(s => s.includes(g.id) ? s.filter(x => x !== g.id) : [...s, g.id])}
                />
                <span className={`miniArt ${g.gradient}`}>{g.emoji}</span>
                <div>
                  <strong>{g.title}</strong>
                  <small>{g.category} • {g.provider}</small>
                </div>
                <span className="statusPill">Ready</span>
              </label>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
