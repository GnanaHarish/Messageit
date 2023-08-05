interface IParams{
    conversationId: string
}

const ConversationId = async ({params} : {params: IParams}) => {
    return (
        <div>
            Conversation Ids.
        </div>
    )
}

export default ConversationId;