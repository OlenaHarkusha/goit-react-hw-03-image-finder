import { Component } from 'react';
import { GlobalStyle } from '../GlobalStyles';
import { Searchbar } from 'components/Searchbar';
import { getPictures } from 'components/Services/api';
import { ImageGallery } from 'components/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components/Button';
import { Container } from './App.styled';
import { SyncLoader } from 'react-spinners';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    totalPages: 0,
    query: '',
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const prevPage = prevState.page;
    const { query, page } = this.state;

    if (prevQuery !== query || prevPage !== page) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const picturesResponse = await getPictures(query, page);
      if (picturesResponse.hits.length === 0) {
        toast.warn(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      const pictures = picturesResponse.hits.map(item => ({
        id: item.id,
        webformatURL: item.webformatURL,
        largeImageURL: item.largeImageURL,
        tags: item.tags,
      }));
      this.setState(prevState => ({
        images: [...prevState.images, ...pictures],
        totalPages: Math.ceil(picturesResponse.totalHits / 12),
      }));
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const query = e.currentTarget.query.value;
    query
      ? this.setState({
          images: [],
          page: 1,
          totalPages: 0,
          query,
          isLoading: false,
          error: null,
        })
      : toast.warn('Please enter a search query');
    e.currentTarget.reset();
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, page, totalPages, isLoading, error } = this.state;
    const showGallery = images.length !== 0;
    const override = {
      display: 'block',
      margin: '0 auto',
    };
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Oops, it's an error: ({error})!
          </h2>
        )}
        {isLoading && <SyncLoader color="#3f51b5" cssOverride={override} />}
        {showGallery && <ImageGallery pictures={images} />}
        {page < totalPages && <Button onClick={this.handleClick} />}
        <ToastContainer />
        <GlobalStyle />
      </Container>
    );
  }
}
