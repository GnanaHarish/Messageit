"use client";

import { User } from "@prisma/client";

interface UserListProps{
 items : User[]
};

const UserList: React.FC<UserListProps> = ({
    items
}) => {
    return ( 
        <aside className="
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block                                                                                                      
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0
        ">

        </aside>

     );
}
 
export default UserList;