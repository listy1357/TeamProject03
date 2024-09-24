import { useState } from "react";
import AdminProductForm from "./AdminProductForm";
import '../css/AdminPage.css';

function AdminPage() {
    const [products, setProducts] = useState([
        { id: 0, gundam_name: "MG 이지스 건담", gundam_series: "기동전사 건담 SEED", price: "57,600원", image: "/images/mg0.jpg" },
        { id: 1, gundam_name: "MG 00 퀸터 풀 세이버", gundam_series: "기동전사 건담 OO", price: "57,600원", image: "/images/mg1.jpg" },
    ]);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    return (
        <div className="adminpage-admin-product-form">
            <h1>관리자 페이지</h1>
            <AdminProductForm onAddProduct={handleAddProduct} />
            
            <div className="adminpage-product-list mt-5">
                <h2>상품 목록</h2>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-md-4">
                            <img src={product.image} alt={product.gundam_name} width="100%" />
                            <h5>{product.gundam_name}</h5>
                            <p>{product.gundam_series}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
