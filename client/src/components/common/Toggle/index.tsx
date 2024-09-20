import { useState } from 'react';
import styles from './index.module.css';

export default function Toggle() {
  const [isOn, setIsOn] = useState<boolean>(false);
  // TODO: 보안 문제 있음 다시 생각해볼것
  // 다른 userId를 넣으면 다른 사람 아이디로 로그인된다?!
  // userId를 넘겨주면 문제가 된다.⭐️
  // 암호화, 중요한 정보 안 넣기 등등 (아이디도 중요한 정보임)
  const isLoggedIn = localStorage.getItem('@isLoggedIn') === 'true';

  const toggleHandler = () => (isLoggedIn ? setIsOn(!isOn) : null);

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
