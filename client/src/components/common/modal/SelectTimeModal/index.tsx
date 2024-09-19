import Modal, { ModalProps } from '../index';
import style from './index.module.css';
import { GrPowerReset } from 'react-icons/gr';
import { useEffect, useState } from 'react';

interface SelectTimeModalProps extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  onSetTime: (times: { start: string; end: string }) => void;
  data: { startTime: string; endTime: string };
}

export default function SelectTimeModal({
  isOpen,
  onClose,
  onSetTime,
  data,
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
      setTimes({ ...times, startMinute: '00' });
    }

    if (times.startHour && times.startMinute && (!times.endHour || !times.endMinute)) {
      setTimes({ ...times, endHour: times.startHour, endMinute: times.startMinute });
    }

    if (times.endHour && times.endMinute) {
      const start = new Date(2024, 2, 1, Number(times.startHour), Number(times.endHour));
      const end = new Date(2024, 2, 1, Number(times.endHour), Number(times.endMinute));

      if (
        Number(times.endHour) > 0 &&
        Number(times.endMinute) > 0 &&
        start.getTime() - end.getTime() > 60000
      ) {
        setErrorMessage('종료 시간은 시작 시간보다 늦어야 합니다.');
      } else {
        setErrorMessage('');
      }
    }
  }, [times]);

  useEffect(() => {
    if (data) {
      const [startH, startM] = data.startTime.split(':');
      const [endH, endM] = data.endTime.split(':');
      setTimes({ startHour: startH, startMinute: startM, endHour: endH, endMinute: endM });
    }
  }, [data]);

  const handleSubmit = () => {
    if (!times.startHour && !times.startMinute) {
      onSetTime({ start: '', end: '' });
      onClose();
    } else {
      setErrorMessage('올바른 시간을 설정해 주세요.');
    }

    if (times.startHour && times.startMinute && times.endHour && times.endMinute) {
      onSetTime({
        start: `${times.startHour}:${times.startMinute}`,
        end: `${times.endHour}:${times.endMinute}`,
      });
      onClose();
    }
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
