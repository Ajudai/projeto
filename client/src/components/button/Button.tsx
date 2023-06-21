import React from 'react';
import styles from './button.module.scss';

interface IButton {
  size?: 'small' | 'medium' | 'large' | 'ultraLarge';
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  rounded?: boolean;
}

const Button: React.FC<IButton> = ({ size = 'small', label, onClick, disabled = false, rounded = false }) => {
  const buttonClass = `${styles.buttonComponentEnabled} ${styles[size]} ${rounded && styles.buttonComponentRounded}`;
  return (
    <div className={`${styles.buttonComponentDiv} ${buttonClass}`}>
      <button type="button" className={styles.buttonComponentEnabled} onClick={onClick} disabled={disabled}>
        <span className={styles.buttonComponentLabel}>{label}</span>
      </button>
    </div>
  );
};

export default Button;
