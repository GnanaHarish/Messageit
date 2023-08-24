"use client";

import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[]
}



const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationIds } = useConversation();
    

    useEffect(() => {
        axios.post(`/api/conversations/${conversationIds}/seen`)
    }, [conversationIds]);

    useEffect(() => {
        pusherClient.subscribe(conversationIds);
        bottomRef?.current?.scrollIntoView();
        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationIds}/seen`)
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }
                return [...current, message];
            });
            bottomRef?.current?.scrollIntoView();
        }
        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if(currentMessage.id === newMessage.id){
                    return newMessage;
                }
                return currentMessage;
            }));
        }
        pusherClient.bind('message:new', messageHandler);
        pusherClient.bind('message:update', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationIds);
            pusherClient.unbind('message:new', messageHandler);
            pusherClient.unbind('message:update', updateMessageHandler);
        }
    }, [conversationIds])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
}

export default Body;