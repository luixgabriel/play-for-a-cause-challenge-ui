export interface IMessage {
  id: string
  senderId: string
  content: string
  createdAt: string
}

const messages: IMessage[] = [
  {
    id: '1',
    senderId: '1',
    content: 'Opa, boa noite!',
    createdAt: '25/08/2053',
  },

  {
    id: '2',
    senderId: '2',
    content: 'Opa, boa noite!',
    createdAt: '25/08/2053',
  },
  {
    id: '3',
    senderId: '1',
    content: 'Opa, boa noite!',
    createdAt: '25/08/2053',
  },
  {
    id: '4',
    senderId: '1',
    content: 'Opa, boa noite!',
    createdAt: '25/08/2053',
  },
  {
    id: '5',
    senderId: '2',
    content: 'O Vasco não cai!',
    createdAt: '25/08/2053',
  },
  {
    id: '5',
    senderId: '2',
    content: 'O Vasco não cai!',
    createdAt: '25/08/2053',
  },
  // {
  //   id: '5',
  //   senderId: '1',
  //   content: 'O Vasco não cai!',
  //   createdAt: '25/08/2053',
  // },
  // {
  //   id: '5',
  //   senderId: '2',
  //   content: 'O Vasco não cai!',
  //   createdAt: '25/08/2053',
  // },
  // {
  //   id: '5',
  //   senderId: '2',
  //   content: 'O Vasco não cai!',
  //   createdAt: '25/08/2053',
  // },
  // {
  //   id: '5',
  //   senderId: '1',
  //   content: 'O Vasco não cai!',
  //   createdAt: '25/08/2053',
  // },
  // {
  //   id: '5',
  //   senderId: '2',
  //   content: 'O Vasco não cai!',
  //   createdAt: '25/08/2053',
  // },
]

export default messages
