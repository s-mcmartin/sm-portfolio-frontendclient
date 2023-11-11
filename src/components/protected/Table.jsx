import React from "react";

const Table = ({ tableContent, tableControls }) => {
  return (
    <table className="mb-24 border-b-8 border-primary dark:border-primaryDark">
      <thead>
        <tr className="grid grid-cols-12 w-full bg-primary dark:bg-primaryDark text-xl">
          {tableControls.map((control) => (
            <th
              key={control.title}
              className={`col-span-${control.colSpan}`}
              scope={control.scope}
            >
              {control.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y-2">{tableContent}</tbody>
    </table>
  );
};

export default Table;
