import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Complaint = () => {
  const { t } = useTranslation(); 
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Garbage',
    locality: '',
    image: null,
  });

  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));

    if (name === "locality" && value.length > 2) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`)
        .then(res => res.json())
        .then(data => {
          setSuggestions(data);
        });
    } else if (name === "locality") {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place) => {
    setForm(prev => ({ ...prev, locality: place.display_name }));
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("locality", form.locality);
    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      await axios.post('http://localhost:1000/complaint', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(t("complaint.success"));
      navigate("/");
    } catch (error) {
      toast.error(t("complaint.error"));
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl relative">
      <div className="p-2 flex justify-end">
                <LanguageSwitcher />
              </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{t("complaint.title")}</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder={t("complaint.problemTitle")}
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder={t("complaint.description")}
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full p-2 border rounded"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Garbage">{t("category.garbage")}</option>
          <option value="Road">{t("category.road")}</option>
          <option value="Water">{t("category.water")}</option>
          <option value="Electricity">{t("category.electricity")}</option>
          <option value="Others">{t("category.others")}</option>
        </select>

        <div className="relative">
          <input
            type="text"
            name="locality"
            placeholder={t("complaint.locality")}
            className="w-full p-2 border rounded"
            value={form.locality}
            onChange={handleChange}
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded w-full max-h-48 overflow-y-auto mt-1">
              {suggestions.map((place, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(place)}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          {t("complaint.submit")}
        </button>
      </form>
    </div>
  );
};

export default Complaint;


