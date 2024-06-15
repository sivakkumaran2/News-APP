import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Linking, Share, RefreshControl, ActivityIndicator } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const NEWS_API_KEY = 'e4a6185b7ca64927b6fc35015024ef60';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${NEWS_API_KEY}`;

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [showLatestNews, setShowLatestNews] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews().then(() => setRefreshing(false));
  };

  const latestNews = articles.slice(0, 10);
  const trendingNews = articles.slice(10, 20);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Politics News</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode={showLatestNews ? "contained" : "outlined"}
          onPress={() => setShowLatestNews(true)}
          style={showLatestNews ? styles.activeButton : styles.button}
          labelStyle={showLatestNews ? styles.activeButtonLabel : styles.buttonLabel}
        >
          Latest News
        </Button>
        <Button
          mode={!showLatestNews ? "contained" : "outlined"}
          onPress={() => setShowLatestNews(false)}
          style={!showLatestNews ? styles.activeButton : styles.button}
          labelStyle={!showLatestNews ? styles.activeButtonLabel : styles.buttonLabel}
        >
          Trending News
        </Button>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loading} size="large" color="#003366" />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {showLatestNews ? (
            latestNews.map((article, index) => (
              <Card key={index} style={styles.card}>
                <Card.Title
                  title={article.title}
                  subtitle={new Date(article.publishedAt).toLocaleDateString()}
                  left={(props) => <Avatar.Icon {...props} icon="newspaper" style={styles.avatar} />}
                  titleStyle={styles.cardTitle}
                  subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                  <Text style={styles.cardContent}>{article.description}</Text>
                </Card.Content>
                {article.urlToImage && (
                  <Card.Cover source={{ uri: article.urlToImage }} style={styles.coverImage} />
                )}
                <Card.Actions>
                  <Button onPress={() => handleReadMore(article.url)} style={styles.actionButton}>Read More</Button>
                  <Button onPress={() => handleShare(article.title, article.url)} style={styles.actionButton}>Share</Button>
                </Card.Actions>
              </Card>
            ))
          ) : (
            trendingNews.map((article, index) => (
              <Card key={index} style={styles.card}>
                <Card.Title
                  title={article.title}
                  subtitle={new Date(article.publishedAt).toLocaleDateString()}
                  left={(props) => <Avatar.Icon {...props} icon="newspaper" style={styles.avatar} />}
                  titleStyle={styles.cardTitle}
                  subtitleStyle={styles.cardSubtitle}
                />
                <Card.Content>
                  <Text style={styles.cardContent}>{article.description}</Text>
                </Card.Content>
                {article.urlToImage && (
                  <Card.Cover source={{ uri: article.urlToImage }} style={styles.coverImage} />
                )}
                <Card.Actions>
                  <Button onPress={() => handleReadMore(article.url)} style={styles.actionButton}>Read More</Button>
                  <Button onPress={() => handleShare(article.title, article.url)} style={styles.actionButton}>Share</Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#003366',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffcc00',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#003366',
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,
    borderColor: '#ffcc00',
    borderWidth: 1,
  },
  activeButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 25,
    backgroundColor: '#ffcc00',
  },
  buttonLabel: {
    fontSize: 16,
    color: '#ffcc00',
  },
  activeButtonLabel: {
    fontSize: 16,
    color: '#003366',
  },
  card: {
    margin: 16,
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
    color: '#003366',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  cardContent: {
    marginBottom: 16,
    fontSize: 16,
    color: '#555555',
  },
  coverImage: {
    marginVertical: 12,
    height: 200,
    borderRadius: 8,
  },
  actionButton: {
    color: '#003366',
  },
  avatar: {
    backgroundColor: '#003366',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
