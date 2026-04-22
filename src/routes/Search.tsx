import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieItem = {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
};

const MovieWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
`;
const Img = styled.img`
    height: 550px;
`;

const Box = styled.div`
    width: calc((100% - 120px)/4);
    display: flex;
    flex-direction: column;
    margin: 40px 0;
`;

const Tag = styled.span `
    padding: 10px;
    background-color: lightgray;
    border-radius: 10px;
    width: 30%
`;

const TagA =  styled.div `
    width: 70%;
`;

const Margin = styled.div `
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;




type Res = {
    Search: MovieItem[];
};
function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<MovieItem[]>([]);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: Res) => {
                setList(json.Search);
            })
            .catch(err => console.log(err));
    }, [keyword]);

    return (
            <MovieWrap>
                {list.map((value, index) => (
                    <Box key={index}>
                        <Margin>
                            <Tag>제목</Tag>
                            <TagA>{value.Title}</TagA>
                        </Margin>
                        <Img src={value.Poster} alt={value.Title} />
                    </Box>
                ))}
            </MovieWrap>
    );
}

export default Search;
