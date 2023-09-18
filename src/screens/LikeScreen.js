import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Like from "../components/Like";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
                                
const LikeScreen = () => {
    const navigation = useNavigation();
    const [likeID, setLikeID] = useState([]);

    useEffect(() => {
        loadLikedPosts();
    }, []);

    const loadLikedPosts = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
        
            const likedPosts = await AsyncStorage.multiGet(allKeys);
        
            const likedPostIds = likedPosts
              .filter(([key, value]) => key.startsWith('likedStatus_') && value === 'true')
              .map(([key]) => key.replace(/^likedStatus_/, ''));
        
              const likedPostIdsAsNumbers = likedPostIds.map(id => parseInt(id, 10));

              setLikeID(likedPostIdsAsNumbers);
            return likedPostIds;
        } catch (error) {
            console.error('Error loading liked posts:', error);
            return [];
        }
    };

    return (
        <Container>
            <HeaderContainer>
                <BackBtn onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={28} color="rgba(255, 0, 0, 0.8)" />
                </BackBtn>
                <KeepHub>
                    <MaterialCommunityIcons name="tag-heart-outline" size={33} color="rgba(255, 0, 0, 0.8)" />
                    <Title> Keep Hub </Title>
                </KeepHub>
            </HeaderContainer>
            <LikeScrollBox>
                {likeID.map((l, i) => (
                    <Like key={i} likeID={l}/>
                ))}
            </LikeScrollBox>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    background-color: #f2c098;
    padding: 50px ${hp(3)}px;
`;

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

const BackBtn = styled.TouchableOpacity`
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 999px;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
`;

const KeepHub = styled.View`
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    color: rgba(255, 0, 0, 0.7);
    font-size: 28px;
    font-weight: bold;
`;

const LikeScrollBox = styled.ScrollView`
    padding: 20px 0px;
`;

export default LikeScreen; 