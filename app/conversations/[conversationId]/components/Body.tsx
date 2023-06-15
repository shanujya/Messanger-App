'use client';
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const[messages,setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationId} = useConversation();
    useEffect(()=>{
       axios.post(`/api/conversation/${conversationId}/seen`)
    },[conversationId]);
    return (
        <div>
            {messages.map((message,i)=>(
                <MessageBox
                    isLast = {i === messages.length-1}
                    key = {message.id}
                    data = {message}
                />
            ))}
           <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body;