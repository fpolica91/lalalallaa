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
        <div>
          <Input
            value={name}
            onChange={event => handleChange(event)}
            placeholder="NFT Name"
          />

          <Input
            value={price}
            onChange={event => setPrice(event.target.value)}
            placeholder="NFT Price"
          />
        </div>


        <div>
          <textarea placeholder="NFT Description (max: 300 characters)" name="description" id="description"></textarea>
        </div>
        <button type="submit" onClick={(event) => submitWithin(event)}>
          <span> Approve </span>
        </button>
      </CustomForm>
    </Container>
  );
}

export default Form;
