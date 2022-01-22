import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Editor from "../pages/Editor";
import Post from "../pages/Post";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="new-post" element={<Editor />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="/" element={<Home />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
