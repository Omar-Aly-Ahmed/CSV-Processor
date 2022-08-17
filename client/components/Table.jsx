import { useState } from "react";
import { useEffect } from "react";
import TableEntry from "./TableEntry";
const Table = ({ token }) => {
  const [fileDetails, setFileDetails] = useState();

    const getData = () => {
        fetch('http://localhost:8001/api/files/', {
            method: 'GET',
            headers: {
                "Token": token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFileDetails(data)
            })

    }

    useEffect(() => {

        getData();
        setInterval(getData, 1000);

    }, [])

  return (
    <div>
      {fileDetails?.length != 0 && (
        <div className="flex  justify-center mb-9 items-center ">
          <div className="overflow-hidden h-full w-fulll ">
            <table className="table w-full">
              <thead data-theme="autumn">
                <tr>
                  <th></th>
                  <th>File Name</th>
                  <th>Accuracy</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody data-theme="autumn">
                {fileDetails?.map((file, index) => {
                  if (index == 1) file.result = "Trained";
                  return (
                    <TableEntry
                      key={index}
                      id={index}
                      fileName={file.name}
                      accuracy={file.accuracy}
                      result={file.most_frequent_words}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;
