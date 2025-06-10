# r/Place Clone Built w/ InstantDB, NextJS, and Cursor

This app was vibe-coded in < 5 min directly in Cursor using InstantDB for the
backend. You can see the video below

[![Build a full-stack app in less than 5 minutes using Cursor and InstantDB](https://img.youtube.com/vi/euaK4WCK-ZM/maxresdefault.jpg)](https://www.youtube.com/watch?v=euaK4WCK-ZM)

And play with it live at [place-demo.vercel.app](https://place-demo.vercel.app)

## 🎨 Features

**Core Functionality:**

* 10x10 Grid: Exactly as requested, with 100 clickable pixels
* 5 Color Palette: Red, Green, Blue, Yellow, and Magenta
* Real-time Collaboration: Using Instant DB for live updates across multiple users/tabs
* Click to Place: Simply click any pixel to place your selected color

**Technical Implementation:**

* Instant DB Integration: Created app with ID f6633367-849b-4e60-9a71-139ea84e37b8
* Schema Design: Pixels stored with x/y coordinates, color, and timestamp
* Real-time Updates: Changes appear instantly across all connected clients
* Responsive UI: Clean, modern interface with hover effects
* State Management: Smart pixel lookup and efficient updates

**UI/UX Features:**
* Dark theme with colorful accents
* Color selector with visual feedback for selected color
* Hover effects on grid squares and color buttons
* Real-time stats showing total pixels placed
* Coordinate tooltips when hovering over pixels

## 🚀 How to Use
* Run the app: `npm run dev` and visit `localhost:3000`
* Select a color from the 5-color palette at the top
* Click any pixel in the 10x10 grid to place your color
* See real-time updates by opening multiple tabs - changes appear instantly!
* The app uses Instant DB for real-time synchronization, so multiple people can collaborate simultaneously just like the original Reddit r/place. Each pixel placement is stored with coordinates, color, and timestamp for perfect collaboration.

