import { useState } from 'react';
import styles from './index.module.css';

export default function Toggle() {
  const [isOn, setIsOn] = useState<boolean>(false);
  const ableToClick = false;

  const toggleHandler = () => (ableToClick ? setIsOn(!isOn) : null);

  return (
    <>
      <div
        className={styles.toggleContainer}
        onClick={toggleHandler}
      >
        <div className={`${styles.toggleSwitch} ${isOn ? styles.toggleSwitchChecked : ''}`} />
        <div className={`${styles.toggleCircle} ${isOn ? styles.toggleCircleChecked : ''}`} />
      </div>
    </>
  );
}
