import React from "react";

import Input from "@/components/atoms/Inputs/Input.component";
import { isValidHexColor } from "@/utils/libs/validator";
import ImageInput from "@/components/atoms/ImageInput/ImageInput.component";

const FormMolecule: React.FC<FormProps> = ({
  formdata,
  clearValue,
  handleChange,
  updateImage,
}) => {
  const { name, description, color, background, images } = formdata;
  return (
    <div className=" md:max-w-screen-md lg:max-w-screen-lg  w-full mt-auto py-5 md:py-10 xl:py-20 flex flex-col items-center justify-start gap-8">
      <div className="flex w-full flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <Input
            type={"text"}
            label={"Name"}
            name={"name"}
            value={name}
            clearValue={clearValue}
            onChange={handleChange}
            validity={name.length > 2}
            error={name.length < 2}
            errorText={"Name must be at least 2 characters long."}
            placeholder={"Enter your name"}
          />
          <Input
            type={"text"}
            placeholder="Enter your description"
            label={"Description"}
            name={"description"}
            value={description}
            clearValue={clearValue}
            onChange={handleChange}
            validity={description.length > 2}
            error={description.length < 2}
            errorText={"Description must be at least 2 characters long."}
          />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <Input
            type={"color"}
            label={"Color"}
            name={"color"}
            value={color}
            clearValue={clearValue}
            onChange={handleChange}
            validity={isValidHexColor(color)}
            error={!isValidHexColor(color)}
            errorText={"Invalid color format."}
            placeholder={"Enter your color"}
          />
          <Input
            type={"color"}
            label={"Background"}
            name={"background"}
            value={background}
            clearValue={clearValue}
            onChange={handleChange}
            validity={isValidHexColor(background)}
            error={!isValidHexColor(background)}
            errorText={"Invalid color format."}
            placeholder={"Enter your color"}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <ImageInput
          type="file"
          name="images"
          text="Select image"
          accept=".png, .jpeg, .jpg"
          value={images}
          onChange={updateImage}
          max={1}
        />
      </div>
    </div>
  );
};

export default FormMolecule;

type FormProps = {
  formdata: {
    name: string;
    description: string;
    background: string;
    color: string;
    images: unknown[];
  };
  clearValue: (name: string) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  updateImage: (e: React.ChangeEvent<HTMLInputElement>, max?: number) => void;
};
