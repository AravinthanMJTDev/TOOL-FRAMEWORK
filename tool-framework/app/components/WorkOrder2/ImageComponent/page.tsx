"use client";
import { memo, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { FocusRing } from "@react-aria/focus";
import classNames from "classnames";

export interface ImageComponentProps extends ImageProps {
  /**
   * Set background image fit options
   */
  bkgImageFitClassName?: "object-contain" | "object-fill" | "object-cover" | "";
  /**
   * Classname for the image element
   */
  imageClassName?: string;
  /**
   * Set img src natural width and height
   */
  maintainAspectRatio?: boolean;
  /**
   * Set minimum height on load
   */
  minimumHeight?: number;
  width?: number;
  height?: number;
}

export const ImageComponent = memo(
  ({
    className,
    fill,
    src,
    imageClassName,
    bkgImageFitClassName,
    width,
    height,
    maintainAspectRatio = !(width && height),
    minimumHeight = 350,
    priority = false,
    ...props
  }: ImageComponentProps) => {
    const ref = useRef<HTMLElement>(null);
    const [visiblePriority, setVisiblePriority] = useState<boolean>(priority);

    // Get the position of the red box in the beginning
    useEffect(() => {
      //Get Image position
      const rect = ref.current?.getBoundingClientRect();
      const topPos = rect?.top ?? 0;
      if (!visiblePriority && topPos > 0 && topPos <= window.innerHeight) {
        setVisiblePriority(true);
      }
    }, [visiblePriority]);

    const [hasError, setHasError] = useState(false);
    const [paddingTop, setPaddingTop] = useState("0");
    const [minHeight, setMinHeight] = useState(
      height ? "0" : `${minimumHeight}px`
    );

    const asset_dimensions: Record<string, number> = {};
    if (!maintainAspectRatio && width && height) {
      asset_dimensions.width = width;
      asset_dimensions.height = height;
    }

    return (
      <FocusRing>
        <span
          className={classNames(
            "inline-block",
            maintainAspectRatio && "relative",
            className
          )}
          ref={ref}
          style={{ paddingTop, minHeight }}
        >
          <Image
            alt="dfg"
            className={classNames(
              bkgImageFitClassName ?? "",
              imageClassName,
              hasError && "next_image_error"
            )}
            fill={maintainAspectRatio || fill}
            onError={() => {
              setHasError(true);
            }}
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } =
                event.target as HTMLImageElement;

              if (maintainAspectRatio) {
                setPaddingTop(
                  `calc(100% / (${naturalWidth} / ${naturalHeight})`
                );
              }
              setMinHeight("0");
            }}
            priority={visiblePriority}
            src={
              !hasError
                ? src
                : "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
            }
            {...asset_dimensions}
            {...props}
          />
        </span>
      </FocusRing>
    );
  }
);

ImageComponent.displayName = "ImageComponent";
