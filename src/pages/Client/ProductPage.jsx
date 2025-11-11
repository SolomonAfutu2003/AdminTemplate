import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productApi from "../../API/productAPI";
import { LoaderCircle } from "lucide-react";
import MarkdownRenderer from "../../components/MarkdownRenderer";


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

  if (loading) return <div className="flex justify-center items-center h-[400px]"><LoaderCircle className="animate-spin" size={40} /></div>;
  if (!products) return <p>Product not found.</p>;

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4">
      <div className="w-[70%] p-4 flex flex-col justify-center items-center">
        <img src={products.imageBase64
          ? `data:image/jpeg;base64,${products.imageBase64}`
          : "https://via.placeholder.com/400x200?text=No+Image"} alt="" />
      </div>
      <div className="w-[70%] p-4">
        <h1 className="text-2xl font-bold mb-4">{products.name}</h1>
        <MarkdownRenderer
          content={products.description}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
