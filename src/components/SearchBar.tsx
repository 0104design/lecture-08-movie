import { type ChangeEvent, type SubmitEvent, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Wrap = styled.div`
    margin: 40px;
`;

const Box = styled.form`
    display: flex;
    gap: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 8px;
    border: 1px solid lightgray;
    flex: 1;
`;

const Button = styled.button `
    width: 70px;
    border: 1px solid #eee;
    cursor: pointer;
    border-radius: 5px;
`;

function SearchBar() {
    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const kw = keyword.trim();
        if (!kw) return;
        navigate(`search/?keyword=${encodeURIComponent(kw)}`);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setKeyword(event.target.value);
    };

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    return (
        <Wrap>
            <h2>Movie Search</h2>
            <Box onSubmit={onSubmit}>
                <Input onChange={onChange} />
                <Button type="submit">검색</Button>
            </Box>
        </Wrap>
    );
}

export default SearchBar;
