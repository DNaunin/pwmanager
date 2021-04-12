import { GridFSBucket } from "mongodb";
import { redirect } from "next/dist/next-server/server/api-utils";
import { useState } from "react";
import styled from "styled-components";
import SafeInput from "../components/SafeInput";

const SubmitButton = styled.button`
  color: darkblue;
  padding: 0.5rem;
  margin: 0.5em;
  border-radius: 5px;
  box-shadow: 5px 5px 2px 1px rgba(0, 0, 255, 0.2);
  border: none;
`;

const InputField = styled.input`
  height: 2rem;
  border-radius: 5px;
  border: none;
  box-shadow: 5px 5px 2px 1px rgba(0, 0, 255, 0.2);
  font-size: 14pt;
  color: darkblue;
`;

const Heading = styled.h1`
  color: darkblue;
  margin-top: 1.5em;
`;

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  align-content: start;
  grid-gap: 5em;
  place-items: center;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);
  const [secret, setSecret] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }
  return (
    <>
      <Container>
        <title>Dörtes Fancy Password-Manager</title>
        <Heading>Password-Manager 🗝</Heading>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputField
            value={passwordName}
            onChange={(event) => setPasswordName(event.target.value)}
          />
          <SubmitButton type="submit">Sende Passwortanfrage</SubmitButton>
        </form>
        {passwordDoc && (
          <>
            The {passwordDoc.name} password is {passwordDoc.value}!
          </>
        )}
        <SafeInput
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          type="password"
        />
      </Container>
    </>
  );
}
