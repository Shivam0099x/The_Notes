import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import NoteViewer from './pages/NoteViewer';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" replace />} />
        <Route path="/notes" element={<Home />} />
        <Route path="/notes/:id" element={<NoteViewer />} />
      </Routes>
    </BrowserRouter>
  );
}