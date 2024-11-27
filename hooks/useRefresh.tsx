import { useState, useCallback } from "react";

interface UseRefreshProps {
  onRefresh: () => Promise<void>;
}

// This hook is used to handle the refreshing state and trigger a refresh action.

const useRefresh = ({ onRefresh }: UseRefreshProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return { refreshing, handleRefresh };
};

export default useRefresh;
