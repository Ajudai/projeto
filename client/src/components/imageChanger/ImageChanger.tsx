import React, { useState, useEffect } from 'react';
import styles from './imageChanger.module.scss';
const Componente = () => {
  const [background, setBackground] = useState('#000'); // Define a cor de fundo inicial

  useEffect(() => {
    const colors = ['#ff0000', '#00ff00', '#0000ff']; // Array de cores de fundo
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length;
      setBackground(colors[currentIndex]);
    }, 8000);

    return () => clearInterval(interval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div className={styles.imageChangerMain} style={{ backgroundColor: background }}>
      {/* Conteúdo do componente */}
    </div>
  );
};

export default Componente;
