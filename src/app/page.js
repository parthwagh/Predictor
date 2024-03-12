"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [gen, setGen] = useState("");
  const increment = () => {
    console.log(name);
    axios.get(`https://api.agify.io?name=${name}`).then((res) => {
      console.log(res.data);
      setName1(res.data.name);
      setAge(res.data?.age);
    });
    axios.get(`https://api.genderize.io?name=${name}`).then((res) => {
      console.log(res.data);
      setGen(res.data?.gender);
    });
    axios.get(`https://api.nationalize.io?name=${name}`).then((res) => {
      console.log(res.data);
      setCountry(res.data?.country[0]?.country_id);
    });
  };
  useEffect(() => {
    increment();
  }, [name]);
  return (
    <main className={styles.main}>
      <div>
      <h1 className={styles.headerText}>Predictor</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.textInput}
      />
      <button onClick={() => increment} className={styles.predictBtn}>Predict</button>
      <h4 className={styles.infoText}>Name: {name1}</h4>
      <h4 className={styles.infoText}>Age: {age}</h4>
      <h4 className={styles.infoText}>Gender: {gen}</h4>
      <h4 className={styles.infoText}>Country: {country}</h4>
      </div>
    </main>
  );
}
