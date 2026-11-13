import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Camera,
  Check,
  User,
  DollarSign
} from 'lucide-react';
import { Booking, ChecklistTask } from '../types';
import { CLEANER_SPECIALISTS } from '../data/mockData';

interface CleanerOperationsDashboardProps {
  bookings: Booking[];
  onUpdateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  onToggleTask: (bookingId: string, taskId: string) => void;
  onAddNote: (bookingId: string, note: string) => void;
}

export const CleanerOperationsDashboard: React.FC<CleanerOperationsDashboardProps> = ({
  bookings,
  onUpdateBookingStatus,
  onToggleTask,
  onAddNote,
}) => {
  // Pick active job or default to the first one in_progress / scheduled
  const activeJob = bookings.find(b => b.status === 'in_progress') || bookings[0];
  const [selectedBookingId, setSelectedBookingId] = useState<string>(activeJob?.id || '');

  const currentBooking = bookings.find(b => b.id === selectedBookingId) || activeJob;

  // Stopwatch state
  const [timerSeconds, setTimerSeconds] = useState(4820); // starts at ~1h 20m in progress for realism
  const [isTimerRunning, setIsTimerRunning] = useState(currentBooking?.status === 'in_progress');
  const [activeCategory, setActiveCategory] = useState<'all' | 'kitchen' | 'bathrooms' | 'living_areas' | 'add_ons'>('all');
  const [noteText, setNoteText] = useState('');
  const [beforeAfterMode, setBeforeAfterMode] = useState<'after' | 'before'>('after');

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!currentBooking) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500">No active cleaner dispatch jobs found.</p>
      </div>
    );
  }

  const assignedCleaner = CLEANER_SPECIALISTS.find(c => c.id === currentBooking.cleanerId) || CLEANER_SPECIALISTS[0];

  const totalTasks = currentBooking.checklist.length;
  const completedTasks = currentBooking.checklist.filter(t => t.completed).length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = activeCategory === 'all'
    ? currentBooking.checklist
    : currentBooking.checklist.filter(t => t.category === activeCategory);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusChange = (newStatus: Booking['status']) => {
    onUpdateBookingStatus(currentBooking.id, newStatus);
    if (newStatus === 'in_progress') {
      setIsTimerRunning(true);
    } else if (newStatus === 'completed') {
      setIsTimerRunning(false);
    }
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(currentBooking.id, noteText);
    setNoteText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Top Banner: Cleaner Identity & Shift Overview */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 mb-8 border border-stone-800 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <img
              src={assignedCleaner.avatarUrl}
              alt={assignedCleaner.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  Active Dispatch Console
                </span>
                <span aria-hidden="true" className="text-stone-500">·</span>
                <span className="text-xs text-stone-300 font-mono">Specialist ID #{assignedCleaner.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {assignedCleaner.name}
              </h1>
              <p className="text-xs text-stone-400 mt-0.5">
                {assignedCleaner.title} · {assignedCleaner.rating}★ rating ({assignedCleaner.completedJobs} jobs)
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <div>
              <div className="text-xs text-stone-400">Today's Earnings</div>
              <div className="text-xl font-bold font-mono text-emerald-400">$382.51</div>
            </div>
            <div>
              <div className="text-xs text-stone-400">Shift Progress</div>
              <div className="text-xl font-bold font-mono text-white">2 of 3 Cleans</div>
            </div>
            <div>
              <div className="text-xs text-stone-400">On-Time Rate</div>
              <div className="text-xl font-bold font-mono text-stone-200">100%</div>
            </div>
          </div>

        </div>

        {/* Job Switcher Tabs */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-stone-400 whitespace-nowrap font-semibold mr-1">Dispatched Jobs:</span>
          {bookings.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBookingId(b.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                b.id === currentBooking.id
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <span>{b.bookingCode}</span>
              <span className="opacity-75">· {b.customerName.split(' ')[0]}</span>
              <span className={`w-2 h-2 rounded-full ${
                b.status === 'in_progress' ? 'bg-amber-400' : b.status === 'completed' ? 'bg-emerald-400' : 'bg-stone-400'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Active Job Details + Checklist Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job Info & Dispatch Stopwatch */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Job Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-stone-500 uppercase">
                  Job Code: {currentBooking.bookingCode}
                </span>
                <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                  {currentBooking.customerName}
                </h2>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg uppercase tracking-wider ${
                currentBooking.status === 'in_progress'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : currentBooking.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-stone-100 text-stone-700'
              }`}>
                {currentBooking.status.replace('_', ' ')}
              </span>
            </div>

            {/* Address & Entry Instructions */}
            <div className="mt-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-2">
              <div className="flex items-start gap-2 text-stone-800">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">{currentBooking.address}</div>
                  {currentBooking.unit && <div className="text-stone-500">Unit: {currentBooking.unit}</div>}
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-600">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{currentBooking.customerPhone}</span>
              </div>

              {currentBooking.specialInstructions && (
                <div className="pt-2 border-t border-stone-200 text-stone-700">
                  <span className="font-semibold text-stone-900">Access & Entry Notes:</span>
                  <p className="mt-0.5 leading-relaxed text-stone-600">{currentBooking.specialInstructions}</p>
                </div>
              )}

              {currentBooking.hasPets && (
                <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-900">
                  <span className="font-bold">Pet Alert:</span> {currentBooking.petDetails || 'Household has pets; use botanical non-toxic formulas.'}
                </div>
              )}
            </div>

            {/* Status Transition Control Buttons */}
            <div className="mt-5">
              <label className="block text-xs font-semibold text-stone-600 mb-2">
                Update Dispatch Status:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleStatusChange('en_route')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    currentBooking.status === 'en_route'
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  En Route
                </button>
                <button
                  onClick={() => handleStatusChange('in_progress')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    currentBooking.status === 'in_progress'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    currentBooking.status === 'completed'
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Live Stopwatch Timer Card */}
            <div className="mt-5 p-4 rounded-xl bg-stone-950 text-white border border-stone-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider text-stone-300 uppercase">
                    On-Site Cleaning Duration
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400">
                  {isTimerRunning ? 'RECORDING' : 'PAUSED'}
                </span>
              </div>

              <div className="text-3xl font-extrabold font-mono tabular-nums text-center py-3 tracking-widest text-emerald-400">
                {formatTime(timerSeconds)}
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 border-t border-stone-800">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    isTimerRunning
                      ? 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                      : 'bg-emerald-700 text-white hover:bg-emerald-600'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isTimerRunning ? 'Pause Stopwatch' : 'Resume Timer'}
                </button>

                <button
                  onClick={() => { setTimerSeconds(0); setIsTimerRunning(false); }}
                  className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg cursor-pointer transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Before / After Inspection Showcase */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Photo Inspection Audit
                </span>
                <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg text-xs font-medium">
                  <button
                    onClick={() => setBeforeAfterMode('before')}
                    className={`px-2 py-0.5 rounded ${beforeAfterMode === 'before' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-500'}`}
                  >
                    Before
                  </button>
                  <button
                    onClick={() => setBeforeAfterMode('after')}
                    className={`px-2 py-0.5 rounded ${beforeAfterMode === 'after' ? 'bg-emerald-800 text-white shadow-xs font-semibold' : 'text-stone-500'}`}
                  >
                    After PureClean
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-stone-200 h-44 bg-stone-100">
                <img
                  src={beforeAfterMode === 'after' 
                    ? '/src/assets/images/hdb_kitchen_spotless_1794470015567.jpg'
                    : '/src/assets/images/hdb_bathroom_sparkling_1794470016889.jpg'
                  }
                  alt="Quality inspection photo in Singapore HDB apartment"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-mono rounded">
                  {beforeAfterMode === 'after' ? 'Verified Post-Clean Spec' : 'Arrival Inspection'}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-6 pt-4 border-t border-stone-200">
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Cleaner On-Site Field Notes:
              </label>
              <form onSubmit={handleSaveNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Extra care taken on brass hardware..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Save
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Right Column: Room-by-Room 50-Point Quality Checklist Tracker */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
            
            {/* Checklist Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <h3 className="text-base font-bold text-stone-900">
                    50-Point Quality Audit Protocol
                  </h3>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Tap tasks as completed. All checklist states sync directly to client receipt.
                </p>
              </div>

              {/* Progress Ring / Bar */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-extrabold font-mono text-stone-900">
                    {completedTasks} / {totalTasks} Done
                  </div>
                  <div className="text-[10px] text-stone-500 font-medium">
                    {completionPercent}% completed
                  </div>
                </div>
                <div className="w-16 h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                  <div
                    className="h-full bg-emerald-700 transition-all duration-300"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 py-4 overflow-x-auto text-xs">
              {[
                { id: 'all', label: 'All Tasks' },
                { id: 'kitchen', label: 'Kitchen' },
                { id: 'bathrooms', label: 'Bathrooms' },
                { id: 'living_areas', label: 'Living & Bed' },
                { id: 'add_ons', label: 'Add-Ons' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Task Checklist Items */}
            <div className="space-y-2 mt-2">
              {filteredTasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(currentBooking.id, task.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    task.completed
                      ? 'bg-emerald-50/50 border-emerald-300 text-stone-800'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                        task.completed
                          ? 'bg-emerald-800 text-white'
                          : 'border border-stone-400 bg-white'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <span className={`text-xs font-medium truncate ${task.completed ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                      {task.task}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-stone-400 capitalize shrink-0">
                    {task.category.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>

            {/* Sign-off Banner when 100% complete */}
            {completionPercent === 100 && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-950 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">100% Quality Audit Complete!</div>
                    <div className="text-[11px] text-emerald-300">Ready to dispatch completion report to client.</div>
                  </div>
                </div>
                <button
                  onClick={() => handleStatusChange('completed')}
                  className="px-3.5 py-1.5 text-xs font-bold bg-emerald-400 text-stone-950 rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer"
                >
                  Sign Off Clean
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
