import Input from '../common/Input';

interface AuthFormProps<T extends Record<string, string>> {
  inputs: T;
  errorMessage: T;
  validFunc: (field: keyof T, value: string) => void;
}

export default function AuthForm<T extends Record<string, string>>({
  inputs,
  validFunc,
  errorMessage,
}: AuthFormProps<T>) {
  const changeHandler = (field: keyof T, value: string) => {
    validFunc(field, value);
  };

  return (
    <div
      style={{ marginTop: '60px' }}
      aria-label='입력 양식'
    >
      {(Object.keys(inputs) as Array<keyof T>).map(item => {
        const placeholder = item.toString()[0].toUpperCase() + item.toString().slice(1);
        return (
          <div key={item.toString()}>
            <Input
              type={item.toString().toLowerCase()}
              value={inputs[item]}
              placeholder={placeholder}
              onSetValue={value => changeHandler(item, value)}
              required
              aria-label={`${String(item)} 입력`}
            />
            <p
              style={{
                margin: '5px 0 25px',
                fontSize: '13px',
                color: errorMessage[item] ? 'crimson' : '',
              }}
            >
              {errorMessage[item]}
            </p>
          </div>
        );
      })}
    </div>
  );
}
