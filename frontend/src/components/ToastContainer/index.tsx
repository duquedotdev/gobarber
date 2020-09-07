import React from 'react';
import { useTransition } from 'react-spring'
import Toast from './Toast'
import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast'

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({messages}) => {
  const messagesWithTransitions = useTransition(
      messages,
      message => message.id,
      {
        from: { transform: 'translate3d(120%,0,0)' },
        enter: { transform: 'translate3d(0%,0,0)' },
        leave: { transform: 'translate3d(120%,0,0)'  }
      }
    )

  return (
  <Container>
    {messagesWithTransitions.map(({item, key, props}) => (
      <Toast key={key} style={props} message={item}/>
    ))} 
  </Container>
  );
}

export default ToastContainer;