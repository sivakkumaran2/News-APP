import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function TabTwoScreen() {
  const navigation = useNavigation();

  const categories = [
    {
      title: 'Politics',
      imageUri:
        'https://img.freepik.com/free-photo/black-lives-matter-protesting-with-copy-space_23-2148913845.jpg?w=1380&t=st=1716460289~exp=1716460889~hmac=227c469c44e1917e5080873f4b3b1a98826268d7ddf67fb69b5a9018f2531b64',
      screen: 'PoliticsScreen',
    },
    {
      title: 'World News',
      imageUri:
        'https://img.freepik.com/free-vector/newspaper-template-realistic-poster_1284-20561.jpg?t=st=1716460335~exp=1716463935~hmac=c2463f69c0adc0d1a242c799b7b43351912e824e0f58bf28ade62180464d1450&w=996',
      screen: 'world',
    },
    {
      title: 'Business',
      imageUri:
        'https://img.freepik.com/free-vector/business-process-concept-with-sketch-personnel-finance-report-charts_98292-893.jpg?t=st=1716460387~exp=1716463987~hmac=cdd6628cb864f50a930aca7fbccc468512c5e78d62f12b9f698e11f264a2573e&w=740',
      screen: 'Business',
    },
    {
      title: 'Technology',
      imageUri:
        'https://img.freepik.com/premium-photo/computer-chip-with-green-sprout-using-generative-ai-technologies-organic-digital-background-was-generated_28914-5620.jpg?w=1060',
      screen: 'Technology',
    },
    {
      title: 'Science',
      imageUri:
        'https://www.freepik.com/free-vector/science-concept-with-microscope_7971534.htm#fromView=search&page=1&position=49&uuid=be798bb6-b8f0-46af-a1a7-0000c3dc96ad',
      screen: 'Science',
    },
    {
      title: 'Health',
      imageUri:
        'https://img.freepik.com/free-vector/tiny-cardiology-doctor-nurse-examining-heart-blood-pressure-prescribing-treatment-medical-cardiovascular-checkup-flat-vector-illustration-anatomy-hospital-heart-diseases-health-care-concept_74855-20963.jpg?t=st=1716460620~exp=1716464220~hmac=eddc9ef19b1a9bca6d9d6c81fc51019249a9fcdfa31ba1ad6cfe84c616b1e023&w=996',
      screen: 'Health',
    },
    {
      title: 'Entertainment',
      imageUri:
        'https://img.freepik.com/free-photo/people-s-emotions-cinema_155003-8907.jpg?t=st=1716460705~exp=1716464305~hmac=ea916cbefdf15157ece67f5ff1c8c4cf668190b9b194aebcd0408cf2d8d58c43&w=996',
      screen: 'Entertainment',
    },
    {
      title: 'Sports',
      imageUri:
        'https://img.freepik.com/free-vector/abstract-sport-background-flat-style_23-2148220193.jpg?t=st=1716460791~exp=1716464391~hmac=874fa65e1008f827c5d9ef16b6456b59ca0d92a8d4ec86ec496bbad6183dee87&w=996',
      screen: 'Sports',
    },
    ];

  const navigateToCategory = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
  
    <View style={styles.container}>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchable}
          onPress={() => navigateToCategory(category.screen)}
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>{category.title}</Text>
            </Card.Content>
            <Card.Cover source={{ uri: category.imageUri }} style={styles.cardCover} />
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
  },
  touchable: {
    width: '50%',
    padding: 8,
  },
  card: {
    margin: 8,
    borderRadius: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    paddingTop: 8,
  },
  cardCover: {
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
