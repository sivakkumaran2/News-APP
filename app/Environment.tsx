
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ScrollView,Linking, Share } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const NEWS_API_KEY = 'e4a6185b7ca64927b6fc35015024ef60';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(NEWS_API_URL);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };
  const handleReadMore = (url: string) => {
    Linking.openURL(url);
  };

  const handleShare = async (title: string, url: string) => {
    try {
      const message = `Check out ths article: ${title}\n${url}`;
      const result = await Share.share({
        message: message,
      });
    } catch (error) {
      console.error('Error sharing article:', error.message);
    }
  };

  return (
    
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Image
          source={require('@/assets/images/gradient-breaking-news-logo-design_23-2151180702.jpg')}
          style={styles.logo}
        />
      </View>
       
      }
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text variant="headlineSmall" style={styles.text}>EnvironmentNews</Text>
          <View style={styles.line} />
        </View>
       
      </View>
      <ScrollView>
        {articles.map((article, index) => (
          <Card key={index} style={styles.card}>
            <Card.Title 
              title={article.title} 
              subtitle={article.publishedAt} 
              left={(props) => <Avatar.Icon {...props} icon="newspaper" />} 
            />
            <Card.Content>
              <Text variant="titleLarge" style={styles.title}>{article.title}</Text>
              <Text variant="bodyMedium" style={styles.content}>{article.description}</Text>
            </Card.Content>
            {article.urlToImage && (
              <Card.Cover source={{ uri: article.urlToImage }} style={styles.cover} />
            )}
             <Card.Actions>
              <Button onPress={() => handleReadMore(article.url)}>Read More</Button>
              <Button onPress={() => handleShare(article.title, article.url)}>Share</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 278,
    width: 450,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'grey',
    textAlign: 'center',
  },
  line: {
    marginTop: 4,
    height: 2,
    width: '80%',
    backgroundColor: 'grey',
  },
  card: {
    margin: 16,
    borderRadius: 8,
  },
  title: {
    marginVertical: 8,
  },
  content: {
    marginBottom: 16,
  },
  cover: {
    marginVertical: 16,
  },
});
