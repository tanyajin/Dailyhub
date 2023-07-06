
import InitialScene from "./components/Scenes/InitialScene";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/page/Login";
import Signup from "./components/page/Signup";
import HomeScene from "./components/scenes/HomeScene";
import Schedule from "./components/page/Schedule";
import Diary from './components/page/Diary'
import Board from './components/common/Board'
import Editor from './components/common/Editor'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InitialScene />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomeScene />}/>
        <Route path="/schedule" element={<Schedule />} />  

        <Route path='/diary' element={<Diary />}>
        <Route index element={<Board />}/>
        <Route path='/diary/:diaryId' element={<Editor />}/>
        </Route>
        

<Route>



</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{/* <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
  
<Experience />
</Canvas> */}