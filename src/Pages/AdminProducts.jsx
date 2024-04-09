/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const AdminProducts = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();
  const cookie = cookies.get("jwttoken");

  const protectPath = () => {
    if (!cookie) {
      navigate("/login");
    }
  };

  // to store all the products
  const [products, setProducts] = useState([]);

  // for storing products form inputs
  const [productData, setProductData] = useState({
    name: "",
    details: "",
    currentprice: "",
    originalprice: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setProductData({ ...productData, [name]: value });
  };

  // for posting product images
  const [imageList, setImageList] = useState();

  const postProducts = async (e) => {
    e.preventDefault();

    const { name, details, currentprice, originalprice } = productData;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("details", details);
    formData.set("currentprice", currentprice);
    formData.set("originalprice", originalprice);

    for (let i = 0; i < imageList.length; i++) {
      const file = imageList[i];
      formData.append("images", file);
    }

    const res = await fetch("/api/postproducts", {
      method: "POST",
      body: formData,
    });

    if (res.status === 400) {
      toast.error("Please fill all the fields properly");
    } else if (res.status === 201) {
      toast.success("Product listed");
      fetchProducts();
    } else {
      toast.error("Something went wrong!");
    }
  };

  // to fetch all the products
  const fetchProducts = async () => {
    const res = await fetch("/api/getproducts", {
      method: "GET",
    });

    const response = await res.json();

    setProducts(response);
  };

  useEffect(() => {
    protectPath();
    fetchProducts();
  }, []);

  //   to delete a particular product
  const deleteProduct = async (id) => {
    const res = await fetch(`/api/deleteproduct/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      toast.success("Product deleted");
      fetchProducts();
    } else if (res.status === 400) {
      toast.error("Invalid product ID");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="adminProductsPage">
      <ToastContainer />
      <div className="uploadProductsContainer">
        <p className="uploadProductContainerTitle">Upload new books</p>
        <form onSubmit={postProducts} encType="multipart/form-data">
          <div>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter product name"
              onChange={handleInputs}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Details*</label>
            <textarea
              rows={8}
              type="text"
              name="details"
              id="details"
              placeholder="Enter product details"
              onChange={handleInputs}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Offer price (or current price)*</label>
            <input
              type="text"
              name="currentprice"
              id="currentprice"
              placeholder="Example: 1000"
              onChange={handleInputs}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Original price (if any)</label>
            <input
              type="text"
              name="originalprice"
              id="originalprice"
              placeholder="Example: 1500"
              onChange={handleInputs}
            />
          </div>
          <div>
            <label htmlFor="name">Upload book images*</label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              required
              onChange={(e) => {
                setImageList(e.target.files);
              }}
            />
          </div>
          <button className="navbarBtn">Submit</button>
        </form>
      </div>
      <div className="seeProductsContainer">
        {products.length > 0 && (
          <p className="seeProductsContainerTitle">Books</p>
        )}
        {products.map((product) => {
          return (
            <div key={product._id} className="seeProductsItems">
              <div>
                <p className="seeProductsItemsName">{product.name}</p>
              </div>

              <button
                className="deleteProduct"
                onClick={() => {
                  deleteProduct(product._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProducts;
