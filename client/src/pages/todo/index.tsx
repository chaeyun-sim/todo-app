import Form from '../../components/common/Form';

export default function Todo() {
  return (
    <div>
      <div>todo</div>
      <Form
        onSubmit={inputs => console.log(inputs)}
        placeholders={['Name', 'Email', 'Password']}
      />
    </div>
  );
}
