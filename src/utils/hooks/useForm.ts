"use client";

import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useForm = <T extends Record<string, any>>(initialData: T) => {
  const [formdata, setFormdata] = useState<T>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('target:', e.target.name, 'value"', e.target.value);
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>, max = 3) => {
    const files = e.target.files;
    if (files) {
      const newFilesArray = Array.from(files);
      const existingFiles = formdata[e.target.name] || [];
      const combinedFiles = newFilesArray.concat(existingFiles).slice(0, max);
      setFormdata({ ...formdata, [e.target.name]: combinedFiles });
    }
  };

  const removeImage = (name: string, index: number) => {
    const updatedFiles = (formdata[name] as File[]).filter(
      (_, i) => i !== index,
    );
    setFormdata({ ...formdata, [name]: updatedFiles });
  };

  const clearValue = (name: string) => {
    setFormdata({ ...formdata, [name]: "" });
  };

  return {
    formdata,
    handleChange,
    setFormdata,
    updateImage,
    clearValue,
    removeImage,
  };
};
