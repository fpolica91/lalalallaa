import styled from 'styled-components';


export const Container = styled.div`
  background: #DFDFDF;
  display: flex;
  justify-content: center;
  padding: 5rem;
  margin: 5rem;
  border-radius: 10px;

`

export const CustomForm = styled.form`


div{
  display: flex;
  flex-direction: column;
  input{
    width: 310px !important;
    height: 45px;
    border: none;
    outline: none;
    border-radius: 20px;
    text-align: left;
    font-size: 15px;
    padding-left: 20px;
    
    
    ::placeholder{
      text-align: left;
      padding: 20px;
      font-size: 15px;
      opacity: 0.7;
    }
    & + input{
      margin-top: 20px;
    }
  }
  textarea{
    margin: 30px 0;
    border: none;
    border-radius: 25px;
    height: 80px;
    outline: 0;
    text-align: left;
    padding: 20px;
    width: 100% !important;
    max-width: 300px !important;
    ::placeholder{
      text-align: left;
      font-size: 15px;
      opacity: 0.7;
    }
  }
}
 
  label{
    font-size: 0.9rem;
    font-weight: bold;
    text-align: left;
    margin: 10px 0;
  }
  button{
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
    background: #1773eb;
    margin-top: 30px;
    padding: 10px;
    border-radius: 17px;
    border: none;
    width: 330px;
    span{
      text-align: center;
      flex: 0 0 120px;
      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 110%;
      color: #FFFFFF;
    }
  }
`

export const Input = styled.input`
  margin-top: 10px;
  padding: 5px;
  border-radius: 6px;
`