import React, { useEffect } from 'react';
import styles from './Toast.module.css';
import IconeSucesso from '../common/IconeSucesso';
import IconeErro from '../common/IconeErro';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps): JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const toastTypeClass = type === 'success' ? styles.success : styles.error;
  const Icon = type === 'success' ? <IconeSucesso /> : <IconeErro />;

  return (
    <div className={`${styles.toast} ${toastTypeClass}`}>
      <div className={styles.iconContainer}>{Icon}</div>
      <p className={styles.message}>{message}</p>
      <button onClick={onClose} className={styles.closeButton}>&times;</button>
    </div>
  );
}

export default Toast;
