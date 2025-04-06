#### Kudos Dashboard – Frontend
A modern React (Next.js) based frontend for the Kudos application, allowing users to give and receive kudos within an organization.

### Features
- JWT Authentication (Login / Logout)

- Organization-based Kudos Sharing

- View Given & Received Kudos

- Send New Kudos

- Built with Material UI (MUI)

### Tech Stack
- Next.js
- React
- TypeScript
- MUI – Material Design Components
- Axios for API communication

### Setup
```bash
git clone https://github.com/your-username/kudos-dashboard.git
cd kudos-dashboard
npm install
```
Create a .env.local file with your API base URL:
```bash
echo "NEXT_PUBLIC_BASE_API_URL=http://localhost:8000/api/v1" >> .env.local
```

### Run the App
```bash
npm run dev
```
App will be running at http://localhost:3000