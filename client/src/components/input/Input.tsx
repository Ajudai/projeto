import React from 'react';
import styles from './input.module.scss';

interface IInput {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInput> = ({ label, onChange }) => {
  return (
    <div className={styles.inputComponentDiv}>
      <p className={styles.inputComponentLabel}>{label}</p>
      <input className={styles.inputComponentInput} onChange={onChange} type="text" maxLength={40} />
    </div>
  );
};

export default Input;
