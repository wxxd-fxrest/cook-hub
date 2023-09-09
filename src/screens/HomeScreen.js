import React, { useState } from "react";
import { Alert, Dimensions, LayoutAnimation } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import styled from "styled-components";
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from "../components/Categories";

const HomeScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [marginRight, setMarginRight] = useState(hp(0)); // 초기값 설정

    const onVisible = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setModalVisible(!isModalVisible);

        // 조건에 따라 marginRight 업데이트
        if (isModalVisible) {
            setMarginRight(hp(0)); // 모달이 열린 경우
        } else {
            setMarginRight(hp(0.5)); // 모달이 닫힌 경우
        }
    };


    return (
        <Container>
            <Box>
                {!isModalVisible && <Title> Cook Hub </Title>}
                <SearchContainer>
                    {isModalVisible && 
                        <SearchInput
                            placeholder='Search any recipe'
                            placeholderTextColor='white'/>
                    }
                    <IconWrapper onPress={onVisible} style={{ marginRight }}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="rgba(255, 0, 0, 0.7)" />
                    </IconWrapper>
                </SearchContainer>
            </Box>
            <BodyContainer>
                <Categories  /> 
            </BodyContainer>
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
    /* background-color: yellowgreen; */
    flex: 1;
    width: 100%;
`;

export default HomeScreen; 