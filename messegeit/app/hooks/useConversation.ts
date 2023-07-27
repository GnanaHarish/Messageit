import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationIds = useMemo(() => {
    if (!params?.conversationIds) {
      return "";
    }
    return params?.conversationIds as string;
  }, [params?.conversationIds]);

  const isOpen = useMemo(() => !!conversationIds, [conversationIds]);

  return useMemo(() => ({
    isOpen,
    conversationIds
  }), [isOpen, conversationIds]);
};

export default useConversation;
