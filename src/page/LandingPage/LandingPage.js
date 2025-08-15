import { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import { ColorRing } from "react-loader-spinner";

const LandingPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const loading = useSelector((state) => state.product.loading);
  const [query] = useSearchParams();
  const rawName = query.get("name");
  const rawCategory = query.get("category");

  const name = (rawName ?? "").trim();
  const category = (rawCategory ?? "").trim();
  useEffect(() => {
    const params = {};
    if (name) params.name = name;
    if (category) params.category = category;
    dispatch(getProductList(params));
  }, [dispatch, name, category]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#000", "#000", "#000", "#000", "#000"]}
        />
      </div>
    );
  }

  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={4} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name ? (
              <h2 className="h5 mb-0">“{name}”과 일치한 상품이 없습니다!</h2>
            ) : category ? (
              <h2 className="h5 mb-0">“{category}” 카테고리에 상품이 없습니다!</h2>
            ) : (
              <h2 className="h5 mb-0">등록된 상품이 없습니다!</h2>
            )}
          </div>
        )}
      </Row>
    </Container>
  );
};

export default LandingPage;
