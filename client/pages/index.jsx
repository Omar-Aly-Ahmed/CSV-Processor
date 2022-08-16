import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FileUploader from '../components/FileUploader'
import Table from '../components/Table'
import Button from '../components/Button'
import cookieCutter from 'cookie-cutter'
import { useState } from 'react'
import { useEffect } from 'react'
import { v4 } from "uuid";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [cookie, setCookie] = useState()

  useEffect(() => {
    if (cookieCutter.get('Token')) {
      setCookie(cookieCutter.get('Token'))
    }
    else {
      setCookie(cookieCutter.set('Token', v4()))
    }
  }, [])

  return (
    <div>
      <FileUploader token={cookie} files={files} setFiles={setFiles} />
      <Table token={cookie} />
      <Button text="Download latest result" />
    </div>
  );
}
