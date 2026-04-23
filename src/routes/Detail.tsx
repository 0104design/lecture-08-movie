import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Wrap = styled.div`
    padding: 35px;
`;

const BoxButton = styled.button`
    padding: 3px 3px;
    background-color: lightgray;
    border-radius: 8px;
    border: 1px solid #bfbfbf;
`;

const Color = styled.div`
    background-color: #e8e8e8;
    padding: 40px;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 20px;
    gap: 10px;
`;

const Flex = styled.div`
    display: flex;
    gap: 20px;
`;

const DivFlex = styled.div`
    display: flex;
    gap: 20px;
`;

const DivBox = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid #bfbfbf;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const Button = styled.button`
    background-color: lightgray;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #bfbfbf;
    margin-bottom: 20px;
`;

const Flex1 = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const Margin = styled.h1`
    margin: 0;
`;

const Img = styled.img`
    border-radius: 15px;
`

function Detail() {
    const { imdbID } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${imdbID}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => setMovie(json))
            .catch(err => console.log(err));
    }, [imdbID]);

    if (!movie) return <div>loading...</div>;

    return (
        <Wrap>
            <Button onClick={() => navigate(-1)}>&larr; 뒤로가기</Button>
            <Flex>
                <Img src={movie.Poster} alt={movie.Title} />
                <FlexBox>
                    <Color>
                        <Flex1>
                            <Margin>기본 정보</Margin>
                            <Margin>제목 : {movie.Title}</Margin>
                            <DivFlex>
                                <BoxButton>장르</BoxButton>
                                <p>{movie.Genre}</p>
                            </DivFlex>
                            <DivFlex>
                                <BoxButton> 개봉 시기</BoxButton>
                                <p>{movie.Year}</p>
                            </DivFlex>
                            <DivFlex>
                                <BoxButton>감독</BoxButton>
                                <p>{movie.Director}</p>
                            </DivFlex>
                        </Flex1>
                    </Color>
                    <DivBox>
                        <Margin>줄거리</Margin>
                        <p>{movie.Plot}</p>
                    </DivBox>
                </FlexBox>
            </Flex>
        </Wrap>
    );
}

export default Detail;
