import React from "react";
import styled from "styled-components";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CachedImage } from "../helpers/image";

const Categories = ({categories, handleChangeCategory}) => {
    return (
        <Container>
            <ScrollBox horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 15}}
            >
                {categories.map((c, i) => {
                    return ( 
                        <CategoriesBox key={i} onPress={() => handleChangeCategory(c.strCategory)}>
                            <CategoriesImgBox>
                                <CachedImage uri={c.strCategoryThumb} 
                                    style={{ 
                                        width: hp(6),
                                        height: hp(6),
                                        borderRadius: (hp(6) / 2),
                                    }}/>
                            </CategoriesImgBox>
                            <CategoriesName> {c.strCategory} </CategoriesName>
                        </CategoriesBox>
                    )
                })}
            </ScrollBox>
        </Container>
    )
};

const Container = styled.View``;

const ScrollBox = styled.ScrollView``;

const CategoriesBox = styled.TouchableOpacity`
    margin: 10px 10px;
    flex: 1;
    align-items: center;
    justify-content: space-between;
`;

const CategoriesImgBox = styled.View`
    background-color: rgba(196, 54, 33, 0.2);
    border-radius: 999px;
    padding: 10px;
    margin-bottom: 5px;
`;

const CategoriesName = styled.Text`
    font-size: ${hp(1.6)}px;
    color: #c43621;
`;

export default Categories;