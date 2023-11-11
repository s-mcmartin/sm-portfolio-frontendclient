const TableRow = ({ tableCells }) => {
  return (
    <tr className="grid grid-cols-12 w-full  text-light">
      {tableCells.map((cell, index) => (
        <td
          key={index}
          className={`col-span-${cell.colSpan} text-dark dark:text-light flex justify-center items-center`}
        >
          {cell.content}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
