"use client";

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "../../components/atoms";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  addProduct,
  fetchProducts,
  removeProduct,
  Product,
} from "../../store/slices/productsSlice";
import { AppDispatch, RootState } from "@/store/store";

const DiaryPage = memo(function DiaryPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeight, setCurrentWeight] = useState("100");

  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleDateChange: NonNullable<CalendarProps["onChange"]> = useCallback(
    (value) => {
      if (value instanceof Date) {
        setSelectedDate(value);
        setIsCalendarOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <div className="max-w-lg mx-auto p-6 flex flex-col gap-6 items-start">
      {loading && <div className="text-center text-gray-500">Loading...</div>}

      <div className="relative w-64">
        <div className="flex items-center px-3 py-2 mt-10 justify-start gap-2">
          <input
            ref={inputRef}
            type="text"
            value={selectedDate.toLocaleDateString("en-CA")}
            className="w-35 bg-transparent focus:outline-none cursor-pointer text-2xl"
            readOnly
            onClick={() => setIsCalendarOpen(true)}
          />
          <FiCalendar
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={22}
            onClick={() => setIsCalendarOpen((prev) => !prev)}
          />
        </div>

        {isCalendarOpen && (
          <div
            ref={calendarRef}
            className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 z-10 w-[280px]"
          >
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              className="border-none"
            />
          </div>
        )}
      </div>

      <div className="flex items-end gap-6 mb-4 mr-10">
        <Input
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Input
          placeholder="Grams"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          className="w-20"
        />
        <Button
          onClick={() => {
            dispatch(
              addProduct({
                title: searchTerm,
                calories: 100,
                weight: parseInt(currentWeight) || 100,
              })
            );
            setSearchTerm("");
            setCurrentWeight("100");
          }}
        >
          <FiPlus size={20} className="text-white" />
        </Button>
      </div>

      <div className="h-52 overflow-y-auto custom-scrollbar pt-4 w-full">
        <ul className="pr-4">
          {filteredProducts.map((product: Product) => (
            <li
              key={product._id}
              className="flex justify-between items-center py-2 text-sm gap-4"
            >
              <span className="border-b w-36 border-gray-400 truncate">
                {product.title.split(" ").slice(0, 2).join(" ") +
                  (product.title.split(" ").length > 2 ? "..." : "")}
              </span>
              <span className="w-16 text-center border-b border-gray-200">
                {product.weight} g{" "}
              </span>
              <span className="w-20 text-center border-b border-gray-200 font-semibold">
                {product.calories} kcal
              </span>
              <button onClick={() => dispatch(removeProduct(product._id))}>
                <FiX className="text-gray-400 hover:text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(38, 64, 97, 1);
          height: 50px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: blue;
        }
        .truncate {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
});

export default DiaryPage;
