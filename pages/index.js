import Head from 'next/head'
import Card from '../components/card/Card'
import { Container, Header, Content, Grid, Row, Col } from 'rsuite';
import TuriviusHeader from '../components/layout/Header';
import { useState } from 'react';

export default function Home(props) {
  const [voteData, setVoteData] = useState({})

  // .map() function returns array => store new array as mergedArray to use for card render in return function
  // {...obj1, ...obj2} merges two objects
  // .find() function finds entity where entity.id === card.entity
  // map through each card, then find entity to be merged with current card, then merge entity and card, then store in array
  const mergeById = (arr1, arr2) =>
    arr1.map(card => ({
      ...arr2.find((entity) => (card.entity === entity.id)),
      ...card
    }));
  
  const mergedData = mergeById(props.cards, props.entities)

  // function to set vote in card.jsx
  const toggleLike = (arrId, vote) => {
    console.log(arrId, vote)
    // set new object with array index and vote
    const newVote = { [arrId]: { vote } }
    console.log('newVote')
    console.log(newVote)
    // merge current state with newVote
    setVoteData({...voteData, ...newVote})
  }
  console.log('voteData')
  console.log(voteData)

  return (
    <div>
      <Head>
        <title>Turivius Frontend Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header>
        <TuriviusHeader />
      </Header>

      <Container>
        <Content>
          <Grid fluid>
            <Row>
              {mergedData.map((mergedCard, index) =>
                // do not user card.id as key -> multiple cards with same id value error
              
                <Col key={index} sm={24}>
                  <Card {...mergedCard} arrId={index} toggleLike={toggleLike} voteData={voteData}/>
                </Col>)}
            </Row>
          </Grid>
        </Content>
      </Container>
    </div>
  )
}

Home.getInitialProps = async () => {
  const cards = await (await fetch('http://localhost:3000/api/cards')).json()
  // as you did with cards, use initial props for SSR of entities (https://nextjs.org/docs/api-reference/data-fetching/getInitialProps)
  const entities = await (await fetch('http://localhost:3000/api/entities')).json()
  return {
    cards:cards, entities:entities
  }
}

