import React from "react";

function Filter({ onSort, activeSort, order }) {
  const columns = [
    { key: "name", label: "Name" },
/*     { key: "description", label: "Description" },
 */  ];

  return (
    <div className="flex items-center gap-2">
      <span>Sort by:</span>

      {columns.map((col) => (
        <button
          key={col.key}
          onClick={() => onSort(col.key)}
          className="px-3 py-1 border rounded"
        >
          {col.label}
          {activeSort === col.key && (
            <span className="ml-1">{order === "asc" ? "↑" : "↓"}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default Filter;
