import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Summary from "./components/Summary";
import CompanyDetails from "./components/CompanyDetails";
import Admin from "./components/Admin";
import { getCurrentUser, logout, getUsers } from "./utils/storage";

const TABS = [
  { label: "Summary", key: "summary" },
  { label: "Admin", key: "admin" }
];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("summary");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUser(u);
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setTab("summary");
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setTab("summary");
    setSelectedCompanyId(null);
  };

  // Only admin can see the Admin tab
  const showTabs = user
    ? [{ label: "Summary", key: "summary" }].concat(
        user.role === "admin" ? [{ label: "Admin", key: "admin" }] : []
      )
    : [];

  return (
    <>
      <div className="tab-bar">
        <div style={{ flex: 1 }}>
          <b>PLMA2 CRM</b>
        </div>
        {user &&
          showTabs.map((t) => (
            <button
              className={tab === t.key ? "active" : ""}
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setSelectedCompanyId(null);
              }}
            >
              {t.label}
            </button>
          ))}
        {user && (
          <span style={{ marginLeft: "1em", fontWeight: 600 }}>
            {user.username}
            <button className="outline" onClick={handleLogout}>
              Log out
            </button>
          </span>
        )}
      </div>
      <div className="container">
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : tab === "summary" ? (
          selectedCompanyId ? (
            <CompanyDetails
              companyId={selectedCompanyId}
              setTab={setTab}
              goBack={() => setSelectedCompanyId(null)}
              user={user}
            />
          ) : (
            <Summary
              setSelectedCompanyId={setSelectedCompanyId}
              user={user}
            />
          )
        ) : tab === "admin" && user.role === "admin" ? (
          <Admin />
        ) : null}
      </div>
    </>
  );
}
