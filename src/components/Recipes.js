import { Pressable } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import Loading from '../helpers/Loading';

const Recipes = ({categories, meals}) => {
    const navigation = useNavigation();

    return (
        <Container>
            <Title>Recipes</Title>
            {categories.length === 0 || meals.length === 0 ? (
                <LoadingContainer>
                    <Loading size="large" />
                </LoadingContainer>
            ) : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, i }) => (
                        <RecipeCard item={item} index={i} navigation={navigation} />
                    )}
                    onEndReachedThreshold={0.1}
                />
            )}
        </Container>
    );
};
    
const Container = styled.View`
    margin: 0 4px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #C43621;
    margin-bottom: 24px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoadingContainer = styled.View`
    margin-top: ${hp(20)}px;
`;

export default Recipes;

const RecipeCard = ({ item, index, navigation }) => {
    const isEven = index % 2 === 0;
  
    return (
        <AnimatedContainer entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable style={{
                    width: '100%',
                    paddingLeft: isEven ? 0 : 8,
                    paddingRight: isEven ? 8 : 0,
                }}
                onPress={() => navigation.navigate('RecipeDetail', { ...item })}>
            <RecipeImage source={{ uri: item.strMealThumb }}
                isEven={isEven}
                resizeMode="cover"/>
                <RecipeTitle>{item.strMeal.length > 20 ? `${item.strMeal.slice(0, 20)}...` : item.strMeal}</RecipeTitle>
            </Pressable>
        </AnimatedContainer>
    );
};
  
const AnimatedContainer = styled(Animated.View)``;

const RecipeImage = styled.Image`
    width: 100%;
    height: ${({ isEven }) => (isEven ? '150px' : '210px')};
    border-radius: 35px;
    background-color: rgba(0, 0, 0, 0.05);
`;

const RecipeTitle = styled.Text`
    font-size: 12px;
    font-weight: bold;
    color: #626160;
    margin-left: 8px;
    padding-top: 5px;
    padding-bottom: 13px;
`;
