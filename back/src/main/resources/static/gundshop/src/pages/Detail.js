import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import StarRating from './StarRating'; // StarRating 컴포넌트 임포트

function ReviewStars({ rating }) {
  return (
    <div className="review-stars" style={{ display: 'flex', alignItems: 'center' }}>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <span key={index} className="star" style={{ color: currentRating <= rating ? 'gold' : 'gray', fontSize: '20px' }}>
            ★
          </span>
        );
      })}
      {/* 숫자로 별점 표시 */}
      <span style={{ marginLeft: '10px', fontSize: '20px' }}>{rating}</span>
    </div>
  );
}

function Detail(props) {
  let { id } = useParams();
  let 찾은상품 = props.MG.find(x => x.id == id);
  const navigate = useNavigate();

  // 수량을 관리하는 상태
  let [quantity, setQuantity] = useState(1);

  // 리뷰와 별점을 관리하는 상태
  let [reviews, setReviews] = useState([]);
  let [newReview, setNewReview] = useState("");
  let [newRating, setNewRating] = useState(0); // 새 리뷰에 대한 별점
  let [newImage, setNewImage] = useState(null); // 새 리뷰 이미지 관리

  // 리뷰 좋아요 기능
  const handleLike = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].likes += 1;
    setReviews(updatedReviews);
  };

  // 리뷰 추가 함수
  const addReview = () => {
    if (newReview || newImage) {
      const imageURL = newImage ? URL.createObjectURL(newImage) : null;
      setReviews([...reviews, { user: "익명 사용자", content: newReview, rating: newRating, image: imageURL, date: new Date().toLocaleDateString(), likes: 0 }]);
      setNewReview("");  // 입력 필드를 비움
      setNewRating(0);   // 별점 초기화
      setNewImage(null); // 이미지 초기화
    }
  };

  return (
    <div className="container detail-container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className="col-md-6">
          <img src={process.env.PUBLIC_URL + `/images/mg${id}.jpg`} alt={찾은상품.gundam_name} width="100%" />
        </div>

        <div className="col-md-6">
          <h2>{찾은상품.gundam_name}</h2>

          <div className="product-info">
            <p><strong>시리즈명: </strong>{찾은상품.gundam_series}</p>
            <p><strong>수령 방법: </strong>택배 수령</p>
          </div>

          <div className="quantity-selector" style={{ marginBottom: '20px' }}>
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="btn btn-outline-secondary">-</button>
            <span className="quantity-box">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="btn btn-outline-secondary">+</button>
          </div>

          <p><strong>총 상품금액: </strong>{parseInt(찾은상품.price.replace(/[^0-9]/g, '')) * quantity}원</p>

          <div className="actions" style={{ marginTop: '20px' }}>
            <button className="btn btn-danger" style={{ marginRight: '10px' }}
              onClick={() => navigate('/checkout', {
                state: {
                  productName: 찾은상품.gundam_name,
                  productImage: `/images/mg${id}.jpg`,
                  productPrice: parseInt(찾은상품.price.replace(/[^0-9]/g, '')),
                  quantity: quantity
                }
              })}
            >
              구매하기
            </button>
            <button className="btn btn-outline-dark" style={{ marginRight: '10px' }}>장바구니</button>
            <button className="btn btn-outline-dark">선물하기</button>
          </div>
        </div>
      </div>

      {/* 탭 섹션 */}
      <div className="product-tabs mt-5">
        <Tabs defaultActiveKey="detail" id="product-tabs" className="mb-3">
          <Tab eventKey="detail" title="상세보기">
            {/* 상세 이미지 및 설명 */}
            <div>
              {찾은상품.detail_images && 찾은상품.detail_images.length > 0 ? (
                찾은상품.detail_images.map((image, index) => (
                  <img key={index} src={process.env.PUBLIC_URL + image} alt={`상세 이미지 ${index + 1}`} width="100%" className="mb-3" />
                ))
              ) : (
                <p>상세 이미지가 없습니다.</p>
              )}

              <p>{찾은상품.description}</p>
            </div>
          </Tab>

          <Tab eventKey="reviews" title="상품리뷰">
            <div>
              {/* 리뷰 리스트 */}
              {reviews.map((review, index) => (
                <div key={index} className="review" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '20px' }}>
                  {/* 상단 별점과 사용자, 날짜 */}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ReviewStars rating={review.rating} />
                      <span style={{ color: 'gray', fontSize: '14px', marginLeft: '10px' }}>{review.user}</span>
                      <span style={{ color: 'gray', fontSize: '12px', marginLeft: '10px' }}>{review.date}</span>
                    </div>
                    <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                      <button className="btn btn-light" onClick={() => handleLike(index)} style={{ border: '1px solid gray', background: 'transparent' }}>
                        👍 {review.likes}
                      </button>
                    </div>
                  </div>

                  {/* 첨부 이미지와 리뷰 내용 */}
                  <div style={{ display: 'flex', marginTop: '10px' }}>
                    {review.image && <img src={review.image} alt="리뷰 이미지" style={{ width: '100px', height: '100px', marginRight: '20px' }} />}
                    <div>
                      <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* 리뷰 작성 및 별점 */}
              <div className="mt-4">
                <h5>리뷰 작성하기</h5>
                <StarRating rating={newRating} onRatingChange={setNewRating} />

                {/* 이미지 업로드 추가 */}
                <div className="mt-3">
                  <label htmlFor="reviewImage">이미지 업로드</label>
                  <input
                    type="file"
                    id="reviewImage"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    accept="image/*"
                    className="form-control"
                  />
                </div>

                <textarea
                  className="form-control mt-3"
                  rows="3"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="리뷰를 작성하세요..."
                />
                <button className="btn btn-primary mt-3" onClick={addReview}>리뷰 추가</button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Detail;
