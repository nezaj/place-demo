"use client";

import { id, i, init, InstaQLEntity } from "@instantdb/react";
import { useState } from "react";

// Instant app
const APP_ID = "f6633367-849b-4e60-9a71-139ea84e37b8";

// Define the schema
const schema = i.schema({
  entities: {
    pixels: i.entity({
      x: i.number(),
      y: i.number(),
      color: i.string(),
      placedAt: i.number(),
    }),
  },
});

type Pixel = InstaQLEntity<typeof schema, "pixels">;

const db = init({ appId: APP_ID, schema });

// Color palette - 5 colors as requested
const COLORS = [
  "#FF4444", // Red
  "#44FF44", // Green
  "#4444FF", // Blue
  "#FFFF44", // Yellow
  "#FF44FF", // Magenta
];

const GRID_SIZE = 10;

function App() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  // Read all pixels from the database
  const { isLoading, error, data } = db.useQuery({ pixels: {} });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const { pixels } = data;

  // Create a map for quick pixel lookup
  const pixelMap = new Map<string, Pixel>();
  pixels.forEach((pixel) => {
    pixelMap.set(`${pixel.x}-${pixel.y}`, pixel);
  });

  // Place a pixel
  const placePixel = (x: number, y: number) => {
    const pixelKey = `${x}-${y}`;
    const existingPixel = pixelMap.get(pixelKey);

    if (existingPixel) {
      // Update existing pixel
      db.transact(
        db.tx.pixels[existingPixel.id].update({
          color: selectedColor,
          placedAt: Date.now(),
        })
      );
    } else {
      // Create new pixel
      db.transact(
        db.tx.pixels[id()].update({
          x,
          y,
          color: selectedColor,
          placedAt: Date.now(),
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">r/place Clone</h1>
        <p className="text-gray-400">
          Click pixels to place colors • Real-time collaboration
        </p>
      </div>

      {/* Color Palette */}
      <div className="mb-6">
        <div className="text-sm mb-2 text-center text-gray-400">
          Select Color:
        </div>
        <div className="flex gap-2">
          {COLORS.map((color, index) => (
            <button
              key={color}
              className={`w-8 h-8 rounded border-2 transition-all hover:scale-110 ${selectedColor === color
                ? "border-white shadow-lg"
                : "border-gray-600 hover:border-gray-400"
                }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              title={`Color ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white p-2 rounded-lg shadow-2xl">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const pixel = pixelMap.get(`${x}-${y}`);

            return (
              <button
                key={`${x}-${y}`}
                className="w-8 h-8 border border-gray-300 hover:border-gray-600 transition-all hover:scale-110"
                style={{
                  backgroundColor: pixel?.color || "#ffffff",
                }}
                onClick={() => placePixel(x, y)}
                title={`(${x}, ${y})`}
              />
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <div>Total pixels placed: {pixels.length}</div>
        <div className="mt-2">
          Open this page in multiple tabs to see real-time collaboration!
        </div>
      </div>
    </div>
  );
}

export default App;
