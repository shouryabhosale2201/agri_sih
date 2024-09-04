import { BrowserRouter, Routes, Route } from "react-router-dom";
// TO MAINTAIN A LINK BETWEEN MULTIPLE PAGES OF THE WEBSITE.
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import AppContext from "./utils/context";
import Blog from "./components/Header/Blog/Blog";
import BlogPost1 from "./components/Header/Blog/blogpost1";
import BlogPost2 from "./components/Header/Blog/blogpost2";
import BlogPost3 from "./components/Header/Blog/blogpost3";
import BlogPost4 from "./components/Header/Blog/blogpost4";
import BlogPost5 from "./components/Header/Blog/blogpost5";
import BlogPost6 from "./components/Header/Blog/blogpost6";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";

function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blogpost1" element={<BlogPost1 />} />
                    <Route path="/blogpost2" element={<BlogPost2 />} />
                    <Route path="/blogpost3" element={<BlogPost3 />} />
                    <Route path="/blogpost4" element={<BlogPost4 />} />
                    <Route path="/blogpost5" element={<BlogPost5 />} />
                    <Route path="/blogpost6" element={<BlogPost6 />} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Registration/>} />
                </Routes>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
//Atharv se header.jsx lene ki zaroorat nai hai.