import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function Image({
  src,
  alt,
  width = 1200,
  height = 675,
}: ImageProps) {
  return (
    <span className="my-6 block overflow-hidden rounded-xl border">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
      />
    </span>
  );
}
