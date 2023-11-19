const TableRow = ({ tableCells }) => {
  return (
    <tr className="">
      {tableCells.map((cell, index) => (
        <td key={index} className={`bg-light border-4 border-white px-4`}>
          {cell.content}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
