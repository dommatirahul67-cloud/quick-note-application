const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Quick Note Application backend is running!"
  });
});

// Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", {
        ascending: false
      });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create a note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: "Title and content are required"
      });
    }

    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          title,
          content
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Quick Note backend running at http://localhost:${PORT}`
  );
});