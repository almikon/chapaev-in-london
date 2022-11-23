import { action, makeObservable, observable } from 'mobx'
import { Chat, Message, User } from '../types/forumType'
import { mockForum } from '../assets/mockData/mockForum'

class ForumStore {
  chats: Chat[] = []
  messages: Message[] = []
  activeChat: number | null = null
  isLoading = false

  constructor() {
    makeObservable(
      this, {
        chats: observable,
        messages: observable,
        activeChat: observable,
        isLoading: observable,
        changeActiveChat: action,
        getChats: action,
        getMessages: action,
        createChat: action
      },
      { deep: true }
    )
  }

  getChats() {
    this.isLoading = true

    mockForum.getChats()
      .then(res => {

        this.chats = [...res]
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  }

  getMessages(chatId: number) {
    this.isLoading = true

    mockForum.getMessagesByChatId(chatId)
      .then(res => {
        this.messages = [...res]
        this.isLoading = false
      })
      .catch(() => {
        this.isLoading = false
      })
  }

  changeActiveChat(id: null | number) {
    this.activeChat = id
  }

  createChat(title: string, message: string) {
    const chatId = this.chats.length
    const time = (new Date()).toDateString()

    const newMessage: Message = {
      id: this.messages.length,
      chat_id: chatId,
      type: 'type',
      time,
      user_id: 2,
      content: message
    }

    const newChat: Chat = {
      id: this.chats.length,
      create_ad: time,
      creator: {} as User,
      title,
      last_message: newMessage,
      unread_count: 0
    }


    mockForum.addChat(newChat)
      .then(() => {
        mockForum.addMessage(newMessage)
          .then(() => {
            mockForum.getChats()
              .then(res => this.chats = [...res]
              )
          })
      })
  }
}

export const forumStore = observable(new ForumStore())
