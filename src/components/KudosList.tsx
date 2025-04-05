import React from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

interface KudoUser {
    id: number,
    full_name: string
}
interface Kudo {
    id: number;
    giver: KudoUser;
    receiver: KudoUser;
    message: string;
    timestamp: string;
}

interface KudosListProps {
    kudos: Kudo[];
    type: "given" | "received";
}

const KudosList: React.FC<KudosListProps> = ({ kudos, type }) => {
    return (
        <Paper sx={{ bgcolor: type === "given" ? "primary.light" : "success.light" }}>
            {kudos.length > 0 ? (
                <List>
                    {kudos.map((kudo) => (
                        <ListItem key={kudo.id} divider sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            borderBottom: "2px solid rgba(0, 0, 0, 0.22)",
                            paddingY: 2,
                            marginY: 1,
                        }}
                        >
                            <Typography variant="body1" fontWeight="bold">
                                Message : {kudo.message ? `"${kudo.message}"` : ""}
                            </Typography>

                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                {type === "given"
                                    ? `To: ${kudo.receiver.full_name}`
                                    : `From: ${kudo.giver.full_name}`}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                At: {new Date(kudo.timestamp).toLocaleString()}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography color="textSecondary">No kudos {type === "given" ? "given" : "received"} yet.</Typography>
            )}
        </Paper>
    );
};

export default KudosList;
