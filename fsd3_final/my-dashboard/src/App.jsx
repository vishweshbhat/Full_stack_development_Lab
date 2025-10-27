import React, { useState, useEffect } from "react";

// -----------------------------
// Helper: sample activities generator
// -----------------------------
const sampleActivities = (roll) => [
  { id: 1, text: `Logged in (roll ${roll})`, time: "2h ago", likes: 2 },
  { id: 2, text: `Updated profile bio`, time: "1d ago", likes: 5 },
  { id: 3, text: `Created a new post`, time: "3d ago", likes: 1 },
];

// -----------------------------
// ProfileCard Component
// -----------------------------
function ProfileCard({ initialName, initialPicture, rollNumber, onUpdate }) {
  const [name, setName] = useState(initialName);
  const [editing, setEditing] = useState(false);
  const [picture, setPicture] = useState(initialPicture);

  useEffect(() => {
    onUpdate && onUpdate({ name, picture });
  }, [name, picture, onUpdate]);

  const handleNameSave = () => setEditing(false);

  const handlePicChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPicture(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
        {picture ? (
          <img src={picture} alt="profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-3xl font-semibold text-gray-600">
            {name?.[0] || "U"}
          </div>
        )}
      </div>

      {editing ? (
        <div className="flex gap-2 items-center justify-center">
          <input
            className="border px-2 py-1 rounded-md w-40 focus:ring-2 focus:ring-blue-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
            onClick={handleNameSave}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">
            Roll No: <strong>{rollNumber}</strong>
          </p>
          <div className="mt-3 flex gap-2">
            <button
              className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
              onClick={() => setEditing(true)}
            >
              Edit Name
            </button>
            <label className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
              Upload Pic
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePicChange}
              />
            </label>
          </div>
        </div>
      )}

      <div className="mt-4 w-full text-sm text-gray-500 border-t pt-3">
        This profile is private. Do not share your roll number or personal data.
      </div>
    </div>
  );
}

// -----------------------------
// Class Component: ActivityList
// -----------------------------
class ActivityList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activities: props.activities || [], filter: "all" };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activities !== this.props.activities) {
      this.setState({ activities: this.props.activities });
    }
  }

  handleLike = (id) => {
    this.setState((prev) => ({
      activities: prev.activities.map((a) =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      ),
    }));
  };

  handleRemove = (id) => {
    this.setState((prev) => ({
      activities: prev.activities.filter((a) => a.id !== id),
    }));
  };

  render() {
    const { activities, filter } = this.state;
    const visible = activities.filter((a) =>
      filter === "all" ? true : a.likes >= 3
    );

    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Activities
          </h3>
          <select
            className="border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
            value={filter}
            onChange={(e) => this.setState({ filter: e.target.value })}
          >
            <option value="all">All</option>
            <option value="popular">Popular (≥3 likes)</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <div className="text-gray-500">No activities to show.</div>
        ) : (
          <ul className="space-y-3">
            {visible.map((a) => (
              <li
                key={a.id}
                className="p-3 border rounded-lg flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div>
                  <div className="font-medium text-gray-800">{a.text}</div>
                  <div className="text-xs text-gray-500">{a.time}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => this.handleLike(a.id)}
                  >
                    👍 {a.likes}
                  </button>
                  <button
                    className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition"
                    onClick={() => this.handleRemove(a.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

// -----------------------------
// StatCard
// -----------------------------
function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm text-center">
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

// -----------------------------
// Main App
// -----------------------------
export default function App() {
  const ROLL_NUMBER = 37;

  const [profile, setProfile] = useState({ name: "User Name", picture: null });
  const [activities, setActivities] = useState(sampleActivities(ROLL_NUMBER));
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (!newPost.trim()) return;
    const next = {
      id: Date.now(),
      text: newPost.trim(),
      time: "just now",
      likes: 0,
    };
    setActivities((s) => [next, ...s]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-4">
          <ProfileCard
            initialName={`Student ${ROLL_NUMBER}`}
            initialPicture={null}
            rollNumber={ROLL_NUMBER}
            onUpdate={(p) => setProfile(p)}
          />
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Posts" value={activities.length} />
            <StatCard
              label="Likes (sum)"
              value={activities.reduce((a, b) => a + b.likes, 0)}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Create Post
            </h2>
            <textarea
              className="w-full border rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Share an update..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-500">
                Posting as <strong>{profile.name}</strong>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                  onClick={() => setNewPost("")}
                >
                  Clear
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                  onClick={addPost}
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          <ActivityList activities={activities} />

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Profile Preview
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                {profile.picture ? (
                  <img
                    src={profile.picture}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 font-semibold">
                    {profile.name?.[0]}
                  </div>
                )}
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {profile.name}
                </div>
                <div className="text-sm text-gray-500">Roll: {ROLL_NUMBER}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        html, body {
          background-color: white !important;
          color: black !important;
        }
      `}</style>
    </div>
  );
}
