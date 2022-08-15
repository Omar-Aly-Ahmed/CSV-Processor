import TableEntry from "./TableEntry";
const Table = () => {
    return (
        <div className="h-screen flex items-center overflow-hidden" >
            <div className="relative group w-full h-64 flex justify-center items-center">
                <div className="overflow-x-auto">
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
        </div>

    );
};
export default Table;
