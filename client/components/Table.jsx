import { useState } from "react";
import { useEffect } from "react";
import TableEntry from "./TableEntry";
import cookieCutter from "cookie-cutter";
import axios from "axios";

const Table = ({ _ }) => {
  const [fileDetails, setFileDetails] = useState();
  const [getCookie, setCookie] = useState("");

  useEffect(() => {
    if (cookieCutter.get("Token")) {
      setCookie(cookieCutter.get("Token"));
    } else {
      setCookie(cookieCutter.set("Token", v4()));
    }
    setInterval(async () => {
      await getData()
    }, 5000)
  }, []);

  const getData = async () => {
    let cookie = getCookie
    if (cookie == undefined) {
      return
    };
    const res = await axios({
      method: "GET",
      url: "http://localhost:8001/api/files/",
      mode: "no-cors",
      headers: {
        "Token": cookie,
      },
    })
    const data = await res.data;
    if(data.length != 0){
      setFileDetails(data)
    }
    return data;
  }

  return (
    <div>
      <button onClick={getData} className="btn glass" >hello</button>
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
                {fileDetails &&
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
                  }
                  )

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
