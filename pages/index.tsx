import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getLists } from "../redux/features/lists/listsSlice";
import Header from "../components/Header";
import HeaderTwo from "../components/HeaderTwo";
import Card from "../components/Card";
import Container from "../components/Container";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);
  return (
    <Container>
      <Header />
      <HeaderTwo />
      <Card />
    </Container>
  );
};

export default Home;
