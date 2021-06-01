import React, { useState } from 'react';
import { Container, CustomForm, Input } from './styles'

export interface FormProps {
  handleSubmit(name: string, event: any):void; 
}

const Form: React.FC<FormProps> = ({handleSubmit}) => {
  const [name, setName] = useState("")
  
  const handleChange = (event) =>{
    event.preventDefault()
    setName(event.target.value)
  }
  

  return (
    <Container>
      <CustomForm >
        <label htmlFor="name">
          Enter name
        </label>
        <Input
          value={name}
          onChange={event => handleChange(event)}
        />
        <button type="submit" onClick={(event) => handleSubmit(name, event)}>
          submit
        </button>
      </CustomForm>
    </Container>
  );
}

export default Form;
