import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Edit } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    setNotes(response.data);
  };

  const saveNote = async () => {
    if (!title.trim() || !content.trim()) return;
    if (editId) {
      // Пока без редактирования
    } else {
      await axios.post(`${API_URL}/notes`, { title, content });
    }
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Заметки</h1>
      <div className="mb-6 p-4 bg-gray-100 rounded-xl shadow-md">
        <Input placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Текст заметки" value={content} onChange={(e) => setContent(e.target.value)} />
        <Button onClick={saveNote} className="w-full bg-blue-500">{editId ? "Сохранить" : "Добавить"}</Button>
      </div>
      <div className="grid gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="p-4 flex justify-between items-start bg-white shadow-md">
            <CardContent>
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>
            </CardContent>
            <Button variant="destructive" onClick={() => deleteNote(note.id)}>
              <Trash2 size={16} />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
