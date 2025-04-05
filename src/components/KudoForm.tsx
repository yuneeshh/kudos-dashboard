import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/api/usersApi";
import { postKudo } from "@/api/kudosApi";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import { showToast } from "@/components/Toast";

interface User {
  id: number;
  username: string;
}

interface KudoFormProps {
  onKudoSent: () => void;
}

const KudoForm: React.FC<KudoFormProps> = ({ onKudoSent }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [receiver, setReceiver] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersList = await fetchUsers();

        setUsers(usersList);

      } catch (err) {
        setError("Failed to load users");
        showToast.error(err)
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiver || !message.trim()) {
      setError("Please select a receiver and enter a message.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await postKudo({ receiver_id:receiver, message });
      setReceiver(null);
      setMessage("");
      onKudoSent(); // Refresh kudos list
      showToast.success("Kudos sent successfully")
    } catch (err) {
        showToast.error(err.response.data.receiver_id[0])
    } finally {
      setLoading(false);
    }
  };
  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setReceiver(Number(value));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        select
        label="Receiver"
        value={receiver ??  undefined}
        onChange={handleReceiverChange}
        fullWidth
        margin="normal"
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.username}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />

      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? "Sending..." : "Send Kudo"}
      </Button>
    </form>
  );
};

export default KudoForm;
