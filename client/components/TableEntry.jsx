const TableEntry = ({ id, fileName, result }) => {
    return (
        <tr className="hover">
            <th>{id}</th>
            <td>{fileName}</td>
            <td>{result}</td>
        </tr>
    );
};
export default TableEntry;
