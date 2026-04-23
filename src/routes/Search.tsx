import { Link, useNavigate, useSearchParams } from "react-router";
import { type ChangeEvent, type SubmitEvent, useEffect, useState } from "react";
import styled from "styled-components";

export type MovieItem = {
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
    width: 100%;
    border-radius: 15px;
    transition: all 2s;

    &:hover {
        transform: scale(0.8);
    }
`;

const Box = styled.div`
    width: calc((100% - 120px) / 4);
    display: flex;
    flex-direction: column;
    margin: 40px 0;
`;

const Tag = styled.span`
    padding: 10px;
    background-color: #b8b8b8;
    color: white;
    border-radius: 10px;
    text-align: center;
`;

const TagA = styled.div`
    text-align: right;
    color: #9c9c9c;
`;

const Margin = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.5s;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #b8b8b8;
    flex: 1;
`;

const Button = styled.button`
    width: 70px;
    border: 1px solid #b8b8b8;
    border-radius: 5px;
`;

const Form = styled.form`
    display: flex;
    gap: 20px;
`;

const Wrap = styled.div`
    padding: 35px;
`

type Res = {
    Search: MovieItem[];
};
function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<MovieItem[]>([]);

    const [input, setInput] = useState(keyword || "");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: Res) => {
                setList(json.Search);
            })
            .catch(err => console.log(err));
    }, [keyword]);

    if (!keyword) {
        return <div>검색 결과가 없습니다</div>;
    }

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const modifyInput = input.trim();
        if (!modifyInput) return;
        navigate(`/search/?keyword=${encodeURIComponent(modifyInput)}`);
    };

    return (
        <Wrap>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} value={input} />
                <Button type={"submit"}>검색</Button>
            </Form>
            <MovieWrap>
                {list.map((value, index) => (
                    <Box key={index}>
                        <Link to={`/detail/${value.imdbID}`}>
                            <Img src={value.Poster} alt={value.Title} />
                        </Link>
                        <Margin>
                            <Tag>제목</Tag>
                            <TagA>{value.Title}</TagA>
                        </Margin>
                    </Box>
                ))}
            </MovieWrap>
        </Wrap>
    );
}

export default Search;
