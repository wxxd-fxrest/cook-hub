import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Loading from '../helpers/Loading';
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from '@expo/vector-icons'; 

const RecipeDetailScreen = ({ route: {params} }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showIngredients, setShowIngredients] = useState(false); 

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients); 
    };

    useEffect(() => {
        getMealData(params.idMeal);
    }, []);

    const getMealData = async(id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            console.log('response=>', response.data)
            if (response && response.data) {
                setMeal(response.data.meals[0]);
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }
        return indexes;
    };
    
    const goWebSite = async() => {
        const WebURL = `${meal.strYoutube}`; 
        await WebBrowser.openBrowserAsync(WebURL)
    };

    // console.log(params)
    return (
        <Container>
            {loading ? (
                <Loading size="large" style={{ marginTop: hp(2) }} />
            ) : (
                <ScrollBox
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                >
                    <RecipeImage source={{ uri: meal.strMealThumb }} />
                    <DetailContainer>
                        <Title>{meal.strMeal.length > 20 ? `${meal.strMeal.slice(0, 20)}...` : meal.strMeal}</Title>
                        <MealArea>{meal.strArea}</MealArea>


                        {meal.strYoutube && (
                            <RecipeVideoContainer>
                                <YouTubeBtn onPress={goWebSite}>
                                    <AntDesign name="youtube" size={24} color="red"/>
                                    <Empty />
                                    <RecipeVideoTitle>Recipe Video</RecipeVideoTitle>
                                </YouTubeBtn>
                            </RecipeVideoContainer>
                        )}

                        <IngredientsContainer>
                            <IngredientsHeader>
                                <IngredientTitle>Ingredients</IngredientTitle>
                                <MoreBtn onPress={toggleIngredients}>
                                    {showIngredients ? <MaterialIcons name="keyboard-arrow-up" size={24} color="black" /> : <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />}
                                </MoreBtn>
                            </IngredientsHeader>
                            {ingredientsIndexes(meal).map((i) => (
                                showIngredients ? (
                                <IngredientItem key={i}>
                                    <IngredientBullet />
                                    <IngredientText>{meal[`strMeasure${i}`]}</IngredientText>
                                    <IngredientText>{meal[`strIngredient${i}`]}</IngredientText>
                                </IngredientItem>
                                ) : null
                            ))}
                        </IngredientsContainer>

                        <StrInstructionsTitle> Instructions </StrInstructionsTitle>
                        <StrInstructions>{meal.strInstructions}</StrInstructions>
                    </DetailContainer>
                </ScrollBox>
            )}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #ffbb4f;
`;

const ScrollBox = styled.ScrollView``;

const RecipeImage = styled.Image`
    width: 100%;
    height: ${hp(40)}px;
    border-bottom-left-radius: ${hp(4)}px;
    border-bottom-right-radius: ${hp(4)}px;
`;

const DetailContainer = styled.View`
    padding: 20px ${hp(3)}px;
`;

const Title = styled.Text`
    color: rgba(255, 0, 0, 0.6);
    font-size: ${hp(3.5)}px;
    font-weight: bold;
`;

const MealArea = styled.Text`
    font-size: ${hp(2)}px;
    font-weight: medium;
    color: #666;
    margin-top: ${hp(0.4)}px;
`;

const IngredientsContainer = styled.View`
  margin-top: ${wp(4)}px;
`;

const IngredientsHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const MoreBtn = styled.TouchableOpacity``;

const IngredientTitle = styled.Text`
  font-size: ${hp(2.5)}px;
  font-weight: bold;
  color: #333;
`;

const IngredientItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp(0.8)}px;
`;

const IngredientBullet = styled.View`
  height: ${hp(1.2)}px;
  width: ${hp(1.2)}px;
  background-color: #fbbf24;
  border-radius: ${hp(0.6)}px;
  margin-right: ${wp(2)}px;
`;

const IngredientText = styled.Text`
  font-size: ${hp(2)}px;
  font-weight: medium;
  color: #666;
`;

const RecipeVideoContainer = styled.View`
    margin-top: ${wp(4)}px;
`;

const RecipeVideoTitle = styled.Text`
    font-size: ${hp(1.5)}px;
    font-weight: bold;
    color: #333;
`;

const Empty = styled.View`
    width: 20px;
`;

const YouTubeBtn = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
`;

const StrInstructionsTitle = styled.Text`
    margin-top: ${wp(4)}px;
`;
const StrInstructions = styled.Text``;

export default RecipeDetailScreen;
