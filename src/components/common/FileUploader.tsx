import { Image } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone, type FileWithPath } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: Array<FileWithPath>) => {
    // @ts-ignore
    fieldChange(acceptedFiles[0]);
    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpg", ".jpeg"],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <div className="flex flex-1 flex-col justify-center gap-3 rounded-lg bg-stone-800 p-5 md:p-10">
          <img
            src={fileUrl}
            className="object-top; h-70 w-full rounded-lg object-cover lg:h-[480px]"
            alt=""
          />
          <p className="text-muted-foreground text-center text-sm">
            Drag or click on picture to replace.
          </p>
        </div>
      ) : (
        <div className="flex h-70 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg bg-stone-800 lg:h-[500px]">
          <Image size={70} className="opacity-35" />
          <div>
            <h3 className="text-center text-lg font-semibold">
              Drag Photos here
            </h3>
            <h4 className="text-muted-foreground text-center text-sm">
              PNG, JPG, SVG
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
