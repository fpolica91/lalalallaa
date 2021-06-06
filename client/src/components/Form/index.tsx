import React, { useState } from 'react';
import { Container, CustomForm, Input } from './styles'

export interface FormProps {
  handleSubmit(name: string, event: Event, price: string): void;
}

const Form: React.FC<FormProps> = ({ handleSubmit }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  const submitWithin = (event) => {
    handleSubmit(name, event, price)
    setName("")
    setPrice("")
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

        <label htmlFor="price">
          Enter Price
        </label>
        <Input
          value={price}
          onChange={event => setPrice(event.target.value)}
        />
        <button type="submit" onClick={(event) => submitWithin(event)}>
          submit
        </button>
      </CustomForm>
    </Container>
  );
}

export default Form;
