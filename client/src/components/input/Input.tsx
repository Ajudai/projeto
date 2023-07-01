import React, { HTMLInputTypeAttribute } from 'react';
import styles from './input.module.scss';

interface IInput {
  label: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  requestHelp?: boolean;
  type: HTMLInputTypeAttribute;
  value: string;
  name?: string;
}

const Input: React.FC<IInput> = ({ label, onChange, error, requestHelp, type, value, name }) => {
  const inputClasses = `${styles.inputComponentInput} ${requestHelp ? styles.requestHelp : ''}`;
  return (
    <div className={styles.inputComponentDiv}>
      <p className={error ? styles.inputComponentLabelError : styles.inputComponentLabel}>{label}</p>
      <input value={value} name={name} className={inputClasses} onChange={onChange} type={type} />
    </div>
  );
};

export default Input;
