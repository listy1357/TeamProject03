import React, { useEffect, useState } from 'react';

function ProductDetail() {
  // 상품 정보를 저장할 상태
  const [product, setProduct] = useState(null);

  // 임시 데이터 (나중에 API 요청으로 대체)
  useEffect(() => {
    // 백엔드 API가 준비되면 여기서 fetch()나 axios() 등을 사용해 데이터를 불러올 예정
    const fetchData = async () => {
      // 임시 데이터
      const productData = {
        id: 1,
        name: "RG 윙 건담 (EW)",
        price: "30,000원",
        description: "RG 윙 건담 제품 설명입니다.",
        imageUrl: "/images/mg0.jpg",
      };
      setProduct(productData);
    };

    fetchData();
  }, []);

  // 데이터를 불러오는 중이라면 로딩 메시지 표시
  if (!product) {
    return <div>Loading...</div>;
  }

  // 불러온 데이터를 화면에 렌더링
  return (
    <div className="container mt-5">
      <div className="row">
        {/* 왼쪽: 상품 이미지 */}
        <div className="col-md-6">
          <img src={product.imageUrl} alt={product.name} width="100%" />
        </div>
        {/* 오른쪽: 상품 정보 */}
        <div className="col-md-6">
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
