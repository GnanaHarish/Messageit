"use client";

import { FullConversationType } from "@/types";

interface ConversationListProps{
    initialItems: FullConversationType[]
}

const ConversationList: React.FC<ConversationListProps> = ({
    initialItems
}) => {
    return ( <div> 
        Hello
    </div> );
}
 
export default ConversationList;