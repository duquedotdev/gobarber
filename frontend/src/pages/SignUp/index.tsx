import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors'
import { Link } from 'react-router-dom'


const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido.'),
        password: Yup.string().min(6, 'No mínimo 6 caratéres.'),
      })

      await schema.validate(data, {abortEarly: false});

    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, [])

  return (
    <Container>
      <Background/>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Gobarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail"/>
            <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>
            <Button type="submit">Cadastrar</Button>
          </Form>
            <Link to="/"><FiArrowLeft/>Voltar para logon</Link>
          </AnimationContainer>
      </Content>
    </Container>
)};

export default SignUp