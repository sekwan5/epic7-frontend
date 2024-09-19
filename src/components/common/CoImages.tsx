import React from "react";

interface CommonImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const CoImage: React.FC<CommonImageProps> = ({
  src,
  alt,
  width = 100,
  height = 100,
  className = "",
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default CoImage;
