import { useState } from "react";
import { useEffect } from "react";
import TableEntry from "./TableEntry";
const Table = ({ token }) => {
    const [fileDetails, setFileDetails] = useState()

    useEffect(() => {
        fetch('/api/files', {
            method: 'GET',
            headers: {
                "Token": token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFileDetails(data)
            })
    }, [])

    return (
        <div>
            {fileDetails &&
                <div className="flex justify-center items-center">
                    < div className="overflow-hidden h-32" >
                        <table className="table w-full">
                            <thead data-theme="autumn">
                                <tr>
                                    <th></th>
                                    <th>File Name</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody data-theme="autumn">
                                {fileDetails.map((file) => {
                                    return (
                                        <TableEntry key={file.id} id={file.id} fileName={file.filename} result={file.result} />
                                    )
                                })}

                            </tbody>
                        </table>
                    </div >
                </div >}</div>

    );
};
export default Table;
