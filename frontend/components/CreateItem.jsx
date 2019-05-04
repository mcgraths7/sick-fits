import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
// import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

/*
  ? This creates the allows us to use the createItem mutation we exposed via yoga
  ? The $ syntax is GraphQL method of declaring variables
  ? I add mutation or query as the prefix to make it easy to discern at a glance what it is
*/
const MUTATION_CREATE_ITEM = gql`
  mutation MUTATION_CREATE_ITEM(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
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
class CreateItem extends Component {
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

  uploadFile = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    // ? files can hold more than one url, but we are only uploading one, so we select the 0th index
    data.append('file', files[0]);
    // ? Cloudinary API requires an upload preset for unsigned uploads. sickfits is the name of our bucket
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/punintended/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await res.json();
    // ? file is the normal upload transformation. file.eager is our background transformation
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  render() {
    const {
      title, price, description, image,
    } = this.state;
    return (
      <Mutation mutation={MUTATION_CREATE_ITEM} variables={this.state}>
        {(createItem, { loading, error }) => (
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
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
                {/*
                ? if there is an image url in state, then add an image tag
                ? underneath the label
                */}
                {image && <img src={image} alt="upload preview" />}
              </label>
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
                  onChange={this.handleChange}
                />
              </label>

              <button type="submit">List Item</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export { MUTATION_CREATE_ITEM };
