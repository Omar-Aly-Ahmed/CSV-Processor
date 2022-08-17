const TableEntry = ({ id, fileName, accuracy, result }) => {
    return (
        <tr className="hover">
            <th>{id}</th>
            <td>{fileName}</td>
            <td>{accuracy}</td>
            <td>{result}</td>
        </tr>
    );
};
export default TableEntry;
