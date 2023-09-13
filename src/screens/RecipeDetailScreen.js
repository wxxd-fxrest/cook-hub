import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Loading from "../helpers/Loading";
import {REACT_APP_API_KEY, REACT_BASE_URL} from '@env';

const RecipeDetailScreen = ({ route: {params} }) => {
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    const credentials = JSON.parse(REACT_APP_API_KEY);
    const apiKey = credentials.apiKey;
    console.log(apiKey)

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

    console.log(params)
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
                        <Title>{meal.strMeal}</Title>
                        <MealArea>{meal.strArea}</MealArea>
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


export default RecipeDetailScreen;
