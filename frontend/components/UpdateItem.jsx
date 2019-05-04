import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

/*
  ? This allows us to use the queries and mutations we exposed via yoga
  ? The $ syntax is GraphQL method of declaring variables
  ? I add mutation or query as the prefix to make it easy to discern at a glance what it is
*/

const QUERY_SINGLE_ITEM = gql`
  query QUERY_SINGLE_ITEM($id: ID!) {
    item(where: { id: $id }) {
      title
      description
      price
      id
    }
  }
`;

const MUTATION_UPDATE_ITEM = gql`
  mutation MUTATION_UPDATE_ITEM(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    updateItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;
class UpdateItem extends Component {
  state = {};

  /*
    ? If the field type is a number, then parse it, rather than leaving it as a string,
    ? then add that field to state
  */
  handleChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    const { title, price, description } = this.state;
    const { id } = this.props;
    return (
      <Query
        query={QUERY_SINGLE_ITEM}
        variables={{
          id,
        }}
      >
        {({ data, loading }) => (loading ? (
          <p>Loading...</p>
        ) : (
          <Mutation mutation={MUTATION_UPDATE_ITEM} variables={this.state}>
            {(createItem, { error }) => (
              <Form
                onSubmit={async (e) => {
                  // ? Stop the form from submitting
                  e.preventDefault();
                  // ? call the mutation
                  const res = await createItem();
                  // ? change them to the single item page
                  Router.push({
                    pathname: '/item',
                    query: { id: res.data.createItem.id },
                  });
                }}
              >
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                      Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      value={title}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label htmlFor="price">
                      Price
                    <input
                      type="number"
                      id="price"
                      name="price"
                      placeholder="Price"
                      required
                      value={price}
                      onChange={this.handleChange}
                    />
                  </label>

                  <label htmlFor="description">
                      Description
                    <textarea
                      id="description"
                      name="description"
                      placeholder="Enter A Description"
                      required
                      value={description}
                      onChange={this.shandleChange}
                    />
                  </label>

                  <button type="submit">List Item</button>
                </fieldset>
              </Form>
            )}
          </Mutation>
        ))
        }
      </Query>
    );
  }
}

UpdateItem.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateItem;
export { MUTATION_UPDATE_ITEM };
export { QUERY_SINGLE_ITEM };
