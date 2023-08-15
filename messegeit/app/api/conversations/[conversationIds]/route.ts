import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams{
    conversationIds? : string
}


export async function DELETE(
    request: Request,
    {params} : {params : IParams}
){
    try {
        const {conversationIds} = params;
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id: conversationIds
            },
            include:{
                users:true
            }
        });

        if(!existingConversation){
            return new NextResponse("Invalid ID", {status: 400});
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationIds,
                userIds:{
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation);
        
    } catch (error: any) {
        console.log(error, "ERROR_IN_CONVERSATION_DELETE");
        return new NextResponse("Internal Error", {status: 500});
        
    }
}