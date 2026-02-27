import React, { useState, useEffect } from 'react';
import {
  FingguProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabList,
  TabTrigger,
  Modal,
  Dropdown,
  DropdownItem
} from '@finggujadhav/react';
import { setTheme, type FingguTheme } from '@finggujadhav/js-helper';
import mapping from './finggu-mapping.json';

// --- Types ---
type FingguMode = 'dev' | 'opt' | 'ext';

// --- Sub-Components ---

const SystemBar: React.FC = () => (
  <div className="ff-system-bar ff-flex ff-items-center ff-justify-between ff-px-4">
    <div className="ff-flex ff-gap-4">
      <span>System: Operational</span>
      <span>Latency: 14ms</span>
    </div>
    <div className="ff-flex ff-gap-4">
      <span>Region: US-EAST-1</span>
      <span>Hardening: Extreme</span>
    </div>
  </div>
);

const KPICard: React.FC<{ label: string; value: string; trend: string; positive?: boolean; delay: string }> = ({ label, value, trend, positive = true, delay }) => (
  <Card variant="outline" className={`ff-hover-lift ff-animate-in ff-kpi-card ff-bg-surface-raised`} style={{ animationDelay: delay }}>
    <div className="ff-p-6">
      <div className="ff-flex ff-justify-between ff-items-start ff-mb-4">
        <span className="ff-text-text-muted ff-text-xs ff-font-medium ff-uppercase ff-tracking-wider">{label}</span>
        <div className={`ff-px-2 ff-py-0.5 ff-rounded-full ff-text-xs ${positive ? 'ff-bg-success-glow ff-text-success' : 'ff-bg-danger-glow ff-text-danger'}`}>
          {trend}
        </div>
      </div>
      <div className="ff-text-3xl ff-font-bold ff-mb-1">{value}</div>
      <div className="ff-w-full ff-h-1 ff-bg-border ff-mt-4 ff-rounded-full ff-relative">
        <div className="ff-absolute ff-h-full ff-bg-primary ff-rounded-full" style={{ width: '65%' }}></div>
      </div>
    </div>
  </Card>
);

const TimelineItem: React.FC<{ title: string; time: string; active?: boolean }> = ({ title, time, active }) => (
  <div className="ff-timeline-item">
    <div className={`ff-timeline-dot ${active ? 'active' : ''}`}></div>
    <div className="ff-text-sm ff-font-medium">{title}</div>
    <div className="ff-text-xs ff-text-text-muted">{time}</div>
  </div>
);

const TokenSwatch: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <div className="ff-flex ff-items-center ff-gap-3">
    <div className="ff-token-swatch" style={{ backgroundColor: color }}></div>
    <span className="ff-text-xs ff-font-mono">{label}</span>
  </div>
);

// --- Main App ---

