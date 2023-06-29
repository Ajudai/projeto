import React from 'react';
import styles from './input.module.scss';

interface IInput {
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  error?: boolean;
<<<<<<< HEAD
  requestHelp?: boolean;
}

const Input: React.FC<IInput> = ({ label, onChange, password, error, requestHelp }) => {
  const inputClasses = `${styles.inputComponentInput} ${requestHelp ? styles.requestHelp : ''}`;
  return (
    <div className={styles.inputComponentDiv}>
      <p className={error ? styles.inputComponentLabelError : styles.inputComponentLabel}>{label}</p>
      <input className={inputClasses} onChange={onChange} type={password ? 'password' : 'text'} />
=======
  value: string;
}

const Input: React.FC<IInput> = ({ label, onChange, password, error, value }) => {
  return (
    <div className={styles.inputComponentDiv}>
      <p className={error ? styles.inputComponentLabelError : styles.inputComponentLabel}>{label}</p>
      <input
        className={error ? styles.inputComponentInputError : styles.inputComponentInput}
        onChange={onChange}
        type={password ? 'password' : 'text'}
        maxLength={40}
        value={value}
      />
>>>>>>> aadb530a24d4ddb2b61007826e5b6d6049808f64
    </div>
  );
};

export default Input;
