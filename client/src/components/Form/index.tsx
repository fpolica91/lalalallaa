import React, { useState } from 'react';
import { Container, CustomForm, Input } from './styles'

export interface FormProps {
  handleSubmit(name: string):void; 
}

const Form: React.FC<FormProps> = ({handleSubmit}) => {
  const [name, setName] = useState()
  
  const handleChange = (event) =>{
    setName(event.target.value)
  }
  

  return (
    <Container>
      <CustomForm onSubmit={() => handleSubmit(name)}>
        <label htmlFor="name">
          Enter name
        </label>
        <Input
          value={name}
          onChange={event => handleChange(event)}
        />
        <button type="submit">
          submit
        </button>
      </CustomForm>
    </Container>
  );
}

export default Form;
