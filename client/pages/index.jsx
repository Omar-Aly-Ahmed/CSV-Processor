import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Button from "../components/Button";
import { useState } from "react";
import { useEffect } from "react";
import { v4 } from "uuid";
import axios from "axios";
import FileDownload from "js-file-download";
import Cookie from 'js-cookie'

export default function Home() {

  const [files, setFiles] = useState([]);

  const [cookie] = useState(() => {
    let token = Cookie.get("Token")
    if (!token) {
      Cookie.set(
        "Token",
        v4(),
        {
          expires: 1,
          secure: true,
          sameSite: 'strict',
          path: '/'
        }
      )
      token = Cookie.get("Token")
    }
    return token
  });

  const download = async (cookie) => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:8001/api/files/results",
      mode: "no-cors",
      responseType: "blob",
      headers: {
        "Token": cookie,
      },
    })
    let data = await res.data
    FileDownload(data, "results.csv");
  }

  return (
     <div>
      <FileUploader token={cookie} files={files} setFiles={setFiles} />
      <Table token={cookie} />
      <Button clickHandler={()=>{download(cookie)}} text="Download latest results" />
    </div>
  );
}
