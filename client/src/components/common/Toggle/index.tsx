import { useEffect, useState } from 'react';
import styles from './index.module.css';

interface ToggleProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (isOn: boolean) => void;
}

export default function Toggle({ checked = false, disabled = false, onChange }: ToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(checked);

  useEffect(() => {
    setIsOn(checked);
  }, [checked]);

  const toggleHandler = () => {
    if (!disabled) {
      const newState = !isOn;
      setIsOn(newState);
      onChange?.(newState);
    }
  };

  return (
    <div
      className={`${styles.toggleContainer} ${disabled ? styles.disabled : ''}`}
      onClick={toggleHandler}
    >
      <div className={`${styles.toggleSwitch} ${isOn ? styles.toggleSwitchChecked : ''}`} />
      <div className={`${styles.toggleCircle} ${isOn ? styles.toggleCircleChecked : ''}`} />
    </div>
  );
}
