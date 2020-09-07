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
import { Link, useHistory } from 'react-router-dom'
import { useToast } from "../../hooks/toast";
import api from '../../services/api'

interface SignUpFormData{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido.'),
        password: Yup.string().min(6, 'No mínimo 6 caratéres.'),
      })

      await schema.validate(data, {abortEarly: false});

      await api.post('users', data);
      history.push('/');
      addToast({ 
        type: 'success',
        title: 'Uhuu! Cadastro realizado!',
        description: 'Agora você já pode realizar seu login'
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
        return
      }

      addToast({
        type: "error",
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao fazer o cadastro. Por favor, tente novamente.",
      });
    }
  }, [addToast, history])

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