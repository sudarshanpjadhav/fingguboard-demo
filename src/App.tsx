import React, { useState, useEffect } from 'react';
import {
  FingguProvider
} from '@finggujadhav/react';
import { setTheme, type FingguTheme } from '@finggujadhav/js-helper';
import mapping from './finggu-mapping.json';

// --- Types ---
type FingguMode = 'dev' | 'opt' | 'ext';

// --- Console Sub-Components ---

const SystemMetric: React.FC<{ label: string; value: string; status?: 'emerald' | 'red' | 'amber' }> = ({ label, value, status }) => (
  <div className="ff-grid-item">
    <div className="ff-label-small">{label}</div>
    <div className="ff-flex ff-items-center ff-justify-between">
      <div className="ff-value-large">{value}</div>
      {status && <div className={`ff-dot ff-dot-${status}`} />}
    </div>
  </div>
);

const LogEntry: React.FC<{ timestamp: string; event: string; status: string; source: string }> = ({ timestamp, event, status, source }) => (
  <tr className="ff-log-row">
    <td style={{ color: 'var(--ff-text-dim)' }}>{timestamp}</td>
    <td style={{ fontWeight: 'bold' }}>{event}</td>
    <td style={{ color: status === 'SUCCESS' ? 'var(--ff-emerald)' : 'var(--ff-red)' }}>{status}</td>
    <td style={{ color: 'var(--ff-text-dim)' }}>{source}</td>
  </tr>
);

const TelemetryRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="ff-flex ff-justify-between ff-items-center" style={{ padding: '8px 0', borderBottom: '1px solid var(--ff-border)' }}>
    <span style={{ fontSize: '11px', color: 'var(--ff-text-dim)' }}>{label}</span>
    <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{value}</span>
  </div>
);

