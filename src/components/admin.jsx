import React, { useState, useEffect } from "react";
import {
  getUsers,
  addUser,
  removeUser,
  getCompanies,
  addCompany,
  setCompanies,
  removeCompany,
  exportCompaniesToCSV,
  importCompaniesFromCSV
} from "../utils/storage";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [companies, setCompaniesState] = useState([]);
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "bdrep" });
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    setUsers(getUsers());
    setCompaniesState(getCompanies());
  }, []);

  function handleAddUser(e) {
    e.preventDefault();
    if (!newUser.username || !newUser.password) return;
    addUser(newUser.username, newUser.password, newUser.role);
    setUsers(getUsers());
    setNewUser({ username: "", password: "", role: "bdrep" });
  }

  function handleRemoveUser(u) {
    if (!window.confirm(`Remove user ${u}?`)) return;
    removeUser(u);
    setUsers(getUsers());
  }

  function handleCsvUpload(e) {
    const file = e.target.files[0];
    setCsvFile(file);
  }

  async function handleImportCsv() {
    if (!csvFile) return;
    const text = await csvFile.text();
    const imported = importCompaniesFromCSV(text);
    setCompanies(imported);
    setCompaniesState(getCompanies());
    setCsvFile(null);
    alert("Import complete!");
  }

  function handleExportCsv() {
    const csv = exportCompaniesToCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "companies.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRemoveCompany(id) {
    if (!window.confirm("Delete this company?")) return;
    removeCompany(id);
    setCompaniesState(getCompanies());
  }

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Users</h3>
      <table>
        <thead>
          <tr><th>Email</th><th>Role</th><th>Remove</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.username}>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                {u.role !== "admin" && (
                  <button className="danger" onClick={() => handleRemoveUser(u.username)}>
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="mt-2" onSubmit={handleAddUser}>
        <label>Add user (BD Rep)</label>
        <input
          type="email"
          placeholder="Email"
          value={newUser.username}
          onChange={e => setNewUser(u => ({ ...u, username: e.target.value }))}
          required
        />
        <input
          type="text"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser(u => ({ ...u, password: e.target.value }))}
          required
        />
        <button>Add User</button>
      </form>
      <h3 className="mt-2">Company Data</h3>
      <button onClick={handleExportCsv}>Export Companies to CSV</button>
      <div className="mt-1">
        <label>Import Companies from CSV</label>
        <input type="file" accept=".csv" onChange={handleCsvUpload} />
        <button onClick={handleImportCsv} disabled={!csvFile}>Import</button>
      </div>
      <h4 className="mt-2">All Companies ({companies.length})</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.priority}</td>
              <td>
                <button className="danger" onClick={() => handleRemoveCompany(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2">
        <i>Field editing is not implemented in this demo (fields are fixed in code).</i>
      </div>
    </div>
  );
}
