import React, { useState, useEffect } from "react";
import { Image } from "react-native";

/**
 * width / height 만으로 이미지 크기를 자동으로 resize 해주는 컴포넌트
 */
const AutoSizedImage = ({
  source,
  width,
  style,
  handleError,
  height,
  ...props
}) => {
  const [dim, setDim] = useState(null);
  let isMounted = true;

  const calculateDimensions = (newWidth, newHeight) => {
    if (width && height) {
      return setDim({ width, height });
    }
    if (!width && !height) {
      return setDim({ width: newWidth, height: newHeight });
    }
    if (!height) {
      const computedHeight = Number(newHeight)
        ? Math.floor(width * (newHeight / newWidth))
        : width;
      return setDim({
        width,
        height: computedHeight,
      });
    }
    if (!width) {
      return setDim({ width: height * (newWidth / newHeight), height });
    }
  };

  useEffect(() => {
    // 웹 이미지
    if (source && source.uri) {
      Image.getSize(
        source.uri,
        (newWidth, newHeight) => {
          //  stop calculation when component unmounted
          if (!isMounted) {
            return;
          }

          calculateDimensions(newWidth, newHeight);
        },
        (error) => {
          // handling error
          if (handleError) {
            handleError(error);
          }
        }
      );
    } else if (source) {
      // 로컬 이미지
      const { width: newWidth, height: newHeight } =
        Image.resolveAssetSource(source);
      //  stop calculation when component unmounted
      if (!isMounted) {
        return;
      }
      calculateDimensions(newWidth, newHeight);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (dim) {
    return (
      <Image
        source={source}
        style={[style, { height: dim.height, width: dim.width }]}
        onError={(e) => {
          // handling error
          if (handleError) {
            handleError(e.nativeEvent.error);
          }
        }}
        {...props}
      />
    );
  }
  return null;
};

export default AutoSizedImage;
