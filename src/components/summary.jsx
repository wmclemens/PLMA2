import React, { useState, useEffect } from "react";
import { getCompanies } from "../utils/storage";

const STATUS_ORDER = [
  "Active",
  "Interested Now",
  "Interested Later",
  "Passed",
  "Lost",
  "Not interested"
];
const PRIORITY_ORDER = ["High", "Medium", "Low"];

function getSortVal(val, arr) {
  const i = arr.indexOf(val);
  return i === -1 ? 100 : i;
}

export default function Summary({ setSelectedCompanyId, user }) {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setCompanies(getCompanies());
  }, []);

  const sorted = [...companies].sort((a, b) => {
    // sort by Status, then Name, then Priority
    const s = getSortVal(a.status, STATUS_ORDER) - getSortVal(b.status, STATUS_ORDER);
    if (s !== 0) return s;
    const p = a.name.localeCompare(b.name);
    if (p !== 0) return p;
    return getSortVal(a.priority, PRIORITY_ORDER) - getSortVal(b.priority, PRIORITY_ORDER);
  });

  return (
    <div>
      <h2>Company Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Description</th>
            <th>Employee Count</th>
            <th>Employee Count Source</th>
            <th>Revenue Estimate</th>
            <th>Revenue Estimate Source</th>
            <th>Location</th>
            <th>Original Name Source</th>
            <th>Activity (most recent)</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c) => (
            <tr key={c.id}>
              <td>
                <a onClick={() => setSelectedCompanyId(c.id)}>{c.name}</a>
              </td>
              <td>{c.status}</td>
              <td>{c.priority}</td>
              <td>{c.description}</td>
              <td>{c.employeeCount}</td>
              <td>{c.employeeCountSource}</td>
              <td>{c.revenueEstimate}</td>
              <td>{c.revenueEstimateSource}</td>
              <td>{c.location}</td>
              <td>{c.originalNameSource}</td>
              <td>
                {c.activity && c.activity.length
                  ? `${c.activity[0].note} — (${c.activity[0].username} @ ${c.activity[0].date})`
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
