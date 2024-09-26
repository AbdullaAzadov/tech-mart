import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import ProductList from "./ProductList";
import NotFound from "./NotFound";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route index element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
