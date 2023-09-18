import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Animated, Easing } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import styled from "styled-components";
import LogoImg from "../../assets/CookHub-Welcome-removebg-preview.png";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const circle1Scale = new Animated.Value(1);
    const circle2Scale = new Animated.Value(1);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(circle1Scale, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0), 
            }),
            Animated.timing(circle1Scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0),
            }),
            Animated.timing(circle2Scale, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0),
            }),
            Animated.timing(circle2Scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(2),
            }),
        ]).start();
        setTimeout(() => navigation.navigate("Home"), 2000);
    }, []);

    return (
        <Container>
            <Animated.View
                    style={{
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    borderRadius: 1000,
                    padding: hp(5.5),
                    transform: [{ scale: circle1Scale }],
                }}>
                <Animated.View
                    style={{
                        backgroundColor: "rgba(255, 0, 0, 0.2)",
                        borderRadius: 1000,
                        padding: hp(1),
                        transform: [{ scale: circle2Scale }],
                    }}>
                    <LogoImage source={LogoImg} />
                </Animated.View>
            </Animated.View>

            <TextContainer>
                <Title style={{fontSize: hp(7)}}>Cook Hub</Title>
                <SubTitle style={{fontSize: hp(1.5)}}>야! 너두 백종원 될 수 있어!</SubTitle>
            </TextContainer>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f2c098;
`;

const LogoImage = styled.Image`
    width: ${hp(23)}px;
    height: ${hp(23)}px;
    border-radius: 300px;
`;

const TextContainer = styled.View`
    align-items: center;
    justify-content: space-between;
    align-items: flex-end;
`;

const Title = styled.Text`
    font-weight: bold;
    color: rgba(255, 0, 0, 0.6);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
`;

const SubTitle = styled.Text`
    color: rgba(255, 0, 0, 0.6);
`;

export default WelcomeScreen; 