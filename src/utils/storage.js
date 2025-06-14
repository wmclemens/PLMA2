import { parseCSV, toCSV } from "./csv";

// Default admin
const DEFAULT_USERS = [
  { username: "will@progresslearning.com", password: "admin", role: "admin" }
];

const COMPANY_FIELDS = [
  "id",
  "name",
  "status",
  "priority",
  "description",
  "employeeCount",
  "employeeCountSource",
  "revenueEstimate",
  "revenueEstimateSource",
  "location",
  "originalNameSource",
  "activity"
];

export function getUsers() {
  const u = localStorage.getItem("users");
  if (!u) {
    localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
    return [...DEFAULT_USERS];
  }
  return JSON.parse(u);
}

export function addUser(username, password, role) {
  const users = getUsers();
  if (!users.some(u => u.username === username)) {
    users.push({ username, password, role });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

export function removeUser(username) {
  let users = getUsers();
  users = users.filter(u => u.username !== username);
  localStorage.setItem("users", JSON.stringify(users));
}

export function login(username, password) {
  const u = getUsers().find(u => u.username === username && u.password === password);
  if (u) {
    localStorage.setItem("currentUser", JSON.stringify(u));
    return u;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("currentUser");
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
}

// Company data
export function getCompanies() {
  const c = localStorage.getItem("companies");
  if (!c) {
    localStorage.setItem("companies", "[]");
    return [];
  }
  return JSON.parse(c);
}

export function setCompanies(companies) {
  localStorage.setItem("companies", JSON.stringify(companies));
}

export function addCompany(company) {
  const companies = getCompanies();
  company.id = Math.random().toString(16).slice(2);
  companies.push(company);
  setCompanies(companies);
}

export function updateCompany(id, updated) {
  const companies = getCompanies().map(c =>
    c.id === id ? { ...c, ...updated } : c
  );
  setCompanies(companies);
}

export function getCompany(id) {
  return getCompanies().find(c => c.id === id);
}

export function removeCompany(id) {
  const companies = getCompanies().filter(c => c.id !== id);
  setCompanies(companies);
}

export function addActivity(companyId, activity) {
  const companies = getCompanies();
  const idx = companies.findIndex(c => c.id === companyId);
  if (idx !== -1) {
    if (!companies[idx].activity) companies[idx].activity = [];
    companies[idx].activity.unshift(activity);
    setCompanies(companies);
  }
}

// CSV export: only the most recent activity
export function exportCompaniesToCSV() {
  const companies = getCompanies();
  const fields = COMPANY_FIELDS.slice(0, -1).concat(["activityNote", "activityUser", "activityDate"]);
  const rows = companies.map(c => {
    const row = fields.map(f =>
      f === "activityNote"
        ? c.activity && c.activity.length ? c.activity[0].note : ""
        : f === "activityUser"
        ? c.activity && c.activity.length ? c.activity[0].username : ""
        : f === "activityDate"
        ? c.activity && c.activity.length ? c.activity[0].date : ""
        : c[f] ?? ""
    );
    return row;
  });
  return toCSV([fields, ...rows]);
}

// CSV import: expects correct columns (header names as per fields)
export function importCompaniesFromCSV(text) {
  const rows = parseCSV(text);
  const [header, ...data] = rows;
  const companies = data.map(row => {
    const obj = {};
    header.forEach((h, i) => {
      obj[h] = row[i];
    });
    // Basic clean up
    obj.id = Math.random().toString(16).slice(2);
    obj.employeeCount = Number(obj.employeeCount) || 0;
    obj.revenueEstimate = Number(obj.revenueEstimate) || 0;
    obj.activity = obj.activityNote
      ? [
          {
            note: obj.activityNote,
            username: obj.activityUser || "",
            date: obj.activityDate || ""
          }
        ]
      : [];
    delete obj.activityNote;
    delete obj.activityUser;
    delete obj.activityDate;
    return obj;
  });
  setCompanies(companies);
  return companies;
}
