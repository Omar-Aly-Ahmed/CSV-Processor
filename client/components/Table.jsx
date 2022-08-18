import { useState } from "react";
import { useEffect } from "react";
import TableEntry from "./TableEntry";
import axios from "axios";

const Table = ({ token, files }) => {

  let [fileDetails, setFileDetails] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      console.log(fileDetails.length, fileDetails.map(f => f.accuracy));
      if (fileDetails.length == 0 || fileDetails.map(f => f.accuracy).includes('-')){
        const data = await getData()
        setFileDetails(data)
      }
    }, 1000)
  }, []);

  const getData = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8001/api/files/",
      mode: "no-cors",
      headers: {
        "Token": token,
      },
    })
    const data = await res.data;
    return data;
  }

  return (
    <div>
      {fileDetails.length != 0 && (
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
                {
                  fileDetails &&
                  fileDetails.map((file, index) => {
                    if (index == 0) file.most_frequent_words = "Trained";
                    return (
                      <TableEntry
                        key={index + 1}
                        id={index + 1}
                        fileName={file.name}
                        accuracy={file.accuracy}
                        result={file.most_frequent_words}
                      />
                    )
                  })

                }
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;
