import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

// ? Styles go here

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

// * Queries go here

const QUERY_ALL_ITEMS = gql`
  query QUERY_ALL_ITEMS {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

// * Component rendering goes here

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={QUERY_ALL_ITEMS}>
          {payload => {
            const { data, error, loading } = payload;
            if (loading) return <p>Loading...</p>;
            if (error) return <p>There was a problem... {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id}>
                    {item.title}
                  </Item>
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export { QUERY_ALL_ITEMS };
