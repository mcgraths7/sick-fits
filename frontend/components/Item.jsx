import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

const Item = (props) => {
  const { item } = props;

  return (
    <ItemStyles>
      {item.image && <img src={item.image} alt={item.title} />}
      <Title>
        <Link
          href={{
            pathname: 'item',
            query: {
              id: item.id,
            },
          }}
        >
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>
        <p>{formatMoney(item.price)}</p>
      </PriceTag>
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: item.id,
            },
          }}
        >
          <a>Edit</a>
        </Link>
        <Link>
          <a>Add to cart</a>
        </Link>
        <Link>
          <a>Delete</a>
        </Link>
      </div>
    </ItemStyles>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
export default Item;
