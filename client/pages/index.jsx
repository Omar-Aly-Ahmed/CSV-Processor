import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Button from "../components/Button";
import cookieCutter from "cookie-cutter";
import { useState } from "react";
import { useEffect } from "react";
import { v4 } from "uuid";
import axios from "axios";
import FileDownload from "js-file-download";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [cookie, setCookie] = useState();

  useEffect(() => {
    if (cookieCutter.get("Token")) {
      setCookie(cookieCutter.get("Token"));
    } else {
      setCookie(cookieCutter.set("Token", v4()));
    }
  }, []);

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
  //   fetch("http://localhost:8001/api/files/results", {
  //     method: "GET",
  //     responseType: "blob",
  //     mode: "no-cors",
  //     header: {
  //       "Token": cookie,
  //     },
  //   }).then((res) => {
  //     FileDownload(res.data, "results.csv");
  //   });
  // };
  
  return (
     <div>
      <FileUploader token={cookie} files={files} setFiles={setFiles} />
      <Table token={cookie} />
      <Button clickHandler={()=>{download(cookie)}} text="Download latest results" />
    </div>
  );
}
