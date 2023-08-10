"use client";

import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";

interface BodyProps{
    initialMessages: FullMessageType[]
}



const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationIds} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationIds}/seen`)
    }, [conversationIds]);

    return ( 
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox 
                    isLast = {i === messages.length-1}
                    key={message.id}
                    data= {message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
     );
}
 
export default Body;