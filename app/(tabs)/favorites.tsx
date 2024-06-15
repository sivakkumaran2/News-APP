import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking, Share } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const handleReadMore = (url) => {
    Linking.openURL(url);
  };

  const handleShare = async (title, url) => {
    try {
      const message = `Check out this article: ${title}\n${url}`;
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing article:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {favorites.length > 0 ? (
        favorites.map((article) => (
          <Card key={article.id} style={styles.card}>
            <Card.Title
              title={article.title}
              subtitle={new Date(article.publishedAt).toLocaleDateString()}
              left={(props) => <Avatar.Icon {...props} icon="newspaper" />}
              titleStyle={styles.cardTitle}
              subtitleStyle={styles.cardSubtitle}
            />
            <Card.Content>
              <Text variant="titleLarge" style={styles.title}>
                {article.title}
              </Text>
              <Text variant="bodyMedium" style={styles.content}>
                {article.description}
              </Text>
            </Card.Content>
            {article.urlToImage && (
              <Card.Cover source={{ uri: article.urlToImage }} style={styles.cover} />
            )}
            <Card.Actions>
              <Button onPress={() => handleReadMore(article.url)} style={styles.actionButton}>
                Read More
              </Button>
              <Button onPress={() => handleShare(article.title, article.url)} style={styles.actionButton}>
                Share
              </Button>
            </Card.Actions>
          </Card>
        ))
      ) : (
        <Text style={styles.noFavoritesText}>You have no favorite articles yet.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  title: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  content: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555555',
  },
  cover: {
    marginVertical: 16,
    borderRadius: 8,
  },
  actionButton: {
    color: '#003366',
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#777777',
  },
});

export default FavoritesScreen;
