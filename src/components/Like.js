import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../helpers/Loading";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";

const Like = ({likeID}) => {
    const [loading, setLoading] = useState(true);
    const [meal, setMeal] = useState([]);

    useEffect(() => {
        getMealData();
    }, []); 

    const getMealData = async() => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${likeID}`);
            // console.log(likeID, response.data)
            if (response && response.data) {
                setMeal(response.data.meals);
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    };
    const navigation = useNavigation();

    return (
        <Container>
            {loading ? (
                <Loading size="large" style={{ marginTop: hp(2) }} />
            ) : (
                <>
                    {meal.map((m, i) => (
                        <LikeContainer key={i} onPress={() => navigation.navigate('RecipeDetail', { ...m })}>
                            <RecipeImage source={{ uri: m.strMealThumb }} />
                            <Empty />
                            <Title> {m.strMeal} </Title>
                        </LikeContainer>
                    ))}
                </>
            )}
        </Container>
    )
};

const Container = styled.View`
    padding: 0px 5px;
`;

const LikeContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 3px 2px 2px rgba(0, 0, 0, 0.3);
    border-radius: ${hp(1)}px;
    padding: ${hp(2)}px ${hp(2)}px;
    margin-bottom: ${hp(1)}px;
    align-items: center;
`;

const RecipeImage = styled.Image`
    width: ${hp(8)}px;
    height: ${hp(8)}px;
    border-radius: 20px;
`;

const Empty = styled.View`
    width: ${hp(3)}px;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: grey;
`;

export default Like;