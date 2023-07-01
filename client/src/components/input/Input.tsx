import React from 'react';
import styles from './input.module.scss';

interface IInput {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  error?: boolean;
  requestHelp?: boolean;
}

const Input: React.FC<IInput> = ({ label, onChange, password, error, requestHelp }) => {
  const inputClasses = `${styles.inputComponentInput} ${requestHelp ? styles.requestHelp : ''}`;
  return (
    <div className={styles.inputComponentDiv}>
      <p className={error ? styles.inputComponentLabelError : styles.inputComponentLabel}>{label}</p>
      <input className={inputClasses} onChange={onChange} type={password ? 'password' : 'text'} />
    </div>
  );
};

export default Input;
