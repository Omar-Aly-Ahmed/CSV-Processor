import Image from "next/image";
import FilePhoto from "../assets/file-photo.png";

const FileUploader = () => {
  return (
    <div class="h-screen flex items-center overflow-hidden">
      <div class="absolute inset-0 w-full h-full m-auto"></div>
      <div class="m-auto px-6 sm:px-0 sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-4/12">
        <div class="relative group w-full h-64 flex justify-center items-center">
          <div class="absolute inset-0 w-full h-full rounded-xl bg-white bg-opacity-80 shadow-2xl backdrop-blur-xl group-hover:bg-opacity-80 group-hover:scale-110 transition duration-300"></div>
          <input
            accept=".csv"
            class="relative z-10 opacity-0 h-full w-full cursor-pointer"
            type="file"
            name="bgfile"
            id="bgfile"
          ></input>
          <div class="absolute m-auo flex items-center justify-center">
            <div class="space-y text-center">
              <Image
                src={FilePhoto}
                height={150}
                width={150}
                alt="illustration"
              />
              <p class="text-gray-700 text-lg">
                Drag and drop a file or <br />{" "}
                <p class="text-blue-500"> Upload a file </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
