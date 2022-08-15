import TableEntry from "./TableEntry";
const Table = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="overflow-hidden h-32">
                <table className="table w-full">
                    <thead data-theme="autumn">
                        <tr>
                            <th></th>
                            <th>File Name</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody data-theme="autumn">
                        <TableEntry id="1" fileName="test" result="Accuracy: 45%" />
                    </tbody>
                </table>
            </div>
        </div>

    );
};
export default Table;
