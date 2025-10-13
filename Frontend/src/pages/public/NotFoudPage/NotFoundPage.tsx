import React, { useState } from 'react';
import ConnectionIcon from '../../../components/common/ConnectionIcon';
import styles from './NotFoundPage.module.css';

const NotFoundPage = (): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.container}>
      <ConnectionIcon />
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Página Não Encontrada</h2>
      <p className={styles.message}>
        Oops! Parece que você se perdeu no caminho da solidariedade. Mas não se preocupe, estamos aqui para te reconectar à causa certa.
      </p>
      <a
        href="/"
        className={styles.button}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Voltar para a Home
      </a>
    </div>
  );
};

export default NotFoundPage;
