import { AiOutlineSearch } from 'react-icons/ai';
import {
  SearchbarHeader,
  Form,
  SearchbarButton,
  SearchbarInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchbarHeader>
      <Form onSubmit={onSubmit}>
        <SearchbarButton type="submit">
          <AiOutlineSearch size="20" />
        </SearchbarButton>
        <SearchbarInput
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
