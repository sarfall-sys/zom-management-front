import React from "react";
import Button from "./Button";
function Table({ columns, data, onEdit, onDelete }) {
  return (
    <>
      <section>
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key}>{item[col.key]}</td>
                  ))}
                  <td>
                    <Button
                      variant="success"
                      onClick={() => onEdit(item.id)}
                      className="mr-2"
                    >
                      Edit
                    </Button>

                    <Button variant="danger" onClick={() => onDelete(item.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Table;
