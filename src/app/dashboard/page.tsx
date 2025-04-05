"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { fetchKudos } from "@/api/kudosApi";
import KudosList from "@/components/KudosList";
import KudoForm from "@/components/KudoForm";
import { getCurrentUser } from "@/api/usersApi";
import { AppBar, Toolbar, Typography, Button, Container, Paper } from "@mui/material";
import { logoutUser } from "@/api/authApi";
import Grid from "@mui/material/Grid";
import { showToast } from "@/components/Toast";

interface KudoUser {
  id: number,
  full_name: string
}

interface Kudo {
  id: number;
  giver: KudoUser;
  receiver: KudoUser;
  message: string;
  timestamp: string
}

interface Kudos{
  given: Kudo[];
  received: Kudo[];
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; organization: string } | null>(null);
  const [kudos, setKudos] = useState<Kudos>({ given: [], received: [] });
  const [isClient, setIsClient] = useState(false);

  const loadKudos = async () => {
    try {
      const fetchedKudos = await fetchKudos();
      setKudos(fetchedKudos);
    } catch (error) {
      showToast.warning("Unable to fetch users")
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.dispatchEvent(new Event("logout"));
    router.push("/login");
  };

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const user = await getCurrentUser();
        setUser(user);
        await loadKudos();
      } catch (error) {
        showToast.warning("Unable to fetch kudos list")
      }
    };

    fetchData();
  }, [router]);

  if (!isClient) return null;

  return (
    <AuthGuard>

      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Kudos App</Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ width: "100%" }}>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Welcome {user?.username}!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Organization: {user?.organization}
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid key="given" size={{ xs: 2, sm: 4, md: 4 }}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: "primary.light" }}>
                <Typography variant="h6">Kudos Given</Typography>
                <KudosList kudos={kudos.given} type="given" />
              </Paper>
            </Grid>

            <Grid key="received" size={{ xs: 2, sm: 4, md: 4 }}>
              <Paper elevation={2} sx={{ p: 3, bgcolor: "success.light" }}>
                <Typography variant="h6">Kudos Received</Typography>
                <KudosList kudos={kudos.received} type="received" />
              </Paper>
            </Grid>

            <Grid key="send-kudos" size={{ xs: 2, sm: 4, md: 4 }}>
              <Paper elevation={2} sx={{p: 3, bgcolor: "lightgoldenrodyellow" }}>
                <Typography variant="h6">Send a Kudo</Typography>
                <KudoForm onKudoSent={loadKudos} />
              </Paper>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </AuthGuard>
  );
}
