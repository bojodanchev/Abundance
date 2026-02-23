"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MONTHS_BG = [
  "Януари",
  "Февруари",
  "Март",
  "Април",
  "Май",
  "Юни",
  "Юли",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

const DAYS_BG = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

type View = "days" | "months" | "years";

interface BirthDatePickerProps {
  value: string; // "YYYY-MM-DD" or ""
  onChange: (value: string) => void;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-first (0=Mon, 6=Sun)
  return day === 0 ? 6 : day - 1;
}

export default function BirthDatePicker({
  value,
  onChange,
}: BirthDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const ref = useRef<HTMLDivElement>(null);

  // Parse value or default to a sensible birth-year view
  const parsed = value ? new Date(value) : null;
  const [viewYear, setViewYear] = useState(parsed?.getFullYear() ?? 1995);
  const [viewMonth, setViewMonth] = useState(parsed?.getMonth() ?? 0);
  const [yearPageStart, setYearPageStart] = useState(
    Math.floor((parsed?.getFullYear() ?? 1995) / 20) * 20
  );

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setView("days");
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectDay = useCallback(
    (day: number) => {
      const m = String(viewMonth + 1).padStart(2, "0");
      const d = String(day).padStart(2, "0");
      onChange(`${viewYear}-${m}-${d}`);
      setOpen(false);
      setView("days");
    },
    [viewYear, viewMonth, onChange]
  );

  const selectMonth = useCallback(
    (month: number) => {
      setViewMonth(month);
      setView("days");
    },
    []
  );

  const selectYear = useCallback(
    (year: number) => {
      setViewYear(year);
      setYearPageStart(Math.floor(year / 20) * 20);
      setView("months");
    },
    []
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Format display value
  const displayValue = parsed
    ? `${String(parsed.getDate()).padStart(2, "0")}.${String(parsed.getMonth() + 1).padStart(2, "0")}.${parsed.getFullYear()}`
    : "";

  // Build day grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(
    viewMonth === 0 ? viewYear - 1 : viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  );

  const selectedDay = parsed?.getDate();
  const selectedMonth = parsed?.getMonth();
  const selectedYear = parsed?.getFullYear();

  const today = new Date();

  // Year grid (20 years per page)
  const yearGrid = Array.from({ length: 20 }, (_, i) => yearPageStart + i);

  return (
    <div ref={ref} className="relative">
      {/* Trigger input */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) setView("days");
        }}
        className={`w-full flex items-center justify-between bg-surface-muted border rounded-lg px-4 py-3 text-left transition-all cursor-pointer ${
          open
            ? "border-accent ring-1 ring-accent/30"
            : "border-border hover:border-border/80"
        }`}
      >
        <span
          className={
            displayValue ? "text-text-primary" : "text-text-secondary/40"
          }
        >
          {displayValue || "дд.мм.гггг"}
        </span>
        <Calendar className="w-4.5 h-4.5 text-text-secondary/50" />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute z-50 left-0 right-0 mt-2 bg-surface-muted border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              {view === "days" && (
                <>
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("months")}
                    className="text-sm font-display font-semibold text-text-primary hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                  >
                    {MONTHS_BG[viewMonth]} {viewYear}
                  </button>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {view === "months" && (
                <>
                  <button
                    type="button"
                    onClick={() => setViewYear((y) => y - 1)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("years")}
                    className="text-sm font-display font-semibold text-text-primary hover:text-accent transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                  >
                    {viewYear}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewYear((y) => y + 1)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {view === "years" && (
                <>
                  <button
                    type="button"
                    onClick={() => setYearPageStart((y) => y - 20)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-display font-semibold text-text-primary">
                    {yearPageStart} – {yearPageStart + 19}
                  </span>
                  <button
                    type="button"
                    onClick={() => setYearPageStart((y) => y + 20)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-accent hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Body */}
            <AnimatePresence mode="wait">
              {/* Days view */}
              {view === "days" && (
                <motion.div
                  key={`days-${viewYear}-${viewMonth}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-3"
                >
                  {/* Day headers */}
                  <div className="grid grid-cols-7 mb-1">
                    {DAYS_BG.map((d) => (
                      <div
                        key={d}
                        className="text-center text-[10px] font-medium text-text-secondary/60 uppercase tracking-wider py-1"
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day cells */}
                  <div className="grid grid-cols-7 gap-0.5">
                    {/* Previous month overflow */}
                    {Array.from({ length: firstDay }, (_, i) => (
                      <div
                        key={`prev-${i}`}
                        className="aspect-square flex items-center justify-center text-xs text-text-secondary/20"
                      >
                        {prevMonthDays - firstDay + i + 1}
                      </div>
                    ))}

                    {/* Current month days */}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const isSelected =
                        day === selectedDay &&
                        viewMonth === selectedMonth &&
                        viewYear === selectedYear;
                      const isToday =
                        day === today.getDate() &&
                        viewMonth === today.getMonth() &&
                        viewYear === today.getFullYear();
                      const isFuture =
                        new Date(viewYear, viewMonth, day) > today;

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isFuture}
                          onClick={() => selectDay(day)}
                          className={`aspect-square flex items-center justify-center text-xs rounded-lg transition-all ${
                            isSelected
                              ? "bg-accent text-primary font-bold shadow-md shadow-accent/20"
                              : isToday
                                ? "text-accent font-semibold ring-1 ring-accent/30"
                                : isFuture
                                  ? "text-text-secondary/15 cursor-not-allowed"
                                  : "text-text-primary hover:bg-white/5 hover:text-accent"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}

                    {/* Next month overflow */}
                    {(() => {
                      const totalCells = firstDay + daysInMonth;
                      const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
                      return Array.from({ length: remaining }, (_, i) => (
                        <div
                          key={`next-${i}`}
                          className="aspect-square flex items-center justify-center text-xs text-text-secondary/20"
                        >
                          {i + 1}
                        </div>
                      ));
                    })()}
                  </div>
                </motion.div>
              )}

              {/* Months view */}
              {view === "months" && (
                <motion.div
                  key="months"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-3"
                >
                  <div className="grid grid-cols-3 gap-1.5">
                    {MONTHS_BG.map((month, i) => {
                      const isSelected =
                        i === selectedMonth && viewYear === selectedYear;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => selectMonth(i)}
                          className={`py-2.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-accent text-primary font-bold"
                              : "text-text-secondary hover:bg-white/5 hover:text-accent"
                          }`}
                        >
                          {month.slice(0, 3)}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Years view */}
              {view === "years" && (
                <motion.div
                  key={`years-${yearPageStart}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="p-3"
                >
                  <div className="grid grid-cols-4 gap-1.5">
                    {yearGrid.map((year) => {
                      const isSelected = year === selectedYear;
                      const isFuture = year > today.getFullYear();
                      return (
                        <button
                          key={year}
                          type="button"
                          disabled={isFuture}
                          onClick={() => selectYear(year)}
                          className={`py-2.5 rounded-lg text-xs font-medium transition-all ${
                            isSelected
                              ? "bg-accent text-primary font-bold"
                              : isFuture
                                ? "text-text-secondary/15 cursor-not-allowed"
                                : "text-text-secondary hover:bg-white/5 hover:text-accent"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
