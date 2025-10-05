import React from 'react';

const ConnectionIcon = () => (
    <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: '#60a5fa', marginBottom: '20px' }}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);


const NotFoundPage = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f9ff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: 'center',
            padding: '20px',
            boxSizing: 'border-box',
        },
        title: {
            fontSize: 'clamp(6rem, 25vw, 10rem)',
            fontWeight: 'bold',
            color: '#1e3a8a',
            margin: '0',
            lineHeight: '1',
            textShadow: '4px 4px 0px #bfdbfe',
        },
        subtitle: {
            fontSize: 'clamp(1.5rem, 5vw, 2.25rem)',
            fontWeight: '500',
            color: '#1d4ed8',
            marginTop: '10px',
            marginBottom: '10px',
        },
        message: {
            fontSize: '1.1rem',
            color: '#2563eb',
            maxWidth: '500px',
            margin: '0 auto 30px auto',
        },
        button: {
            backgroundColor: '#2563eb', // Azul primário
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 28px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, transform 0.2s ease',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
        },
        buttonHover: {
            backgroundColor: '#1d4ed8',
            transform: 'translateY(-2px)',
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);
    const buttonStyle = {
        ...styles.button,
        ...(isHovered ? styles.buttonHover : null)
    };

    return (
        <div style={styles.container}>
            <ConnectionIcon />
            <h1 style={styles.title}>404</h1>
            <h2 style={styles.subtitle}>Página Não Encontrada</h2>
            <p style={styles.message}>
                Oops! Parece que você se perdeu no caminho da solidariedade. Mas não se preocupe, estamos aqui para te reconectar à causa certa.
            </p>
            <a
                href="/"
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Voltar para a Home
            </a>
        </div>
    );
};

export default NotFoundPage;