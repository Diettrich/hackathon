import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { PlayerProps } from "../components/Card/types";
import PaginationBar from "../components/Pagination";
import { PaginationBarProps } from "../components/Pagination/types";

import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Player } from "./api/db/data";
import Card from "../components/Card";
import { useRouter } from "next/router";

type HomeProps = {
  players: Player[];
  totalPages: number;
  currentPage: number;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Home: React.FC<HomeProps> = ({ players, totalPages, currentPage }) => {
  const router = useRouter();

  const [total, setTotal] = useState(totalPages);
  const [myPlayers, setPlayers] = useState(players || []);
  const [currentP, setCurrentP] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handlePageChange = async (page: number) => {
    setCurrentP(page);
    const response = await fetch(
      `http://localhost:3000/api/players/?search=${searchValue}&page=${page}`
    );
    const data = await response.json();
    setPlayers(data.players);
  };

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    const response = await fetch(`/api/players/?search=${value}&page=1`);
    const data = await response.json();
    setPlayers(data.players);
    setCurrentP(1);
    setTotal(data.totalPages);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Players</title>
        <meta name="description" content="List of players" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Players</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search players"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className={styles.players}>
        {myPlayers.map((player) => (
          <Card
            key={`${player.firstname}-${player.lastname}`}
            firstname={player.firstname}
            lastname={player.lastname}
            goal={player.goal}
            salary={player.salary}
            devise={player.devise}
            pictureURl={player.pictureURl}
          />
        ))}
      </div>
      <PaginationBar
        currentPage={currentP}
        totalPages={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
}) => {
  const search = query.search ? query.search.toString() : "";
  const page = query.page ? parseInt(query.page.toString()) : 1;
  const response = await fetch(
    `http://localhost:3000/api/players/?search=${search}&page=${page}`
  );
  const data = await response.json();
  return {
    props: {
      players: data.players,
      totalPages: data.totalPages,
      currentPage: data.currentPage,
    },
  };
};

export default Home;
