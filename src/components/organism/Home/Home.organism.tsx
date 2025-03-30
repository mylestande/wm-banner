"use client";
import React from "react";

import { useForm } from "@/utils/hooks/useForm";
import Banner from "@/components/molecule/Banner/Banner.molecule";
import FormMolecule from "@/components/molecule/Form/Form.molecule";

export default function HomeOrganism() {
  const { formdata, clearValue, handleChange, updateImage } = useForm({
    name: "myles (real) and ppj2dd (pseudo)",
    description:
      "Learning to code in Next.JS. Not the easiest journey. Perhaps I could get mentored by one of those cool WikiMedia mentors.",
    images: [],
    background: "#FFFFFF",
    color: "#000000",
  });

  const { name, description, images } = formdata;
  console.log(name, description, images);

  return (
    <div className="h-dvh flex flex-col items-center justify-start p-4 lg:px-8 xl:px-16">
      <Banner formdata={formdata} />
      <FormMolecule
        formdata={formdata}
        clearValue={clearValue}
        handleChange={handleChange}
        updateImage={updateImage}
      />
    </div>
  );
}
