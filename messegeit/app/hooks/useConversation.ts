import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationIds = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }
    return params?.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationIds, [conversationIds]);

  return useMemo(() => ({
    isOpen,
    conversationIds
  }), [isOpen, conversationIds]);
};

export default useConversation;