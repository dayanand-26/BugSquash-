# BugSquash-
A Bug Tracking System

# BugSquash - Issue Tracking System

BugSquash is a modern, full-featured issue tracking system built with React, TypeScript, and Supabase. It provides a streamlined interface for managing projects, tracking issues, and collaborating with team members.

## Features

- 🔐 Secure authentication with email/password
- 📊 Project management with customizable workflows
- 🎯 Issue tracking with priorities and types
- 💬 Real-time comments and notifications
- 📱 Responsive design for all devices
- 🔄 Drag-and-drop issue management
- 👥 Team collaboration tools
- 📈 Project progress tracking

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router
  - Lucide Icons
  - React Hot Toast

- **Backend:**
  - Supabase
  - PostgreSQL
  - Row Level Security
  - Edge Functions

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bugsquash.git
cd bugsquash
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/     # React components
│   ├── auth/      # Authentication components
│   ├── issues/    # Issue-related components
│   ├── layout/    # Layout components
│   ├── modals/    # Modal components
│   └── pages/     # Page components
├── context/       # React context providers
├── lib/           # Utility libraries
├── types/         # TypeScript type definitions
└── utils/         # Helper functions
```

## Database Schema

The application uses the following main tables:
- `profiles` - User profiles and roles
- `projects` - Project information and settings
- `issues` - Issue tracking and management
- `comments` - Issue comments and discussions
- `notifications` - User notifications

## Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication with Supabase Auth
- Role-based access control
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Backend powered by [Supabase](https://supabase.com)
