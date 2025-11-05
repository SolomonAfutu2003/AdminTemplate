import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../API/productAPI";

const ProductsPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getById(id); // ✅ pass the id
        setProducts(res.data); // ✅ axios auto-parses response
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!products) return <p>Product not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
        <img src={products.imageBase64
                ? `data:image/jpeg;base64,${products.imageBase64}`
                : "https://via.placeholder.com/400x200?text=No+Image"} alt="" />
      <h1 className="text-2xl font-bold mb-4">{products.name}</h1>
      <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: products.description}}
            />
    </div>
  );
};

export default ProductsPage;
