import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogIn, LogOut, Search, User2, Trophy, Medal, Users, ShieldCheck, Monitor } from "lucide-react";
import { useNavigate } from "react-router-dom";



const BACKEND_BASE = "http://localhost:3000/api";

const ratingToColor = (rating) => {
  if (rating == null) return "text-gray-400"; // unrated
  if (rating < 1200) return "text-gray-400"; // newbie
  if (rating < 1400) return "text-green-500"; // pupil
  if (rating < 1600) return "text-cyan-500"; // specialist
  if (rating < 1900) return "text-blue-500"; // expert
  if (rating < 2100) return "text-violet-500"; // candidate master
  if (rating < 2300) return "text-orange-500"; // master
  if (rating < 2400) return "text-orange-600"; // international master
  return "text-red-600"; // grandmaster+
};

const prettyRank = (rank) => (rank ? rank?.replace(/_/g, " ") : "Unrated");

function ProfileCard({ profile, onLogout }) {

  const color = useMemo(() => ratingToColor(profile?.rating), [profile]);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="bg-white/80 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={profile?.avatar || profile?.titlePhoto || "/avatar-placeholder.png"}
              alt="avatar"
              className="w-16 h-16 rounded-full border border-zinc-200 dark:border-zinc-700 object-cover"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className={`text-xl font-bold break-all ${color}`}>{profile?.handle}</h2>
                <ShieldCheck className="w-4 h-4 text-emerald-500" title="authenticated" />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 capitalize">{prettyRank(profile?.rank)}</p>
            </div>
            {onLogout && (
              <Button variant="destructive" className="rounded-xl" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            )}
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
              <span className="flex items-center gap-2 font-medium"><Trophy className="w-4 h-4" /> Rating</span>
              <span className="tabular-nums">
                {profile?.rating ?? "—"}
                {profile?.maxRating != null && (
                  <span className="text-zinc-500"> (max {profile?.maxRating})</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
              <span className="flex items-center gap-2 font-medium"><Medal className="w-4 h-4" /> Rank</span>
              <span className="capitalize">{prettyRank(profile?.rank)}{profile?.maxRank ? <span className="text-zinc-500"> (max {prettyRank(profile?.maxRank)})</span> : null}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
              <span className="flex items-center gap-2 font-medium"><Users className="w-4 h-4" /> Friends</span>
              <span>{profile?.friendOfCount ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 dark:bg-zinc-800/60 p-3">
              <span className="font-medium">Contribution</span>
              <span>{profile?.contribution ?? "—"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function UserInput() {
  const [mode, setMode] = useState("idle"); // idle | search | authed
  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState(null); // from OAuth session
  const [searchHandle, setSearchHandle] = useState("");
  const [searchProfile, setSearchProfile] = useState(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  
  // On mount: try session fetch
  useEffect(() => {
    const boot = async () => {
      try {
        const res = await fetch(`${BACKEND_BASE}/auth/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setMe(data);
          setMode("authed");
        
        } else {
          setMode("idle");
        }
      } catch (_) {
        setMode("idle");
      } finally {
        setLoading(false);
      }
    };
    boot();
  }, []);

  const startOAuth = () => {
    window.location.href = `${BACKEND_BASE}/auth/authLogin`;
  };

  const logout = async () => {
    try {
      setBusy(true);
      await fetch(`${BACKEND_BASE}/auth/logoutUser`, { method: "POST", credentials: "include" });
      setMe(null);
      setMode("idle");
      toast.success("Logged out");
    } catch (e) {
      toast.error("Logout failed");
    } finally {
      setBusy(false);
    }
  };

  const doSearch = async () => {
    if (!searchHandle.trim()) {
      toast.message("Enter a handle to search");
      return;
    }
    try {
      setBusy(true);
      const resp = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(searchHandle.trim())}`);
      const json = await resp.json();
      if (json.status === "OK") {
        setSearchProfile(json.result[0]);
        setMode("search");
      } else {
        setSearchProfile(null);
        toast.error("Handle not found");
      }
    } catch (e) {
      toast.error("Could not reach Codeforces");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-900 to-black p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
          >
            Codeforces Auth & Profile
          </motion.h1>
          <p className="text-sm text-zinc-400 mt-1">Login with Codeforces or check any profile by handle.</p>
        </div>

        {/* Main Card */}
        <Card className="bg-white/10 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
          <CardContent className="p-6 md:p-8">
            {/* Action row */}
            {mode !== 'authed' && <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={startOAuth}
                className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white"
                disabled={busy}
              >
                <LogIn className="w-4 h-4 mr-2" /> Login with Codeforces
              </Button>

              <div className="md:col-span-2 flex gap-2">
                <Input
                  value={searchHandle}
                  onChange={(e) => setSearchHandle(e.target.value)}
                  placeholder="Search handle (e.g., tourist)"
                  className="rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 text-zinc-900 dark:text-white placeholder-zinc-500"
                />
                <Button onClick={doSearch} variant="secondary" className="rounded-2xl" disabled={busy}>
                  <Search className="w-4 h-4 mr-2" /> Check Profile
                </Button>
              </div>
            </div>
            }
            {/* Loading / Result Section */}
            <div className="mt-6">
              {loading ? (
                <div className="h-28 animate-pulse rounded-2xl bg-white/10" />
              ) : mode === "authed" && me ? (
                <ProfileCard profile={me} onLogout={logout} />
              ) : mode === "search" && searchProfile ? (
                <ProfileCard profile={searchProfile} />
              ) : (
                <div className="flex items-center justify-center text-zinc-400 gap-2 py-10">
                  <User2 className="w-5 h-5" />
                  <span>Login or search a handle to see profile</span>
                </div>
              )}
            </div>

            {/* Footer helper */}
            <div className="mt-6 text-[12px] text-zinc-400 flex items-center justify-between">
              <span className="">Uses OAuth for verified login, or public API for manual checks.</span>
              {me && (
                <Button
                  // variant="ghost"
                  size="sm"
                  className="rounded-xl text-zinc-300 hover:text-white"
                  onClick={() => navigate("/app/monitoring-control")}
                >
                  <Monitor className="w-4 h-4 mr-1" /> Monitoring Control
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
