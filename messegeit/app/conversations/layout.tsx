import ConversationList from "./components/ConversationList"
import Sidebar from "../components/sidebar/Sidebar"
import getConversations from "../actions/getConversations"

export default async function ConversationLayout({
    children }: {
        children: React.ReactNode
    }
) {
    const conversations = await getConversations();
    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
}