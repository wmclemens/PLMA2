// Simple CSV parser and generator

export function parseCSV(text) {
  // Handles basic CSV (no multiline or escaped quotes)
  return text
    .trim()
    .split("\n")
    .map(line => line.split(",").map(cell => cell.trim()));
}

export function toCSV(rows) {
  return rows
    .map(row =>
      row
        .map(cell =>
          typeof cell === "string" && (cell.includes(",") || cell.includes("\n"))
            ? `"${cell.replace(/"/g, '""')}"`
            : cell
        )
        .join(",")
    )
    .join("\n");
}
