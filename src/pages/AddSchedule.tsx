// pages/AddSchedule.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { petService } from "@/services/petService";
import { ChevronLeft, Bell } from "lucide-react";
import { toast } from "sonner";

export default function AddSchedule() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petService.createReminder({
        title: formData.title.trim(),
        date: formData.date,
        time: formData.time,
      });
      toast.success("Reminder scheduled");
      navigate("/schedule");
    } catch {
      toast.error("Could not save reminder. Try again after signing in.");
    }
  };

  return (
    <main className="app-shell bg-slate-50 min-h-screen">
      <header className="gradient-schedule px-6 pt-10 pb-20 text-white relative">
        <button onClick={() => navigate(-1)} className="absolute top-10 left-4">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-2xl font-extrabold text-center">New Reminder</h1>
      </header>

      <div className="mx-4 -mt-12 bg-white rounded-3xl p-6 shadow-xl relative z-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex justify-center mb-2">
            <div className="bg-schedule/10 p-4 rounded-full">
              <Bell className="text-schedule" size={32} />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-400">Reminder Title</label>
            <input 
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-schedule outline-none"
              placeholder="e.g. Vet Appointment"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400">Date</label>
              <input 
                type="date"
                required
                className="w-full p-3 rounded-xl border border-slate-200"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400">Time</label>
              <input 
                type="time"
                required
                className="w-full p-3 rounded-xl border border-slate-200"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full gradient-schedule text-white font-bold py-4 rounded-2xl shadow-lg mt-4 active:scale-95 transition-transform"
          >
            Schedule Reminder
          </button>
        </form>
      </div>
    </main>
  );
}