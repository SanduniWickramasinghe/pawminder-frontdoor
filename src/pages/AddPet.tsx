import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { petService } from "@/services/petService";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function AddPet() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    ageYears: "",
    weightLbs: "",
    microchip: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await petService.createPet({
        name: formData.name.trim(),
        species: formData.species.trim() || undefined,
        breed: formData.breed.trim() || undefined,
        ageYears: formData.ageYears ? parseInt(formData.ageYears, 10) : undefined,
        weightLbs: formData.weightLbs ? parseFloat(formData.weightLbs) : undefined,
        microchip: formData.microchip.trim() || undefined,
      });
      toast.success(`${formData.name} added!`);
      navigate("/dashboard");
    } catch {
      toast.error("Could not save pet. Sign in and check the API is running.");
    }
  };

  return (
    <main className="app-shell bg-slate-50 min-h-screen">
      <header className="gradient-primary px-6 pt-10 pb-20 text-primary-foreground relative">
        <button onClick={() => navigate(-1)} className="absolute top-10 left-4">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-2xl font-extrabold text-center">New Pet Profile</h1>
      </header>

      <div className="mx-4 -mt-12 bg-white rounded-3xl p-6 shadow-xl relative z-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Pet Name</label>
            <input 
              required
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g. Teddy"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 ml-1">Species</label>
              <input 
                className="w-full p-3 rounded-xl border border-slate-200"
                placeholder="Dog"
                onChange={(e) => setFormData({...formData, species: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 ml-1">Breed</label>
              <input 
                className="w-full p-3 rounded-xl border border-slate-200"
                placeholder="German Shepherd"
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 ml-1">Age (Years)</label>
              <input 
                type="number"
                className="w-full p-3 rounded-xl border border-slate-200"
                onChange={(e) => setFormData({...formData, ageYears: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 ml-1">Weight (Lbs)</label>
              <input 
                type="number"
                step="0.1"
                className="w-full p-3 rounded-xl border border-slate-200"
                onChange={(e) => setFormData({...formData, weightLbs: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full gradient-primary text-white font-bold py-4 rounded-2xl shadow-lg mt-4 active:scale-95 transition-transform"
          >
            Save Pet
          </button>
        </form>
      </div>
    </main>
  );
}