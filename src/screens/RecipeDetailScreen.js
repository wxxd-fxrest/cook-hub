import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 
import Loading from '../helpers/Loading';
import * as WebBrowser from "expo-web-browser";
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const RecipeDetailScreen = ({ route: {params} }) => {
    const [isLiked, setIsLiked] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showIngredients, setShowIngredients] = useState(false); 

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients); 
    };

    useEffect(() => {
        getMealData(params.idMeal);
        loadLikeStatus();
    }, []);

    const loadLikeStatus = async () => {
        try {
            const likedStatus = await AsyncStorage.getItem(`likedStatus_${params.idMeal}`);
            if (likedStatus !== null) {
              setIsLiked(likedStatus === 'true');
            }
        } catch (error) {
            console.error('Error loading like status:', error);
        }
    };
    
    const toggleLike = async () => {
        try {
            const newLikeStatus = !isLiked;
            setIsLiked(newLikeStatus);
            await AsyncStorage.setItem(`likedStatus_${params.idMeal}`, newLikeStatus.toString());
        } catch (error) {
            console.error('Error toggling like status:', error);
        }
    };

    const getMealData = async(id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            // console.log('response=>', response.data)
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

    return (
        <Container>
            {loading ? (
                <Loading size="large" style={{ marginTop: hp(2) }} />
            ) : (
                <ScrollBox
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 20}}
                >
                    <HeaderContainer>
                        <BackBtn onPress={() => navigation.goBack()}>
                            <AntDesign name="left" size={28} color="rgba(255, 0, 0, 0.8)" />
                        </BackBtn>
                        <HeartBtn onPress={toggleLike}>
                            {isLiked === true ? <MaterialCommunityIcons name="cards-heart" size={28} color="rgba(255, 0, 0, 0.8)" /> : <MaterialCommunityIcons name="cards-heart-outline" size={28} color="rgba(255, 0, 0, 0.8)"/>}
                        </HeartBtn>
                    </HeaderContainer>
                    <RecipeImage source={{ uri: meal.strMealThumb }} />
                    <DetailContainer>
                        <TitleYoutube>
                            <View style={{ flexDirection: 'column' }}>
                                <Title>{meal.strMeal.length > 15 ? `${meal.strMeal.slice(0, 15)}...` : meal.strMeal}</Title>
                                <MealArea>{meal.strArea}</MealArea>
                            </View>


                            {meal.strYoutube && (
                                <RecipeVideoContainer onPress={goWebSite}>
                                    <AntDesign name="youtube" size={20} color="red"/>
                                </RecipeVideoContainer>
                            )}
                        </TitleYoutube>

                        <IngredientsContainer>
                            <IngredientsHeader>
                                <IngredientTitle>Ingredients</IngredientTitle>
                                <MoreBtn onPress={toggleIngredients}>
                                    {showIngredients ? <MaterialIcons name="keyboard-arrow-up" size={26} color="#c84934" /> : <MaterialIcons name="keyboard-arrow-down" size={26} color="#c84934" />}
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

                        <StrInstructionsContainer>
                            <Ionicons name="ios-document-text-outline" size={24} color="black" />
                            <StrInstructionsTitle> Instructions </StrInstructionsTitle>
                        </StrInstructionsContainer>
                        <StrInstructions>{meal.strInstructions}</StrInstructions>
                    </DetailContainer>
                </ScrollBox>
            )}
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: #f2c098;
`;

const ScrollBox = styled.ScrollView``;

const HeaderContainer = styled.View`
    position: absolute;
    top: ${hp(5.5)}px;
    padding: 0px ${hp(1.5)}px;
    left: 0;
    width: 100%;
    z-index: 1;
    flex-direction: row;
    justify-content: space-between;
`;

const BackBtn = styled.TouchableOpacity`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

const HeartBtn = styled.TouchableOpacity`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

const RecipeImage = styled.Image`
    width: 100%;
    height: ${hp(40)}px;
    border-bottom-left-radius: ${hp(4)}px;
    border-bottom-right-radius: ${hp(4)}px;
`;

const DetailContainer = styled.View`
    padding: 20px ${hp(3)}px;
`;

const TitleYoutube = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
`;

const Title = styled.Text`
    color: #c43621;
    font-size: ${hp(3.5)}px;
    font-weight: bold;
`;

const MealArea = styled.Text`
    font-size: ${hp(1.5)}px;
    font-weight: medium;
    color: #626160;
    margin-top: ${hp(0.4)}px;
`;

const IngredientsContainer = styled.View`
    margin-top: ${wp(4)}px;
    padding: 20px;
    background-color: rgba(245, 244, 241, 0.3);
    border-radius: 15px;
`;

const IngredientsHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const MoreBtn = styled.TouchableOpacity``;

const IngredientTitle = styled.Text`
    font-size: ${hp(2.3)}px;
    font-weight: bold;
    color: #c84934;
`;

const IngredientItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: ${hp(1)}px;
`;

const IngredientBullet = styled.View`
    height: ${hp(0.8)}px;
    width: ${hp(0.8)}px;
    background-color: #626160;
    border-radius: ${hp(0.6)}px;
    margin-right: ${wp(2)}px;
`;

const IngredientText = styled.Text`
    font-size: ${hp(1.7)}px;
    font-weight: medium;
    color: #626160;
    margin-left: 5px;
`;

const RecipeVideoContainer = styled.TouchableOpacity`
    /* margin-top: ${wp(4)}px; */
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 999px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: ${wp(2.5)}px;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.2);
`;

const StrInstructionsContainer = styled.View`
    margin-top: ${wp(4)}px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
`;

const StrInstructionsTitle = styled.Text`
    font-size: ${hp(1.8)}px;
`;
const StrInstructions = styled.Text``;

export default RecipeDetailScreen;
