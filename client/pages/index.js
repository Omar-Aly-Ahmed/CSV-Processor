import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FileUploader from '../components/FileUploader'
import Table from '../components/Table'
import Button from '../components/Button'

export default function Home() {
  return (
    <div>
      <FileUploader />
      <Table />
      <Button text="Download latest result" />

    </div>

  )
}