const App: React.FC = () => {
  const [theme, setThemeState] = useState<FingguTheme>('dark');
  const [mode, setMode] = useState<FingguMode>('opt');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Force dark-first premium theme
    setTheme('dark');
  }, []);

  const toggleTheme = () => {
    const next: FingguTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    setTheme(next);
  };

  return (
    <FingguProvider mode={mode} theme={theme} mapping={mapping}>
      <div className="ff-flex ff-flex-col ff-min-h-screen ff-bg-surface ff-text-text">
        <SystemBar />

        <div className="ff-flex ff-flex-1">
          {/* Sidebar */}
          <aside className="ff-w-72 ff-glass ff-hidden ff-flex-col @lg:ff-flex">
            <div className="ff-p-8">
              <div className="ff-flex ff-items-center ff-gap-3 ff-mb-8">
                <div className="ff-w-8 ff-h-8 ff-bg-primary ff-rounded-lg ff-animate-pulse"></div>
                <h1 className="ff-text-xl ff-font-bold ff-tracking-tight">FingguBoard</h1>
              </div>

              <nav className="ff-flex ff-flex-col ff-gap-2">
                <Button variant="ghost" className="ff-justify-start ff-bg-surface-accent">
                  <span className="ff-mr-3">📊</span> Control Center
                </Button>
                <Button variant="ghost" className="ff-justify-start">
                  <span className="ff-mr-3">🛡️</span> Security Mesh
                </Button>
                <Button variant="ghost" className="ff-justify-start">
                  <span className="ff-mr-3">🚀</span> Deployment
                </Button>
                <Button variant="ghost" className="ff-justify-start">
                  <span className="ff-mr-3">⚙️</span> Settings
                </Button>
              </nav>
            </div>

            <div className="ff-mt-auto ff-p-8 ff-border-t ff-border-border">
              <Card variant="outline" className="ff-p-4 ff-bg-surface-accent ff-border-none">
                <div className="ff-text-xs ff-text-text-muted ff-mb-2">CURRENT PLAN</div>
                <div className="ff-text-sm ff-font-bold">Enterprise Pro</div>
              </Card>
            </div>
          </aside>

          {/* Main Body */}
          <main className="ff-flex-1 ff-flex ff-flex-col">
            {/* Header */}
            <header className="ff-h-20 ff-border-b ff-border-border ff-px-8 ff-flex ff-items-center ff-justify-between">
              <div>
                <h2 className="ff-text-2xl ff-font-bold ff-tracking-tight">Enterprise Overview</h2>
                <p className="ff-text-sm ff-text-text-muted">Global node status and security metrics.</p>
              </div>

              <div className="ff-flex ff-items-center ff-gap-4">
                {/* Mode Switcher */}
                <div className="ff-flex ff-bg-surface-accent ff-rounded-lg ff-p-1 ff-border ff-border-border">
                  {(['dev', 'opt', 'ext'] as FingguMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`ff-px-3 ff-py-1 ff-text-xs ff-rounded-md ff-transition-all ${mode === m ? 'ff-bg-primary ff-text-white ff-shadow-md' : 'ff-text-text-muted hover:ff-text-text'
                        }`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={toggleTheme}>
                  {theme === 'light' ? '🌙' : '☀️'}
                </Button>

                <Dropdown trigger={<Button variant="primary" size="sm">Action</Button>} align="right">
                  <DropdownItem onClick={() => setIsModalOpen(true)}>Create Contract</DropdownItem>
                  <DropdownItem onClick={() => { }}>System Rebuild</DropdownItem>
                </Dropdown>
              </div>
            </header>

            <div className="ff-p-8 ff-overflow-y-auto">
              {/* KPI Section */}
              <div className="ff-grid ff-grid-cols-1 @md:ff-grid-cols-2 @xl:ff-grid-cols-4 ff-gap-6 ff-mb-8">
                <KPICard label="Active Containers" value="1,429" trend="+12.4%" delay="0.1s" />
                <KPICard label="Network Inbound" value="4.2 GB/s" trend="+5.2%" delay="0.2s" />
                <KPICard label="Threats Blocked" value="28,512" trend="+18.1%" delay="0.3s" />
                <KPICard label="System Uptime" value="99.99%" trend="Stable" delay="0.4s" />
              </div>

              <div className="ff-grid ff-grid-cols-1 @xl:ff-grid-cols-3 ff-gap-8">
                {/* Main Content Area */}
                <div className="ff-col-span-2 ff-flex ff-flex-col ff-gap-8">
                  <Card className="ff-animate-in" style={{ animationDelay: '0.5s' }}>
                    <CardHeader className="ff-flex ff-items-center ff-justify-between">
                      <div className="ff-font-bold">Contract Performance</div>
                      <Tabs defaultValue="24h">
                        <TabList>
                          <TabTrigger value="24h">24H</TabTrigger>
                          <TabTrigger value="7d">7D</TabTrigger>
                          <TabTrigger value="30d">30D</TabTrigger>
                        </TabList>
                      </Tabs>
                    </CardHeader>
                    <CardBody>
                      <div className="ff-h-64 ff-w-full ff-bg-surface-accent ff-rounded-lg ff-flex ff-items-center ff-justify-center ff-border ff-border-dashed ff-border-border">
                        <div className="ff-text-text-muted ff-text-sm ff-flex ff-flex-col ff-items-center">
                          <span className="ff-text-4xl ff-mb-2">📈</span>
                          Advanced Analytics Visualization
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="ff-animate-in" padding="none" style={{ animationDelay: '0.6s' }}>
                    <CardHeader className="ff-font-bold">Active Contracts</CardHeader>
                    <CardBody>
                      <table className="ff-w-full ff-text-left ff-text-sm">
                        <thead className="ff-bg-surface-accent">
                          <tr>
                            <th className="ff-p-4 ff-font-semibold">Contract ID</th>
                            <th className="ff-p-4 ff-font-semibold">Entity</th>
                            <th className="ff-p-4 ff-font-semibold">Status</th>
                            <th className="ff-p-4 ff-font-semibold ff-text-right">Risk</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="ff-border-b ff-border-border hover:ff-bg-surface-accent ff-transition-colors">
                            <td className="ff-p-4 ff-font-mono">CNTR-0916-XA</td>
                            <td className="ff-p-4">Global Finance Ltd</td>
                            <td className="ff-p-4"><span className="ff-text-success">● Active</span></td>
                            <td className="ff-p-4 ff-text-right">Minimal</td>
                          </tr>
                          <tr className="ff-border-b ff-border-border hover:ff-bg-surface-accent ff-transition-colors">
                            <td className="ff-p-4 ff-font-mono">CNTR-0916-YB</td>
                            <td className="ff-p-4">Nova Streaming</td>
                            <td className="ff-p-4"><span className="ff-text-warning">● Review</span></td>
                            <td className="ff-p-4 ff-text-right">Moderate</td>
                          </tr>
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                </div>

                {/* Sidebar area */}
                <div className="ff-flex ff-flex-col ff-gap-8">
                  {/* Activity Timeline */}
                  <Card className="ff-animate-in" style={{ animationDelay: '0.7s' }}>
                    <CardHeader className="ff-font-bold">Activity Log</CardHeader>
                    <CardBody>
                      <div className="ff-timeline">
                        <TimelineItem title="New Extreme Build Published" time="2 mins ago" active />
                        <TimelineItem title="Security Audit Passed" time="15 mins ago" />
                        <TimelineItem title="Node US-WEST-2 Scale Out" time="2 hours ago" />
                        <TimelineItem title="System Version Updated v0.9.16" time="5 hours ago" />
                      </div>
                    </CardBody>
                  </Card>

                  {/* Token Playground */}
                  <Card className="ff-animate-in" style={{ animationDelay: '0.8s' }}>
                    <CardHeader className="ff-font-bold">Token Playground</CardHeader>
                    <CardBody className="ff-flex ff-flex-col ff-gap-4">
                      <TokenSwatch label="Primary" color="var(--ff-primary)" />
                      <TokenSwatch label="Surface" color="var(--ff-surface)" />
                      <TokenSwatch label="Accent" color="var(--ff-surface-accent)" />
                      <TokenSwatch label="Text Muted" color="var(--ff-text-muted)" />
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="ff-p-2">
            <h3 className="ff-text-2xl ff-font-bold ff-mb-2">Create New Showcase Contract</h3>
            <p className="ff-text-text-muted ff-mb-6">Initialize a new secure contract entry in the system.</p>
            <div className="ff-flex ff-flex-col ff-gap-5">
              <div className="ff-flex ff-flex-col ff-gap-1.5">
                <label className="ff-text-xs ff-font-bold ff-uppercase ff-tracking-widest">Entity Name</label>
                <input className="ff-input ff-bg-surface-accent ff-border-border" placeholder="e.g. Acme Corp" />
              </div>
              <div className="ff-flex ff-flex-col ff-gap-1.5">
                <label className="ff-text-xs ff-font-bold ff-uppercase ff-tracking-widest">Contract Period</label>
                <select className="ff-input ff-bg-surface-accent ff-border-border">
                  <option>12 Months</option>
                  <option>24 Months</option>
                  <option>Permanent</option>
                </select>
              </div>
              <div className="ff-flex ff-justify-end ff-gap-3 ff-mt-6">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>Create Entry</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </FingguProvider>
  );
};

export default App;
