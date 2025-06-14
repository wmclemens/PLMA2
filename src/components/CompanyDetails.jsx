import React, { useState, useEffect } from "react";
import { getCompany, addActivity, updateCompany } from "../utils/storage";
import ActivityList from "./ActivityList";
import CompanyForm from "./CompanyForm";

export default function CompanyDetails({ companyId, goBack, user }) {
  const [company, setCompany] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setCompany(getCompany(companyId));
  }, [companyId]);

  function handleActivity(note) {
    addActivity(companyId, {
      note,
      username: user.username,
      date: new Date().toLocaleString()
    });
    setCompany(getCompany(companyId));
  }

  function handleSave(updated) {
    updateCompany(companyId, updated);
    setCompany(getCompany(companyId));
    setEdit(false);
  }

  if (!company) return <div>Company not found.</div>;

  return (
    <div>
      <button className="outline mb-1" onClick={goBack}>← Back to summary</button>
      <div className="flex-row">
        <div className="flex-1">
          {edit ? (
            <CompanyForm
              company={company}
              onSave={handleSave}
              onCancel={() => setEdit(false)}
            />
          ) : (
            <div>
              <h2>{company.name}</h2>
              <table>
                <tbody>
                  <tr><td><b>Status</b></td><td>{company.status}</td></tr>
                  <tr><td><b>Priority</b></td><td>{company.priority}</td></tr>
                  <tr><td><b>Description</b></td><td>{company.description}</td></tr>
                  <tr><td><b>Employee Count</b></td><td>{company.employeeCount}</td></tr>
                  <tr><td><b>Employee Count Source</b></td><td>{company.employeeCountSource}</td></tr>
                  <tr><td><b>Revenue Estimate</b></td><td>{company.revenueEstimate}</td></tr>
                  <tr><td><b>Revenue Estimate Source</b></td><td>{company.revenueEstimateSource}</td></tr>
                  <tr><td><b>Location</b></td><td>{company.location}</td></tr>
                  <tr><td><b>Original Name Source</b></td><td>{company.originalNameSource}</td></tr>
                </tbody>
              </table>
              <button className="mt-1" onClick={() => setEdit(true)}>
                Edit Company
              </button>
            </div>
          )}
        </div>
        <div className="flex-1">
          <ActivityList
            activity={company.activity}
            onAdd={handleActivity}
            username={user.username}
          />
        </div>
      </div>
    </div>
  );
}
