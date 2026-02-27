import React, { useState } from 'react';
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

// --- Custom Accordion Component (since not in adapter) ---
const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="ff-accordion-item">
      <button
        className="ff-accordion-header"
        data-ff-state={isOpen ? 'open' : 'closed'}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
      </button>
      <div className="ff-accordion-content" data-ff-state={isOpen ? 'open' : 'closed'}>
        <div className="ff-accordion-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const Accordion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="ff-accordion">
    {children}
  </div>
);

// --- KPI Card ---
const KPICard: React.FC<{ label: string; value: string; trend: string; color: string }> = ({ label, value, trend, color }) => (
  <Card variant="outline" padding="md" className="ff-hover-lift">
    <div className="ff-flex ff-flex-col ff-gap-1">
      <span className="ff-text-neutral-500 ff-text-sm">{label}</span>
      <div className="ff-flex ff-items-center ff-justify-between">
        <h3 className="ff-m-0 ff-text-2xl">{value}</h3>
        <span className={`ff-text-sm ${color}`}>{trend}</span>
      </div>
    </div>
  </Card>
);

const App: React.FC = () => {
  const [theme, setThemeState] = useState<FingguTheme>('system');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => {
    const next: FingguTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(next);
    setTheme(next);
  };

  return (
    <FingguProvider mode="opt" theme={theme} mapping={mapping}>
      <div className="ff-flex ff-min-h-screen ff-bg-surface ff-w-full">
        {/* Sidebar */}
        <aside className="ff-w-64 ff-border-r ff-bg-surface ff-hidden ff-flex-col @lg:ff-flex">
          <div className="ff-p-6 ff-border-b">
            <h1 className="ff-text-xl ff-font-bold ff-m-0 ff-text-primary">FingguBoard</h1>
          </div>
          <nav className="ff-flex-1 ff-p-4 ff-flex ff-flex-col ff-gap-2">
            <Button variant="ghost" className="ff-justify-start">Dashboard</Button>
            <Button variant="ghost" className="ff-justify-start">Analytics</Button>
            <Button variant="ghost" className="ff-justify-start">Users</Button>
            <Button variant="ghost" className="ff-justify-start">Settings</Button>
          </nav>
          <div className="ff-p-4 ff-border-t">
            <div className="ff-text-sm ff-text-neutral-500">v1.0.0-opt</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ff-flex-1 ff-flex ff-flex-col">
          {/* Header */}
          <header className="ff-h-16 ff-border-b ff-bg-surface ff-flex ff-items-center ff-justify-between ff-p-4 ff-sticky ff-top-0 ff-z-10">
            <div className="ff-flex ff-items-center ff-gap-4">
              <Button variant="ghost" className="@lg:ff-hidden">Menu</Button>
              <h2 className="ff-text-lg ff-m-0">Overview</h2>
            </div>
            <div className="ff-flex ff-items-center ff-gap-3">
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </Button>
              <Dropdown
                trigger={<span>👤 Profile</span>}
                align="right"
              >
                <DropdownItem onClick={() => { }}>My Profile</DropdownItem>
                <DropdownItem onClick={() => { }}>Settings</DropdownItem>
                <DropdownItem onClick={() => { }} className="ff-text-danger">Logout</DropdownItem>
              </Dropdown>
            </div>
          </header>

          <div className="ff-p-6 ff-flex ff-flex-col ff-gap-6">
            {/* KPI Section */}
            <div className="ff-grid ff-grid-cols-1 @md:ff-grid-cols-3 ff-gap-4">
              <KPICard label="Total Users" value="24,512" trend="+12%" color="ff-text-primary" />
              <KPICard label="Active Now" value="1,204" trend="+5%" color="ff-text-primary" />
              <KPICard label="Revenue" value="$45,210" trend="+18%" color="ff-text-primary" />
            </div>

            {/* Analytics Tabs */}
            <Card padding="none">
              <CardHeader className="ff-flex ff-items-center ff-justify-between">
                <Tabs defaultValue="overview">
                  <TabList>
                    <TabTrigger value="overview">Overview</TabTrigger>
                    <TabTrigger value="realtime">Real-time</TabTrigger>
                    <TabTrigger value="reports">Reports</TabTrigger>
                  </TabList>
                </Tabs>
                <Button size="sm" onClick={() => setIsModalOpen(true)}>+ Create User</Button>
              </CardHeader>
              <CardBody>
                <div className="ff-p-4">
                  {/* Table Placeholder */}
                  <div className="ff-overflow-auto">
                    <table className="ff-w-full ff-text-sm">
                      <thead>
                        <tr className="ff-border-b">
                          <th className="ff-p-3 ff-text-left">Name</th>
                          <th className="ff-p-3 ff-text-left">Role</th>
                          <th className="ff-p-3 ff-text-left">Status</th>
                          <th className="ff-p-3 ff-text-right">Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="ff-border-b">
                          <td className="ff-p-3">Jane Doe</td>
                          <td className="ff-p-3">Admin</td>
                          <td className="ff-p-3">Active</td>
                          <td className="ff-p-3 ff-text-right">2m ago</td>
                        </tr>
                        <tr className="ff-border-b">
                          <td className="ff-p-3">John Smith</td>
                          <td className="ff-p-3">Editor</td>
                          <td className="ff-p-3">Offline</td>
                          <td className="ff-p-3 ff-text-right">1h ago</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Settings Accordion */}
            <div className="ff-max-w-xl">
              <h3 className="ff-text-lg ff-mb-4">System Settings</h3>
              <Accordion>
                <AccordionItem title="Security & Privacy">
                  <p>Configure your multi-factor authentication and data encryption settings here.</p>
                  <Button size="sm" variant="outline">Manage Security</Button>
                </AccordionItem>
                <AccordionItem title="Notifications">
                  <p>Manage your email and push notification preferences.</p>
                </AccordionItem>
                <AccordionItem title="Billing & Subscription">
                  <p>View your plan details and billing history.</p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="ff-text-xl ff-mb-4">Create New User</h3>
        <div className="ff-flex ff-flex-col ff-gap-4">
          <div className="ff-flex ff-flex-col ff-gap-1">
            <label className="ff-text-sm ff-text-neutral-500">Full Name</label>
            <input className="ff-input" placeholder="Enter name..." />
          </div>
          <div className="ff-flex ff-flex-col ff-gap-1">
            <label className="ff-text-sm ff-text-neutral-500">Email Address</label>
            <input className="ff-input" type="email" placeholder="email@example.com" />
          </div>
          <div className="ff-flex ff-justify-end ff-gap-2 ff-mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Create User</Button>
          </div>
        </div>
      </Modal>
    </FingguProvider>
  );
};

export default App;
