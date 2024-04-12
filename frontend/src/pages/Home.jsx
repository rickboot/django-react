import { useEffect, useState } from 'react';
import api from '../api';
import Note from '../components/Note';
import '../styles/Home.css';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const deleteNote = async (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert('Note deleted!');
        else alert('Failed to delete note');
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post('/api/notes/', { title, content })
      .then((res) => {
        if (res.status === 201) alert('Note created!');
        else alert('Failed to create note');
        getNotes();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h1>Notes</h1>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          name='title'
          type='text'
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='content'>Content</label>
        <input
          type='text'
          id='content'
          name='content'
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Home;
