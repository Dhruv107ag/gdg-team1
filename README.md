# Focusez - Productivity Chrome Extension

A modern productivity dashboard that replaces your new tab with a beautiful, customizable workspace featuring task management, focus timers, motivational quotes, and quick bookmarks.

Demo Video Link - https://www.loom.com/share/320c764d317248f191236fd724158c08
Code Setup Video Guide - https://www.loom.com/share/5945cc981fae4d8b9c291c8bab97c16d

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Using **pnpm** (recommended):
```bash
pnpm install
```

Or using **npm**:
```bash
npm install
```

### 3. Start the Development Server

Using **pnpm**:
```bash
pnpm run dev
```

Or using **npm**:
```bash
npm run dev
```

### 4. Load the Extension in Chrome

1. Open Chrome and navigate to: `chrome://extensions`
2. Enable **Developer Mode** (toggle in top-right corner)
3. Click **Load unpacked** (button in top-left corner)
4. Select the **`build/chrome-mv3-dev`** folder from your project directory

   Example path:
   ```
   /home/your-username/focusez/build/chrome-mv3-dev
   ```

### 5. Open a New Tab

Open a new tab in Chrome and your Focusez dashboard will appear!

---

## ✨ Features

### 🎨 **Customizable Dashboard**
- **Drag & Drop Widgets** - Rearrange your dashboard by dragging widgets to your preferred layout
- **Widget Visibility Control** - Show/hide widgets based on your needs
- **Persistent Layout** - Your custom layout is saved and restored on every new tab

### 🌓 **Dark Mode Support**
- Beautiful light and dark themes
- Smooth transitions between modes
- Theme preference persists across sessions
- Easy toggle from settings panel or auth screen

### ✅ **Task Management (Priority Tasks Widget)**
- Create and manage tasks with priorities (Low, Medium, High, Urgent)
- Set deadlines and add notes
- Mark tasks as complete
- Color-coded priority indicators
- Quick view of top 5 priority tasks
- Tasks sync across all tabs

### ⏱️ **Focus Timer Widget**
- Pomodoro-style focus timer
- Set custom durations or use quick presets (15m, 25m, 45m)
- Pause and resume functionality
- Visual progress bar with color transitions
- Desktop notifications on completion
- Timer state persists across tabs

### 💡 **Daily Motivation Widget**
- Beautiful motivational quotes with scenic backgrounds
- New quote every day
- Refresh button for instant inspiration
- High-quality Unsplash images
- Quotes persist throughout the day

### 🔖 **Quick Bookmarks Widget**
- Save bookmarks with `Ctrl+X` keyboard shortcut on any page
- Automatic favicon fetching
- Manual bookmark creation
- Quick access to last 25 bookmarks
- One-click bookmark opening
- Delete unwanted bookmarks easily

### ⚙️ **Settings Panel**
- Accessible via gear icon in top-right corner
- Theme switcher with visual toggle
- Widget visibility controls for each widget
- Layout reset to default option
- Clean, organized settings interface

### 🎯 **Additional Features**
- Responsive design for all screen sizes
- Smooth animations and transitions
- Keyboard shortcuts support
- Focus states for accessibility
- Empty state indicators
- Loading states
- Clean, modern UI inspired by shadcn/ui

---

## 📁 Project Structure

```
focusez/
├── components/           # React components
│   ├── AuthScreen.tsx
│   ├── BookmarksWidget.tsx
│   ├── DraggableWidget.tsx
│   ├── FocusTimer.tsx
│   ├── MotivationWidget.tsx
│   ├── SettingsPanel.tsx
│   └── TodoWidget.tsx
├── contexts/            # React contexts
│   ├── ThemeContext.tsx
│   └── LayoutContext.tsx
├── hooks/              # Custom React hooks
│   └── useAuth.ts
├── tabs/               # Extension pages
│   └── newtab.tsx
├── types/              # TypeScript types
│   ├── bookmark.ts
│   └── todo.ts
├── background/         # Background scripts
│   └── index.ts
├── contents/          # Content scripts
│   └── bookmark-handler.ts
└── assets/            # Static assets
    └── icon.png
```

---

## 🛠️ Tech Stack

- **Framework**: Plasmo (Chrome Extension Framework)
- **UI**: React + TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Chrome Storage API
- **Build Tool**: Plasmo Build System

---

## 🎮 Usage

### Task Management
1. Click **"+ Add New Task"** in Priority Tasks widget
2. Fill in task details (name, description, priority, deadline, notes)
3. Click **"Add Task"** to save
4. Check the checkbox to mark tasks complete
5. Click the trash icon to delete tasks

### Focus Timer
1. Enter what you're working on
2. Set duration in minutes (or use quick presets)
3. Click **"Start"** to begin
4. Use **Pause/Resume** to control the timer
5. Click **Stop** to end the session

### Bookmarks
1. Visit any webpage
2. Press **Ctrl+X** to quick-save bookmark
3. Or manually add via **"+ Add Bookmark Manually"** button
4. Click any bookmark to open in new tab
5. Hover and click trash icon to delete

### Customizing Layout
1. Click the **gear icon** in top-right corner
2. Toggle widget visibility on/off
3. Drag widgets on the dashboard to reorder
4. Click **"Reset to Default Layout"** to restore defaults

### Theme Switching
1. Click the **gear icon** to open settings
2. Toggle the theme switch
3. Or use the theme toggle on the login screen

---

## 🔑 Keyboard Shortcuts

- `Ctrl+X` - Save current page as bookmark

---

## 🐛 Troubleshooting

### Extension not loading
- Make sure you selected the `build/chrome-mv3-dev` folder
- Check that Developer Mode is enabled
- Try reloading the extension

### Widgets not appearing
- Open Settings and ensure widgets are visible
- Try resetting layout from settings
- Check browser console for errors

### Dark mode not working
- Refresh the new tab page
- Check that theme preference is saved in Chrome storage
- Clear browser cache if needed

---

## 📝 Development

### Building for Production
```bash
pnpm run build
# or
npm run build
```

### Type Checking
```bash
pnpm run type-check
# or
npm run type-check
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Design inspired by shadcn/ui
- Icons from Heroicons
- Images from Unsplash

---

**Made with ❤️ for productivity enthusiasts**