import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {NewsList} from "./pages/NewsList.tsx";
import {NewsDetail} from "./pages/NewsDetail.tsx";
import {NewsFavorites} from "./pages/NewsFavorites.tsx";

function App() {

  return (
    <>
        <div className={'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Navigate to={'/news'}/>}/>
                    <Route path={'/news'} element={<NewsList/>}/>
                    <Route path={'/news/:id'} element={<NewsDetail/>}/>
                    <Route path={'/favorites'} element={<NewsFavorites/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    </>
  )
}

export default App
