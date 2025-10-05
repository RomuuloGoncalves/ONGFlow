import React, { useEffect } from 'react';
import styles from './Toast.module.css';

const IconeSucesso = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconeErro = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;

function Toast({ message, type, onClose }) {
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