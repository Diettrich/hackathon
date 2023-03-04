import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { PlayerProps } from "./types";

import styles from "./styles.module.scss";

const Card: React.FC<PlayerProps> = ({
  firstname,
  lastname,
  goal,
  salary,
  devise,
  pictureURl,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-testid="card-container"
    >
      <div className={styles.pictureContainer}>
        <Image
          data-testid="card-picture"
          className={styles.picture}
          src={pictureURl}
          alt={`${firstname} ${lastname}`}
          height={222}
          width={300}
        />
      </div>
      <div className={styles.nameContainer}>
        <h2
          className={styles.name}
          data-testid="card-name"
        >{`${firstname} ${lastname}`}</h2>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.goal} data-testid="card-goal">
          <span className={styles.label}>Goal: </span>
          <span className={styles.value}>{`${goal} ${devise}`}</span>
        </div>
        <div className={styles.salary} data-testid="card-salary">
          <span className={styles.label}>Salary: </span>
          <span className={styles.value}>{`${salary} ${devise}`}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
