import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProductForm({ onAddProduct }) {
    const navigate = useNavigate();

    // 입력 필드를 관리하는 상태들
    const [productName, setProductName] = useState("");
    const [productSeries, setProductSeries] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [productDescription, setProductDescription] = useState("");

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productName || !productPrice || !productImage) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        // 새 상품 객체를 생성
        const newProduct = {
            id: Date.now(),  // 고유 ID를 생성
            gundam_name: productName,
            gundam_series: productSeries,
            price: productPrice,
            image: URL.createObjectURL(productImage),
            description: productDescription,
        };

        // 상품 추가 후 목록으로 이동
        onAddProduct(newProduct);
        navigate("/admin/products");
    };

    return (
        <div className="admin-product-form">
            <h2>상품 추가</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>상품 이름</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>상품 시리즈</label>
                    <input
                        type="text"
                        value={productSeries}
                        onChange={(e) => setProductSeries(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>상품 가격</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>상품 이미지</label>
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>상품 설명</label>
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">상품 추가</button>
            </form>
        </div>
    );
}

export default AdminProductForm;
