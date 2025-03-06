"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/utils/config";
import { Input } from "@/components/atoms";
import { Button } from "@/components/atoms";
import { FiCalendar, FiPlus, FiX } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Product {
  _id?: string;
  title: string;
  calories: number;
}

export default function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState<string>("100");
  const formattedDate = selectedDate.toISOString().split("T")[0];

  useEffect(() => {
    fetchProducts();
  }, [formattedDate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
  };

  const handleAddProduct = async (product: Product) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: product.title,
          calories: product.calories,
          weight: parseInt(weight, 10) || 100,
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to remove product");
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 flex flex-col gap-6">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center gap-2 cursor-pointer">
          <Input
            type="text"
            value={selectedDate.toLocaleDateString("en-GB")}
            placeholder=""
            readOnly
            className="text-2xl font-bold bg-transparent border-b focus:outline-none cursor-pointer text-center"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          />
          <FiCalendar
            className="text-gray-500 text-2xl cursor-pointer"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          />
        </div>
        {isCalendarOpen && (
          <div className="absolute mt-2 shadow-lg border rounded-lg bg-white z-10">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date as Date);
                setIsCalendarOpen(false);
              }}
              value={selectedDate}
            />
          </div>
        )}
      </div>

      <div className="mt-4 pb-2 flex justify-between gap-4">
        <Input
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Input
          placeholder="Grams"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <Button
          onClick={() => handleAddProduct({ title: searchTerm, calories: 100 })}
        >
          <FiPlus className="text-white text-xl" />
        </Button>
      </div>

      <div className="h-48 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : products.length > 0 ? (
          <ul className="shadow-md mt-2">
            {products
              .filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <li
                  key={product._id}
                  className="p-2 flex justify-between items-center border-b"
                >
                  <span className="truncate w-40">{product.title}</span>
                  <span className="w-20 text-center">{weight} g</span>
                  <span className="w-24 text-center">
                    {product.calories} kcal
                  </span>
                  <Button
                    color="gray"
                    variant="icon"
                    onClick={() =>
                      product._id && handleRemoveProduct(product._id)
                    }
                  >
                    <FiX className="text-gray-400 hover:text-red-500" />
                  </Button>
                </li>
              ))}
          </ul>
        ) : (
          <div className="text-center text-gray-400">No products added yet</div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff8800;
          border-radius: 10px;
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff6600;
        }
      `}</style>
    </div>
  );
}
