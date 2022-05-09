import styles from "../styles/Home.module.css";
import cheerio from "cheerio";
import axios from "axios";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { json } from "stream/consumers";
export interface Chapter{
  title: string;
  body: string;
}
export default function Home(props) {
  const [inputValue, setInputValue] = useState("");
  const [chapter, setChapter] = useState<Chapter>({title:"" ,body: ""})
  const scrape = (e) =>{
    e.preventDefault()
    return fetch("/api/hello",{
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({
        inputValue: inputValue,
      }),
    })
    .then((response) => response.json())
    .then((data) =>{
      setChapter({
        title: data.title,
        body: data.body
      })     
    })
  }
  // async function getStaticProps(input:string) {
  //   //3104
  //   const { data } = await axios.get(
  //     `https://boxnovel.com/novel/reincarnation-of-the-strongest-sword-god-boxnovel/chapter-${input}/`
  //   );
  //   const $ = cheerio.load(data);
  //   const title = $(".text-left h1").text();
  //   const body = $(".text-left p").text();
  //   const lastScraped = new Date().toISOString();
  //   console.log(title)
  //   return {
  //     props:{title, body, lastScraped},
  //     revalidate: 10,
  //   };
  // }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={scrape}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button >
                Get Chapter
          </button>
        </form>
        <div>{chapter.title}</div>
        <div>{chapter.body}</div>
        {/* <div>{props.title}</div>
        <div>{props.body}</div>
        <div>Last scraped: {props.lastScraped}</div> */}
      </main>
    </div>
  );
}
