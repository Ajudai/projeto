import React from 'react';
import styles from './input.module.scss';

interface IInput {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  error?: boolean;
}

const Input: React.FC<IInput> = ({ label, onChange, password, error }) => {
  return (
    <div className={styles.inputComponentDiv}>
      <p className={error ? styles.inputComponentLabelError : styles.inputComponentLabel}>{label}</p>
      <input
        className={error ? styles.inputComponentInputError : styles.inputComponentInput}
        onChange={onChange}
        type={password ? 'password' : 'text'}
        maxLength={40}
      />
    </div>
  );
};

export default Input;