// --- Main Console App ---

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<FingguTheme>('dark');
  const [mode, setMode] = useState<FingguMode>('opt');
  const [violation, setViolation] = useState(false);

  useEffect(() => {
    setTheme(currentTheme);
  }, [currentTheme]);

  return (
    <FingguProvider mode={mode} theme={currentTheme} mapping={mapping}>
      <div className="ff-console-root">

        {/* Violation Warning Strip */}
        {violation && (
          <div className="ff-alert-strip">
            <span>[CRITICAL] DESIGN_CONTRACT_VIOLATION DETECTED</span>
            <span>COMPONENT: METRIC_CARD_04</span>
            <button className="ff-btn-console" style={{ background: '#fff', color: '#ff3b3b' }} onClick={() => setViolation(false)}>RESOLVE_CONTRACT</button>
          </div>
        )}

        {/* Global Console Header */}
        <header className="ff-console-header">
          <div className="ff-flex ff-items-center ff-gap-2">
            <span style={{ fontWeight: 900, fontSize: '12px', letterSpacing: '1px' }}>FINGGUFLUX_CONTROL</span>
            <span style={{ color: 'var(--ff-text-dim)', fontSize: '10px' }}>PROD_TELEMETRY v0.9.17</span>
          </div>

          <div className="ff-flex ff-items-center ff-gap-2">
            <div className={`ff-status ${violation ? 'ff-text-red' : 'ff-text-emerald'}`}>
              <div className={`ff-dot ${violation ? 'ff-dot-red' : 'ff-dot-emerald'}`} />
              {violation ? 'CONTRACT_VIOLATED' : 'CONTRACT_VERIFIED'}
            </div>

            <span style={{ color: 'var(--ff-border)', margin: '0 8px' }}>|</span>

            <div className="ff-flex ff-gap-1">
              {(['dev', 'opt', 'ext'] as FingguMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="ff-btn-console"
                  style={{
                    borderColor: mode === m ? 'var(--ff-emerald)' : 'var(--ff-border)',
                    color: mode === m ? 'var(--ff-emerald)' : 'var(--ff-text-dim)'
                  }}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            <button className="ff-btn-console" onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}>
              THEME: {currentTheme.toUpperCase()}
            </button>
          </div>
        </header>

        {/* Main Interface Body */}
        <div className="ff-console-body">

          {/* Main Control Panel (70%) */}
          <main className="ff-panel-main">

            {/* System Metrics Module */}
            <section className="ff-module">
              <div className="ff-module-header">SYSTEM_CORE_METRICS</div>
              <div className="ff-grid-dense">
                <SystemMetric label="CLASSES_HARDENED" value="111" status="emerald" />
                <SystemMetric label="UNUSED_PRUNED" value="1,492" status="emerald" />
                <SystemMetric label="REDUCTION_RATE" value="42.5%" />
                <SystemMetric label="RUNTIME_INJECT" value="0.0 KB" status="emerald" />
                <SystemMetric label="ENGINE_MODE" value={mode.toUpperCase()} />
                <SystemMetric label="NODE_STATUS" value="STABLE" status={violation ? 'red' : 'emerald'} />
              </div>
            </section>

            {/* Event Log Module */}
            <section className="ff-module" style={{ flex: 1 }}>
              <div className="ff-module-header">
                REALTIME_EVENT_LOG
                <div style={{ color: 'var(--ff-emerald)', fontSize: '10px' }}>LIVE_STREAMING...</div>
              </div>
              <div className="ff-h-full ff-overflow-auto">
                <table className="ff-log-table">
                  <thead>
                    <tr>
                      <th>TIMESTAMP</th>
                      <th>EVENT_DESCRIPTOR</th>
                      <th>STATE</th>
                      <th>SOURCE_ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LogEntry timestamp="12:44:01" event="HARDENED_CONTRACT_RESOLVED" status="SUCCESS" source="COMPILER" />
                    <LogEntry timestamp="12:43:55" event="DETERMINISTIC_TOKEN_SYNC" status="SUCCESS" source="ADAPTER" />
                    <LogEntry timestamp="12:42:10" event="SNAPSHOT_VALIDATION" status="SUCCESS" source="CORE" />
                    <LogEntry timestamp="12:41:00" event="VITE_HMR_RELOAD" status="SUCCESS" source="WATCHER" />
                    {violation && (
                      <LogEntry timestamp="12:45:12" event="DESIGN_TOKEN_DRIFT_EXCEPTION" status="FAILURE" source="HARDENING_ENGINE" />
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Sandbox Controls Module */}
            <section className="ff-module">
              <div className="ff-module-header">SIMULATION_CONTROLS</div>
              <div className="ff-p-2 ff-flex ff-gap-2">
                <button className="ff-btn-console ff-btn-danger" onClick={() => setViolation(true)}>
                  SIMULATE_CONTRACT_VIOLATION
                </button>
                <button className="ff-btn-console" onClick={() => console.log('Rebuilding...')}>
                  FORCE_COMPILER_REBUILD
                </button>
                <button className="ff-btn-console" onClick={() => console.log('Pruning...')}>
                  PRUNE_UNUSED_SELECTORS
                </button>
              </div>
            </section>
          </main>

          {/* Contract Telemetry Panel (30%) */}
          <aside className="ff-panel-side">

            <section className="ff-module">
              <div className="ff-module-header">COMPILER_TELEMETRY</div>
              <div className="ff-p-2">
                <TelemetryRow label="VERSION" value="0.9.17" />
                <TelemetryRow label="MODE" value={mode.toUpperCase()} />
                <TelemetryRow label="SHARD_ID" value="FF-US-E1" />
                <TelemetryRow label="LOAD_AVG" value="0.04" />
                <TelemetryRow label="MEMORY" value="44MB" />
              </div>
            </section>

            <section className="ff-module">
              <div className="ff-module-header">DETERMINISTIC_MAPPING</div>
              <div className="ff-p-2">
                <div className="ff-flex ff-flex-col ff-gap-1">
                  <div style={{ fontSize: '10px', color: 'var(--ff-text-dim)', background: 'var(--ff-bg-base)', padding: '4px', border: '1px solid var(--ff-border)' }}>
                    .ff-btn-primary → .ff-v9a1
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ff-text-dim)', background: 'var(--ff-bg-base)', padding: '4px', border: '1px solid var(--ff-border)' }}>
                    .ff-card-header → .ff-k82x
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ff-text-dim)', background: 'var(--ff-bg-base)', padding: '4px', border: '1px solid var(--ff-border)' }}>
                    .ff-text-muted → .ff-m1p9
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ff-text-dim)', background: 'var(--ff-bg-base)', padding: '4px', border: '1px solid var(--ff-border)' }}>
                    .ff-module-head → .ff-z3r1
                  </div>
                </div>
              </div>
            </section>

            <section className="ff-module" style={{ flex: 1 }}>
              <div className="ff-module-header">HARDENING_PROFILE</div>
              <div className="ff-p-2" style={{ fontSize: '11px', lineHeight: '1.6', color: 'var(--ff-text-dim)' }}>
                {mode === 'ext' ? (
                  <>
                    [EXTREME_MODE] ACTIVE. <br />
                    ALL SELECTORS OBFUSCATED. <br />
                    CONTRACT SEALED AT BUILD TIME. <br />
                    NO DYNAMIC INJECTION ALLOWED.
                  </>
                ) : (
                  <>
                    [OPTIMIZED_MODE] ACTIVE. <br />
                    DETERMINISTIC MAPPING ENABLED. <br />
                    UNUSED CSS REMOVED (84%). <br />
                    READY FOR PRODUCTION.
                  </>
                )}
              </div>
            </section>

          </aside>
        </div>
      </div>
    </FingguProvider>
  );
};

export default App;
