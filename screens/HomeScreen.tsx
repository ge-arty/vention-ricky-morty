// This component is responsible for displaying a list of characters from the "Rick and Morty" API and handling both data fetching and user interactions (like scrolling and refreshing).

import React, { useState, useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, RefreshControl, Text } from "react-native";
import useFetch from "../hooks/useFetch";
import Character from "../components/Character";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import useRefresh from "../hooks/useRefresh";

const HomeScreen = () => {
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const { characters, setCharacters, resendRequest, error, loading } = useFetch(
    page,
    setIsLastPage
  );

  const { refreshing, handleRefresh } = useRefresh({
    onRefresh: async () => {
      if (!refreshing) {
        setCharacters([]);
        setIsLastPage(false);
        page === 1 ? resendRequest() : setPage(1);
      }
    },
  });

  const nextPage = useCallback(() => {
    if (!loading && !isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, isLastPage]);

  const renderFooter = () => {
    if (isLastPage) {
      return (
        <Text style={styles.noMoreText}>There are no more characters left</Text>
      );
    }

    if (loading) {
      return <Spinner size="small" message="Loading more characters..." />;
    }

    return null;
  };

  if (loading && page === 1) {
    return <Spinner message="Loading characters..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Character image={item.image} name={item.name} />
        )}
        onEndReached={nextPage}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noMoreText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "gray",
  },
});

export default HomeScreen;
