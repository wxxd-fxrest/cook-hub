import React, { useEffect, useState } from "react";
import { Alert, LayoutAnimation } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import styled from "styled-components";
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from "../components/Categories";
import axios from 'axios';
import Recipes from "../components/Recipes";
import { MaterialIcons } from '@expo/vector-icons'; 
import { CachedImage } from "../helpers/image";

const HomeScreen = () => {
    const [marginRight, setMarginRight] = useState(hp(0));
    const [isModalVisible, setModalVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [meals, setMeals] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가


    useEffect(() => {
        if (searchResults.length === 0 && searchQuery !== "") {
            Alert.alert("레시피를 찾을 수 없습니다.", "다른 이름으로 검색해주세요.");
        }
    }, [searchResults]);

    const onVisible = async() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setModalVisible(true);
        if(searchQuery) {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
                console.log('response =>', response.data)
                if (response && response.data) {
                    setSearchResults(response.data.meals || []);
                    setSearchQuery("");
                    console.log(searchResults)
                } 
            } catch (err) {
                console.log('Error searching recipes:', err.message);
            }
        }
        if (isModalVisible === true) {
            setModalVisible(false);
            setMarginRight(hp(0)); // 모달이 열린 경우
        } 
    };

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);
    };

    const getCategories = async() => {
        try {
        const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
        // console.log('got categories: ',response.data);
            if(response && response.data){
                setCategories(response.data.categories);
            }
        } catch(err) {
            console.log('error: ',err.message);
        }
    };

    const getRecipes = async(category="Beef") => {
        try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        // console.log('got recipes: ',response.data);
            if(response && response.data){
                setMeals(response.data.meals);
            }
        } catch(err) {
            console.log('error: ',err.message);
        }
    };

    return (
        <Container>
            <Box>
                {searchResults.length > 0 ? <>
                    {!isModalVisible && 
                        <SearchBackBtn>
                            <SearchBackIcon name="keyboard-arrow-left"
                                size={hp(5)}
                                color="rgba(255, 0, 0, 0.5)"
                                onPress={() => setSearchResults([])}
                            />
                        </SearchBackBtn>} 
                        </> : <>
                        {!isModalVisible && <>
                            <Title> Cook Hub </Title>
                    </>}
                </>}
                <SearchContainer>
                    {isModalVisible && 
                        <SearchInput
                            placeholder='Search any recipe'
                            placeholderTextColor='white'
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)} // 검색어 업데이트
                        />
                    }
                    <IconWrapper onPress={onVisible} style={{ marginRight }}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="rgba(255, 0, 0, 0.7)" />
                    </IconWrapper>
                </SearchContainer>
            </Box>

            {searchResults.length > 0 ? (
                <SearchResultsContainer>
                    {searchResults.map((result, index) => (
                        <SearchResultItem key={index}>
                            <SearchDetailBtn onPress={() => navigateToRecipeDetail(result)}>
                                <CategoriesImgBox>
                                    <CachedImage uri={result.strMealThumb} 
                                        style={{ 
                                            width: hp(6),
                                            height: hp(6),
                                            borderRadius: (hp(6) / 2),
                                        }}/>
                                </CategoriesImgBox>
                                <SearchEmpty />
                                <SearchResultText>{result.strMeal.length > 25 ? `${result.strMeal.slice(0, 25)}...` : result.strMeal}</SearchResultText>
                            </SearchDetailBtn>
                        </SearchResultItem>
                    ))}
                </SearchResultsContainer>
            ) : (
                <BodyContainer>
                    <SelectCatagoris>
                        {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/> }
                    </SelectCatagoris>

                    <SelectRecipe 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 20}}
                    >
                        <Recipes meals={meals} categories={categories} />
                    </SelectRecipe>
                </BodyContainer>
            )}

        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    background-color: #ffbb4f;
    padding: 50px ${hp(3)}px;
`;

const Box = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.Text`
    color: rgba(255, 0, 0, 0.6);
    font-size: 30px;
    font-weight: bold;
`;

const SearchContainer = styled.View`
    margin: ${hp(2)}px 0px;
    flex-direction: row;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: ${hp(5)}px;
    padding: ${hp(0.5)}px;
`;

const SearchInput = styled.TextInput`
    flex: 1;
    font-size: ${hp(1.7)}px;
    margin: ${hp(1.5)}px 0px;
    padding-left: ${hp(2)}px;
    letter-spacing: ${hp(0.15)}px;
    color: gray;
`;

const IconWrapper = styled.TouchableOpacity`
    background-color: white;
    border-radius: 100px;
    padding: ${hp(1)}px;
`;

const BodyContainer = styled.View`
    flex: 1;
    width: 100%;
`;

const SelectCatagoris = styled.View``;

const SelectRecipe = styled.ScrollView``;

const SearchResultsContainer = styled.ScrollView`
    margin-top: ${hp(2)}px;
`;

const SearchResultItem = styled.View`
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: ${hp(1)}px;
    padding: ${hp(2)}px ${hp(2)}px;
    margin-bottom: ${hp(1)}px;
`;

const SearchDetailBtn = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`;

const SearchEmpty = styled.View`
    width: 30px;
`;

const SearchResultText = styled.Text`
    color: white;
    font-size: ${hp(2)}px;
    font-weight: bold;
`;

const SearchBackIcon = styled(MaterialIcons)``;

const CategoriesImgBox = styled.View`
    border-radius: 999px;
`;

const SearchBackBtn = styled.TouchableOpacity`
    margin-left: -10px;
`;


export default HomeScreen; 