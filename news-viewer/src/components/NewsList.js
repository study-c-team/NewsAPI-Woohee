import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem"
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;  // 환경 변수 사용

const NewsList = ({category}) => {
    const [ articles, setArticles ] = useState(null);
    const [ loading , setLoading ] = useState(null);

    useEffect(() => {
        // async 비동기 함수호출
        const fetchData = async () => {
            // APi 호출 시간동안 보여줄 로딩바
            setLoading(true)
            // try catch문 에러 처리
            try {
                // props로 넘어 온 state로
                const query = category  === 'all' ? '' : `&category=${category}`;
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=${API_KEY}`,
                );
                // API 데이터 state 저장
                setArticles(response.data.articles)
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        };
        fetchData();
    }, [category]);

    // 대기 중
    if (loading) {
        return <NewsItemBlock>대기 중입니다...</NewsItemBlock>
    }
    // articles 값이 설정 안될경우 (null 오류 방지)
    if (!articles) {
        return null;
    }

    // articles 값이 유효할 때
    return (
        <NewsItemBlock>
            {articles.map(v =>  (
                <NewsItem key={v.url} article={v} />
            ))}
        </NewsItemBlock>
    );
};

const NewsItemBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px:
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        wdith: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

export default NewsList;