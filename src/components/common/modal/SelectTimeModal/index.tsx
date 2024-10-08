import Modal, { ModalProps } from '../index';
import style from './index.module.css';
import { lazy, useEffect, useState } from 'react';
import TITLES from '../../../../constants/title';
import { getDates } from '../../../../utils/dateUtils';

const GrPowerReset = lazy(() =>
  import('react-icons/gr').then(mod => ({ default: mod.GrPowerReset }))
);

interface SelectTimeModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSetTime: (times: { start: string; end: string }) => void;
  data: { startTime: string; endTime: string };
  current: number;
}

export default function SelectTimeModal({
  isOpen,
  onClose,
  onSetTime,
  data,
  current,
}: SelectTimeModalProps) {
  const [times, setTimes] = useState({
    startHour: '',
    startMinute: '',
    endHour: '',
    endMinute: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleTimeChange = (timeType: string, value: string) => {
    setTimes(prevTimes => ({ ...prevTimes, [timeType]: value }));
  };

  useEffect(() => {
    if (times.startHour && !times.startMinute) {
      setTimes(prev => ({ ...prev, startMinute: '00' }));
    }

    if (times.startHour && times.startMinute && (!times.endHour || !times.endMinute)) {
      setTimes(prev => ({ ...prev, endHour: times.startHour, endMinute: times.startMinute }));
    }

    if (TITLES[current].toLowerCase() === 'today') {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      if (times.startHour !== '' && times.startMinute !== '') {
        if (
          Number(times.startHour) < currentHour ||
          (Number(times.startHour) === currentHour && Number(times.startMinute) <= currentMinute)
        ) {
          setErrorMessage('현재 시간 이후로만 선택할 수 있습니다.');
        } else {
          setErrorMessage('');
        }
      }
    }

    if (times.startHour && times.startMinute && times.endHour && times.endMinute) {
      const start = new Date(
        2024,
        0,
        1,
        parseInt(times.startHour, 10),
        parseInt(times.startMinute, 10)
      );
      const end = new Date(2024, 0, 1, parseInt(times.endHour, 10), parseInt(times.endMinute, 10));

      if (end < start) {
        setErrorMessage('종료 시간은 시작 시간보다 늦어야 합니다.');
      } else {
        setErrorMessage('');
      }
    }
  }, [times, current]);

  useEffect(() => {
    if (data?.startTime && typeof data.startTime === 'string') {
      const [startHour, startMinute] = data.startTime.split(' ')[1].split(':');
      setTimes(prev => ({ ...prev, startHour, startMinute }));
    }
    if (data?.endTime && typeof data.endTime === 'string') {
      const [endHour, endMinute] = data.endTime.split(' ')[1].split(':');
      setTimes(prev => ({ ...prev, endHour, endMinute }));
    }
  }, [data]);

  const handleSubmit = () => {
    if (errorMessage) return;

    const startTime = `${times.startHour}:${times.startMinute}`;
    const endTime = `${times.endHour}:${times.endMinute}`;
    const dates = getDates();
    const dateKey = TITLES[current].toLowerCase() as keyof typeof dates;

    const date = dates[dateKey];

    if (!date) {
      console.error(`No date found for key: ${dateKey}`);
      return;
    }

    onSetTime({
      start: `${date.slice(0, 10)} ${startTime}`,
      end: `${date.slice(0, 10)} ${endTime}`,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      height={'140px'}
      modalTitle='시간 선택'
    >
      <div>
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 5px',
              height: '40px',
              marginTop: '13px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  className={style.select}
                  value={times.startHour}
                  onChange={e => handleTimeChange('startHour', e.target.value)}
                >
                  <option
                    value=''
                    disabled
                  >
                    ---
                  </option>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option
                      key={i}
                      value={`${i}`.padStart(2, '0')}
                    >
                      {`${i}`.padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className={style.time_separator}>:</span>
                <select
                  className={style.select}
                  value={times.startMinute}
                  onChange={e => handleTimeChange('startMinute', e.target.value)}
                >
                  <option
                    value=''
                    disabled
                  >
                    ---
                  </option>
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i}>{`${i}`.padStart(2, '0')}</option>
                  ))}
                </select>
              </div>
            </div>
            <strong>~</strong>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <select
                className={style.select}
                value={times.endHour}
                onChange={e => handleTimeChange('endHour', e.target.value)}
              >
                <option
                  value=''
                  disabled
                >
                  ---
                </option>
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i}>{`${i}`.padStart(2, '0')}</option>
                ))}
              </select>
              <span className={style.time_separator}>:</span>
              <select
                className={style.select}
                value={times.endMinute}
                onChange={e => handleTimeChange('endMinute', e.target.value)}
              >
                <option
                  value=''
                  disabled
                >
                  ---
                </option>
                {Array.from({ length: 60 }).map((_, i) => (
                  <option key={i}>{`${i}`.padStart(2, '0')}</option>
                ))}
              </select>
            </div>
          </div>
          <p
            style={{
              height: '14.5px',
              fontSize: '12px',
              textAlign: 'center',
              marginTop: '7px',
              color: 'crimson',
            }}
          >
            {errorMessage || ' '}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            className={style.reset_btn}
            onClick={() => setTimes({ startHour: '', startMinute: '', endHour: '', endMinute: '' })}
          >
            <GrPowerReset />
            <span style={{ marginTop: '2px' }}>시간 초기화</span>
          </button>
          <button
            style={{
              width: '60px',
              height: '23px',
              fontSize: '12px',
              backgroundColor: 'transparent',
              border: '1.3px solid #bcbcbc',
              borderRadius: '6px',
            }}
            onClick={handleSubmit}
          >
            설정
          </button>
        </div>
      </div>
    </Modal>
  );
}
