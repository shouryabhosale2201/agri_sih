import { useNavigate } from "react-router-dom";

const Category = ({ categories }) => {
    const navigate = useNavigate();
    
    return (
        <div className="shop-by-category">
            <div className="categories">
                {categories && categories.length > 0 ? (
                    categories.map((item) => (
                        <div key={item._id} className="category" onClick={() => navigate(`/category/${item._id}`)}>
                            <img src={process.env.REACT_APP_DEV_URL + item.imgUrl} alt={item.name} />
                        </div>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </div>
        </div>
    );
};

export default Category;
