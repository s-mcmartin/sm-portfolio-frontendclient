import React from "react";

const Table = ({ tableContent, tableControls }) => {
  return (
    <div className="w-fit overflow-x-scroll p-4 bg-white flex justify-center">
      <table className={`overflow-x-scroll w-fit table-auto`}>
        <thead className="">
          <tr className={`bg-primary`}>
            {tableControls.map((control) => (
              <th
                key={control.title}
                className={`border-4 border-white`}
                scope={control.scope}
              >
                {control.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">{tableContent}</tbody>
      </table>
    </div>
  );
};

export default Table;
