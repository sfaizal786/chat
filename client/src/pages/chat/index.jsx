import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './components/chat-container';
import EmptyChatContainer from './components/empty-chat-container';
import ContactsContainer from './components/contacts-contsiner';

function Chat() {
  const { userInfo,  selectedChatType} = useAppStore();
  const navigate = useNavigate();
  useEffect(() =>{
    if(!userInfo.profileSetup){
      toast("Please Set your Profile To Continue");
      navigate("/Profile");
    }
  },[userInfo, navigate]);
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer />{
        selectedChatType === undefined ? <EmptyChatContainer />:<ChatContainer />
      }
    </div>
  )
}

export default Chat