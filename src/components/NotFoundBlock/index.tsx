import React from "react";

import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing's been found</h1>
      <p className={styles.description}>
        Unfortunately, a page doesn`t exist
      </p>
    </div>
  );
};

export default NotFoundBlock;
