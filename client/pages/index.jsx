import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FileUploader from "../components/FileUploader";
import Table from "../components/Table";
import Button from "../components/Button";
import { useState } from "react";

export default function Home() {
  const [files, setFiles] = useState([
    {
      name: "myFile.csv",
    },
  ]);
  

  console.log(files);
  return (
    <div>
      <FileUploader files={files} setFiles={setFiles} />
      <Table />
      <Button text="Download latest result" />
    </div>
  );
}
