/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const ImageInput: React.FC<ImageInputProps> = ({
  type,
  name,
  value,
  onChange,
  text,
  accept,
  multiple = false,
  max,
}) => {
  return (
    <div className="w-fit px-4 rounded py-3 flex flex-col gap-1 justify-start items-start bg-teal-800">
      <label
        className="relative flex flex-col justify-start items-start w-full gap-1"
        htmlFor={name}
      >
        <input
          id={name}
          hidden
          name={name}
          type={type}
          multiple={multiple}
          accept={accept}
          //   value={value}
          onChange={(e) => onChange(e, max)}
        />
        <span className="text-base italic font-normal text-white dark:bg-primary-950 rounded-l">
          {text}{" "}
          {value !== null
            ? `${Array.from(value).length} image${
                Array.from(value).length !== 1 ? "s" : ""
              } selected`
            : "Placeholder"}
        </span>
      </label>
      {/* <div className={styles.products}>
        {value !== null && value !== undefined
          ? Array.from(value).map((image, index: number) => (
              <div key={index} className={styles.product}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Iamges"
                  width={200}
                  height={80}
                />
                <div
                  className={[styles.removeProduct, "dark:bg-grey-800"].join(
                    " "
                  )}
                  onClick={() => removeImage(index)}
                >
                  <Delete
                    className={[styles.removeIcon, "dark:fill-danger-400"].join(
                      " "
                    )}
                  />
                </div>
              </div>
            ))
          : null}
      </div> */}
    </div>
  );
};

export default ImageInput;

export interface ImageInputProps {
  type: string;
  name: string;
  value: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, max?: number) => void;
  text: string;
  accept: ".png, .jpeg, .jpg";
  multiple?: boolean;
  max?: number;
}
